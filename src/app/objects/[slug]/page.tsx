import type { Metadata } from 'next';

import { Hero } from '@/components/layout/content/object-page/Hero';
import { ObjectGallery } from '@/components/layout/content/object-page/ObjectGallery';
import { PageContent } from '@/components/layout/content/object-page/PageContent';

import { objectService } from '@/services/object.service';
import type { TPageSlugProp } from '@/types/page.types';

export const revalidate = 100;
export const dynamic = 'force-static';

export async function generateMetadata({ params }: TPageSlugProp): Promise<Metadata> {
	try {
		const { slug } = await params;
		const { data } = await objectService.getBySlug(slug);
		const object = data;

		// Функция для очистки HTML тегов из строки
		const stripHtml = (html: string) => {
			return html.replace(/<[^>]*>/g, '').trim();
		};

		const cleanDescription = object?.description ? stripHtml(object.description.slice(0, 200)) : '';

		return {
			title: object?.seo?.seoTitle || object?.title || 'Объект ПКК',
			openGraph: {
				title: object?.seo?.seoTitle || object?.title || 'Объект ПКК',
				type: 'article',
				images: [object?.photos?.[0]?.url || '']
			},
			description: object?.seo?.seoDescription || cleanDescription || 'Описание объекта ПКК'
		};
	} catch (error) {
		console.error('Error generating metadata:', error);
		return {
			title: 'Объект не найден - ПКК',
			description: 'Запрашиваемый объект не найден'
		};
	}
}

export async function generateStaticParams() {
	try {
		const { data } = await objectService.getAll();
		const objects = data?.data;

		if (!objects || objects.length === 0) {
			console.warn('No objects found for static generation');
			return [];
		}

		return objects
			.filter(object => object.slug) // Фильтруем объекты без slug
			.map(object => ({
				slug: object.slug
			}));
	} catch (error) {
		console.error('Error generating static params:', error);
		return [];
	}
}

export default async function ObjectPage({ params }: TPageSlugProp) {
	try {
		const { slug } = await params;
		const data = await objectService.getBySlug(slug);
		const object = data?.data;

		if (!object) {
			return (
				<div className='layout-container py-25'>
					<h1>Объект не найден</h1>
					<p>Запрашиваемый объект не существует или был удален.</p>
				</div>
			);
		}

		return (
			<>
				<Hero object={object} />
				<PageContent />
				<ObjectGallery photos={object?.photos || []} />
			</>
		);
	} catch (error) {
		console.error('Error loading object page:', error);
		return (
			<div className='layout-container py-25'>
				<h1>Ошибка загрузки</h1>
				<p>Произошла ошибка при загрузке страницы объекта.</p>
			</div>
		);
	}
}
