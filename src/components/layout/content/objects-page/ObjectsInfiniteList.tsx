'use client';

import { Loader2 } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Object as ObjectCard } from '@/components/layout/content/object/Object';

import type { ObjectsInfiniteListProps, ObjectsInitialPage } from './ObjectsInfiniteList.types';
import { objectService } from '@/services/object.service';

function getHeaderOffsetPx(): number {
	const raw = getComputedStyle(document.documentElement).getPropertyValue('--header-height').trim();
	const num = Number.parseFloat(raw);
	return Number.isFinite(num) ? num : 0;
}

function getMaxLoadedPage(pages: ObjectsInitialPage[]): number {
	let max = 1;
	for (const p of pages) {
		if (p.page > max) max = p.page;
	}
	return max;
}

function buildNextUrlWithPage(page: number): string {
	const url = new URL(window.location.href);
	if (page > 1) url.searchParams.set('page', String(page));
	else url.searchParams.delete('page');
	return url.toString();
}

function scrollToPageAnchor(page: number) {
	const anchor = document.getElementById(`objects-page-${page}`);
	if (!anchor) return;

	const headerOffset = getHeaderOffsetPx();
	const extraOffset = 16;
	const top = anchor.getBoundingClientRect().top + window.scrollY - headerOffset - extraOffset;
	window.scrollTo({ top: Math.max(0, top), behavior: 'auto' });
}

const LOAD_MORE_ROOT_MARGIN_PX = 1500;

