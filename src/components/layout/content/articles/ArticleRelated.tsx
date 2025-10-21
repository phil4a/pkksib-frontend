'use client';

import { useQuery } from '@tanstack/react-query';

import { SkeletonLoader } from '@/ui/skeleton/SkeletonLoader';
import { Title } from '@/ui/title/Title';

import { ArticleCard } from './ArticleCard';
import { articlesService } from '@/services/articles.service';
import type { IArticle } from '@/types/article.types';

interface Props {
	tagId: number;
	excludeSlug: string;
	limit?: number;
}

export function ArticleRelated({ tagId, excludeSlug, limit = 3 }: Props) {
	const { data, isLoading, error } = useQuery({
		queryKey: ['articles_related', tagId, excludeSlug, limit],
		queryFn: () => articlesService.getRelated(tagId, excludeSlug, limit),
		staleTime: 1000 * 60 * 5
	});

	const articles: IArticle[] = data?.data?.data || [];

	if (error) {
		return <div>Ошибка загрузки связанных статей</div>;
	}

	return (
		<section className='mb-16 lg:mb-25'>
			<Title
				type='h2'
				className='text-[28px] font-semibold mb-8'
			>
				Похожие статьи
			</Title>
			{isLoading ? (
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
					{Array.from({ length: limit }).map((_, i) => (
						<SkeletonLoader
							key={i}
							className='h-64 w-full rounded-xl h-[500px]'
						/>
					))}
				</div>
			) : (
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
					{articles.map((item, idx) => (
						<ArticleCard
							key={item.id}
							item={item}
						/>
					))}
				</div>
			)}
		</section>
	);
}
