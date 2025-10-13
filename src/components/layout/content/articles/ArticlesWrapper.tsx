'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { FilterButton } from '@/ui/button/FilterButton';
import { SkeletonLoader } from '@/ui/skeleton/SkeletonLoader';

import { ArticlesList } from './ArticlesList';
import { articlesService } from '@/services/articles.service';
import type { IArticle, IArticleTag } from '@/types/article.types';

export function ArticlesWrapper() {
	const [selectedTag, setSelectedTag] = useState<number | undefined>(undefined);

	const { data: tagsData, isLoading: tagsLoading } = useQuery<IArticleTag[]>({
		queryKey: ['article-tags'],
		queryFn: () => articlesService.getUniqueTags()
	});

	const { data: articlesRes, isLoading: articlesLoading } = useQuery({
		queryKey: ['articles', selectedTag],
		queryFn: () => articlesService.getAll(selectedTag)
	});

	const articles: IArticle[] = articlesRes?.data?.data || [];
	const tags: IArticleTag[] = tagsData || [];

	return (
		<>
			{/* Filters */}
			<div className='mb-8 flex flex-wrap gap-2'>
				<FilterButton
					type={selectedTag === undefined ? 'checked' : 'unchecked'}
					onClick={() => setSelectedTag(undefined)}
				>
					Все
				</FilterButton>
				{tagsLoading &&
					Array.from({ length: 2 }).map((_, i) => (
						<SkeletonLoader
							className='h-10.5 px-6 w-24 rounded-[30px]'
							key={i}
						/>
					))}
				{!tagsLoading &&
					tags.map(tag => (
						<FilterButton
							key={tag.id}
							type={selectedTag === tag.id ? 'checked' : 'unchecked'}
							onClick={() => setSelectedTag(tag.id)}
						>
							{tag.name}
						</FilterButton>
					))}
			</div>

			<ArticlesList
				articlesLoading={articlesLoading}
				articles={articles}
			/>
		</>
	);
}
