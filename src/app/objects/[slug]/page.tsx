import type { Metadata } from 'next';

import { Hero } from '@/components/layout/content/object-page/Hero';
import { ObjectGallery } from '@/components/layout/content/object-page/ObjectGallery';
import { PageContent } from '@/components/layout/content/object-page/PageContent';
import { OrderForm } from '@/components/layout/form/order/OrderForm';

import { Breadcrumbs } from '@/ui/Breadcrumbs';

import { buildStaticCrumbs } from '@/utils/breadcrumbs';

import { objectService } from '@/services/object.service';
import type { TPageSlugProp } from '@/types/page.types';

export const revalidate = 100;
export const dynamic = 'force-static';

export async function generateMetadata({ params }: TPageSlugProp): Promise<Metadata> {
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
}

export async function generateStaticParams() {
	const { data } = await objectService.getAll();
	const objects = data?.data;

	return objects.map(object => ({
		slug: object.slug
	}));
}

export default async function ObjectPage({ params }: TPageSlugProp) {
	const { slug } = await params;
	const data = await objectService.getBySlug(slug);
	const object = data?.data;
	return (
		<>
			<Hero object={object} />
			{object?.description && <PageContent description={object?.description} />}
			{object?.photos && <ObjectGallery photos={object?.photos || []} />}
			<div className='layout-container pt-8 pb-25'>
				<OrderForm title='Оставьте заявку на выполнение такого же проекта' />
			</div>
		</>
	);
}
