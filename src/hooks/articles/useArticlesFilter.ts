'use client';

import { useQuery } from '@tanstack/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';

import { articlesService } from '@/services/articles.service';
import type { IArticle, IArticleTag } from '@/types/article.types';

export function useArticlesFilter() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();

	// Читаем имя тега из query (?tag=NAME)
	const selectedTag = useMemo(() => {
		const val = searchParams.get('tag');
		return val ?? undefined;
	}, [searchParams]);

	// Обновляем query-параметр tag в URL
	const setSelectedTag = useCallback(
		(tagName?: string) => {
			const params = new URLSearchParams(searchParams.toString());
			if (tagName === undefined || tagName === '') {
				params.delete('tag');
			} else {
				params.set('tag', tagName);
			}
			const query = params.toString();
			router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
		},
		[searchParams, router, pathname]
	);

	const { data: tagsData, isLoading: tagsLoading } = useQuery<IArticleTag[]>({
		queryKey: ['article-tags'],
		queryFn: () => articlesService.getUniqueTags(),
		staleTime: 1000 * 60 * 5
	});

	const tags: IArticleTag[] = tagsData || [];

	const selectedTagId = useMemo(() => {
		if (!selectedTag) return undefined;
		const found = tags.find(t => t.name === selectedTag);
		return found?.id;
	}, [tags, selectedTag]);

	const { data: articlesRes, isLoading: articlesLoading } = useQuery({
		queryKey: ['articles', selectedTagId, selectedTag],
		queryFn: () => articlesService.getAll(selectedTagId),
		staleTime: 1000 * 60 * 5
	});

	const articles: IArticle[] = articlesRes?.data?.data || [];

	return {
		selectedTag,
		setSelectedTag,
		tags,
		tagsLoading,
		articles,
		articlesLoading
	} as const;
}
