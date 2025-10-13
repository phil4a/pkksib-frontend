import type { Metadata } from 'next';
import Image from 'next/image';

import { ArticleContent } from '@/components/layout/content/articles/ArticleContent';
import { ArticleRelated } from '@/components/layout/content/articles/ArticleRelated';
import { ArticlesHeading } from '@/components/layout/content/articles/ArticlesHeading';

import { formatDateToRu } from '@/utils/formatDate';

import { articlesService } from '@/services/articles.service';
import type { TPageSlugProp } from '@/types/page.types';

export const revalidate = 300;
export const dynamic = 'force-static';

export async function generateMetadata({ params }: TPageSlugProp): Promise<Metadata> {
	const { slug } = await params;
	const { data } = await articlesService.getBySlug(slug);
	const article = data;

	return {
		title: article?.seo?.seoTitle || article?.title || 'Объект ПКК',
		openGraph: {
			title: article?.seo?.seoTitle || article?.title || 'Объект ПКК',
			type: 'article',
			images: [article?.image?.url || '']
		},
		description: article?.seo?.seoDescription || article?.full_description || 'Описание статьи ПКК'
	};
}

export async function generateStaticParams() {
	const { data } = await articlesService.getAll();
	const articles = data?.data;

	return articles.map(article => ({
		slug: article.slug
	}));
}

export default async function ArticlePage({ params }: TPageSlugProp) {
	const { slug } = await params;
	const data = await articlesService.getBySlug(slug);
	const article = data?.data;

	return (
		<div className='layout-container'>
			<ArticlesHeading title={article?.title} />
			<p className='my-6 text-dark-gray'>{formatDateToRu(article?.createdAt)}</p>
			<div className='relative w-full h-120 rounded-xl overflow-hidden'>
				<Image
					src={article?.image?.url || ''}
					alt={article?.title || 'Изображение статьи ПКК'}
					fill
					className='object-cover'
				/>
			</div>
			{article.full_description && <ArticleContent article={article} />}
			{article?.tags?.length && (
				<ArticleRelated
					tagId={article?.tags?.[0]?.id || 0}
					excludeSlug={slug}
				/>
			)}
		</div>
	);
}
