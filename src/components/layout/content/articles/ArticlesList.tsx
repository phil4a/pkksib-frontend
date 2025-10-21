import { SkeletonLoader } from '@/ui/skeleton/SkeletonLoader';

import { ArticleCard } from './ArticleCard';
import type { IArticle } from '@/types/article.types';

interface Props {
	articlesLoading: boolean;
	articles: IArticle[];
}

export function ArticlesList({ articlesLoading, articles }: Props) {
	return (
		<div className='mb-16 lg:mb-25'>
			{articlesLoading && (
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5'>
					{Array.from({ length: 3 }).map((_, i) => (
						<SkeletonLoader
							key={i}
							className='h-64 w-full rounded-xl h-[500px]'
						/>
					))}
				</div>
			)}
			{!articlesLoading && (
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5'>
					{articles.map((item, idx) => (
						<ArticleCard
							key={item.id}
							item={item}
							priority={idx < 3}
						/>
					))}
				</div>
			)}
		</div>
	);
}
