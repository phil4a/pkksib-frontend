'use client';

import { FilterButton } from '@/ui/button/FilterButton';
import { SkeletonLoader } from '@/ui/skeleton/SkeletonLoader';

import { useArticlesFilter } from '@/hooks/articles/useArticlesFilter';

import { ArticlesList } from './ArticlesList';

export function ArticlesWrapper() {
	const { selectedTag, setSelectedTag, tags, tagsLoading, articles, articlesLoading } =
		useArticlesFilter();

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
							type={selectedTag === tag.name ? 'checked' : 'unchecked'}
							onClick={() => setSelectedTag(tag.name)}
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