export function ObjectsInfiniteList({
	initialPages,
	pageCount,
	pageSize,
	requestedPage,
	categorySlugs,
	locations
}: ObjectsInfiniteListProps) {
	const [pages, setPages] = useState<ObjectsInitialPage[]>(() =>
		[...initialPages].sort((a, b) => a.page - b.page)
	);
	const [isLoadingNext, setIsLoadingNext] = useState(false);
	const [loadError, setLoadError] = useState<string | null>(null);

	const pagesRef = useRef<ObjectsInitialPage[]>(pages);
	const isLoadingRef = useRef(false);
	const hasInitialScrollRef = useRef(false);
	const targetPageRef = useRef(Math.min(Math.max(1, requestedPage), pageCount));
	const activePageRef = useRef<number>(Math.min(Math.max(1, requestedPage), pageCount));
	const sentinelRef = useRef<HTMLDivElement | null>(null);
	const anchorsRef = useRef<Map<number, HTMLElement>>(new Map());
	const visiblePagesRef = useRef<Set<number>>(new Set());

	useEffect(() => {
		pagesRef.current = pages;
	}, [pages]);

	const allObjects = useMemo(() => pages.flatMap(p => p.objects), [pages]);

	const upsertPage = useCallback((page: number, objects: ObjectsInitialPage['objects']) => {
		setPages(prev => {
			if (prev.some(p => p.page === page)) return prev;
			const merged = [...prev, { page, objects }];
			merged.sort((a, b) => a.page - b.page);
			return merged;
		});
	}, []);

	const loadPage = useCallback(
		async (page: number) => {
			const res = await objectService.getAll({
				page,
				pageSize,
				categorySlugs,
				locations
			});
			return res.data?.data ?? [];
		},
		[categorySlugs, locations, pageSize]
	);

	const loadNext = useCallback(
		async (nextPage?: number): Promise<boolean> => {
			if (isLoadingRef.current) return true;

			const currentMax = getMaxLoadedPage(pagesRef.current);
			const pageToLoad = nextPage ?? currentMax + 1;
			if (pageToLoad > pageCount) return false;
			if (pagesRef.current.some(p => p.page === pageToLoad)) return true;

			isLoadingRef.current = true;
			setIsLoadingNext(true);
			setLoadError(null);

			try {
				const objects = await loadPage(pageToLoad);
				upsertPage(pageToLoad, objects);
				return true;
			} catch {
				setLoadError('Не удалось загрузить ещё объекты');
				return false;
			} finally {
				setIsLoadingNext(false);
				isLoadingRef.current = false;
			}
		},
		[loadPage, pageCount, upsertPage]
	);

	const maybeLoadNextIfSentinelIsNearViewport = useCallback(() => {
		const sentinel = sentinelRef.current;
		if (!sentinel || isLoadingRef.current) return;
		if (getMaxLoadedPage(pagesRef.current) >= pageCount) return;

		const rect = sentinel.getBoundingClientRect();
		const preloadBoundary = window.innerHeight + LOAD_MORE_ROOT_MARGIN_PX;

		if (rect.top <= preloadBoundary) {
			void loadNext();
		}
	}, [loadNext, pageCount]);

	useEffect(() => {
		const target = targetPageRef.current;
		if (hasInitialScrollRef.current) return;

		const run = async () => {
			if (target <= 1) {
				hasInitialScrollRef.current = true;
				return;
			}

			while (getMaxLoadedPage(pagesRef.current) < target) {
				const ok = await loadNext();
				if (!ok) return;
			}

			await new Promise<void>(resolve => {
				requestAnimationFrame(() => resolve());
			});

			scrollToPageAnchor(target);
			hasInitialScrollRef.current = true;
		};

		void run();
	}, [pageCount, loadNext]);

	useEffect(() => {
		const el = sentinelRef.current;
		if (!el) return;

		const observer = new IntersectionObserver(
			entries => {
				const first = entries[0];
				if (!first?.isIntersecting) return;
				void loadNext();
			},
			{ rootMargin: `${LOAD_MORE_ROOT_MARGIN_PX}px 0px` }
		);

		observer.observe(el);
		return () => observer.disconnect();
	}, [loadNext]);

	useEffect(() => {
		const frameId = window.requestAnimationFrame(() => {
			maybeLoadNextIfSentinelIsNearViewport();
		});

		return () => window.cancelAnimationFrame(frameId);
	}, [pages, maybeLoadNextIfSentinelIsNearViewport]);

	useEffect(() => {
		if (pages.length === 0) return;

		const headerOffset = getHeaderOffsetPx();
		const observer = new IntersectionObserver(
			entries => {
				for (const entry of entries) {
					const page = Number((entry.target as HTMLElement).dataset.page || '');
					if (!Number.isFinite(page) || page <= 0) continue;

					if (entry.isIntersecting) visiblePagesRef.current.add(page);
					else visiblePagesRef.current.delete(page);
				}

				const visible = Array.from(visiblePagesRef.current.values());
				if (visible.length === 0) return;

				const nextActive = Math.max(...visible);
				if (nextActive === activePageRef.current) return;

				activePageRef.current = nextActive;
				const nextUrl = buildNextUrlWithPage(nextActive);
				window.history.replaceState(window.history.state, '', nextUrl);
			},
			{
				rootMargin: `-${Math.round(headerOffset) + 16}px 0px -70% 0px`,
				threshold: 0
			}
		);

		for (const el of anchorsRef.current.values()) {
			observer.observe(el);
		}

		return () => observer.disconnect();
	}, [pages]);

	useEffect(() => {
		const clamped = Math.min(Math.max(1, requestedPage), pageCount);
		targetPageRef.current = clamped;
		activePageRef.current = clamped;
	}, [requestedPage, pageCount]);

	if (allObjects.length === 0) {
		return <div className='mt-8'>Нет объектов по выбранным фильтрам</div>;
	}

	return (
		<div className='mt-8 grid gap-x-5 gap-y-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
			{pages.map((p, idx) => (
				<div
					key={p.page}
					className='contents'
				>
					{p.objects.map((item, itemIdx) => {
						if (itemIdx !== 0) {
							return (
								<ObjectCard
									key={item.id}
									item={item}
								/>
							);
						}

						return (
							<div
								key={item.id}
								id={`objects-page-${p.page}`}
								data-page={p.page}
								ref={el => {
									const map = anchorsRef.current;
									if (el) map.set(p.page, el);
									else map.delete(p.page);
								}}
							>
								<ObjectCard item={item} />
							</div>
						);
					})}
				</div>
			))}

			<div
				ref={sentinelRef}
				className='col-span-full h-1'
			/>

			{isLoadingNext && (
				<div
					className='col-span-full mt-8 flex justify-center text-gray-600'
					role='status'
					aria-live='polite'
				>
					<Loader2 className='h-6 w-6 animate-spin' />
					<span className='sr-only'>Загрузка</span>
				</div>
			)}

			{loadError && (
				<div className='col-span-full mt-8 flex flex-col items-center gap-3'>
					<div className='text-center text-red-600'>{loadError}</div>
					<button
						type='button'
						onClick={() => void loadNext()}
						className='inline-flex items-center h-10.5 px-6 rounded-lg bg-accent text-primary font-semibold cursor-pointer'
					>
						Повторить
					</button>
				</div>
			)}
		</div>
	);
}
