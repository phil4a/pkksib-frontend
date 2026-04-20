'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { Checkbox } from '@/components/ui/checkbox';

import { useObjects } from '@/hooks/objects/useObjects';

import type { IObjectCategory, IObjectLocation } from '@/types/object.types';

interface ObjectsFiltersProps {
	onApplied?: () => void;
}

export function ObjectsFilters({ onApplied }: ObjectsFiltersProps) {
	const { filters, setFilters, categories, categoriesLoading, locations, locationsLoading } =
		useObjects();

	console.log(locations);

	const [pendingCategories, setPendingCategories] = useState<string[]>(filters.categorySlugs);
	const [pendingLocations, setPendingLocations] = useState<string[]>(filters.locations);

	useEffect(() => {
		setPendingCategories(filters.categorySlugs);
	}, [filters.categorySlugs]);
	useEffect(() => {
		setPendingLocations(filters.locations);
	}, [filters.locations]);

	const categoryMap = useMemo<Record<string, boolean>>(
		() => Object.fromEntries(categories.map(c => [c.slug, pendingCategories.includes(c.slug)])),
		[categories, pendingCategories]
	);
	const locationMap = useMemo<Record<string, boolean>>(
		() =>
			Object.fromEntries(locations.map(l => [l.location, pendingLocations.includes(l.location)])),
		[locations, pendingLocations]
	);

	const onToggleCategory = (slug: string) => {
		setPendingCategories(prev =>
			prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]
		);
	};
	const onToggleLocation = (location: string) => {
		setPendingLocations(prev =>
			prev.includes(location) ? prev.filter(s => s !== location) : [...prev, location]
		);
	};

	const isUnchanged = useMemo(() => {
		const a = filters.categorySlugs.slice().sort().join(',');
		const b = pendingCategories.slice().sort().join(',');
		const c = filters.locations.slice().sort().join(',');
		const d = pendingLocations.slice().sort().join(',');
		return a === b && c === d;
	}, [filters.categorySlugs, filters.locations, pendingCategories, pendingLocations]);

	const applyFilters = useCallback(() => {
		setFilters({ categorySlugs: pendingCategories, locations: pendingLocations });
		onApplied?.();
	}, [setFilters, pendingCategories, pendingLocations, onApplied]);

	return (
		<div className='pr-6'>
			<div className='mb-7'>
				<p className='font-semibold mb-3'>Тип объектов</p>
				{categoriesLoading ? (
					<div className='space-y-4 md:space-y-2'>
						<div className='bg-light-gray h-6 rounded-sm animate-pulse' />
						<div className='bg-light-gray h-6 rounded-sm animate-pulse' />
					</div>
				) : (
					<ul className='space-y-4 md:space-y-2'>
						{categories.map((c: IObjectCategory) => (
							<li key={c.id}>
								<label className='flex items-center gap-2 lowercase cursor-pointer'>
									<Checkbox
										checked={!!categoryMap[c.slug]}
										onCheckedChange={() => onToggleCategory(c.slug)}
										aria-label={c.title}
									/>
									<span>{c.title}</span>
								</label>
							</li>
						))}
					</ul>
				)}
			</div>
			<div>
				<p className='font-semibold mb-3'>Регион</p>
				{locationsLoading ? (
					<div className='space-y-4 md:space-y-2'>
						<div className='bg-light-gray h-6 rounded-sm animate-pulse' />
						<div className='bg-light-gray h-6 rounded-sm animate-pulse' />
					</div>
				) : (
					<ul className='space-y-4 md:space-y-2'>
						{locations.map((l: IObjectLocation) => (
							<li key={l.id}>
								<label className='flex items-center gap-2 cursor-pointer'>
									<Checkbox
										checked={!!locationMap[l.location]}
										onCheckedChange={() => onToggleLocation(l.location)}
										aria-label={l.location}
									/>
									<span>{l.location}</span>
								</label>
							</li>
						))}
					</ul>
				)}
			</div>

			{/* Кнопка применения "Показать" */}
			<div className='mt-6'>
				<button
					type='button'
					onClick={applyFilters}
					disabled={isUnchanged}
					className='inline-flex items-center h-10.5 px-6 rounded-lg bg-accent text-primary font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
				>
					Показать
				</button>
			</div>
		</div>
	);
}
