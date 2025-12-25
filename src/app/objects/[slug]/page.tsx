import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Hero } from '@/components/layout/content/object-page/Hero';
import { ObjectGallery } from '@/components/layout/content/object-page/ObjectGallery';
import { PageContent } from '@/components/layout/content/object-page/PageContent';
import { RelatedObjects } from '@/components/layout/content/object-page/RelatedObjects';
import { DirectorForm } from '@/components/layout/form/director/DirectorForm';
import { OrderForm } from '@/components/layout/form/order/OrderForm';

import { objectService } from '@/services/object.service';
import type { TPageSlugProp } from '@/types/page.types';

export const revalidate = 100;
export const dynamic = 'force-static';

export async function generateMetadata({ params }: TPageSlugProp): Promise<Metadata> {
	const { slug } = await params;
	const { data } = await objectService.getBySlug(slug);
	const object = data;

	if (!object) {
		notFound();
	}

	// Функция для очистки HTML тегов из строки
	const stripHtml = (html: string) => {
		return html.replace(/<[^>]*>/g, '').trim();
	};

	const cleanDescription = object?.short_description
		? stripHtml(object.short_description.slice(0, 200))
		: '';

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

	if (!object) {
		notFound();
	}

	const categorySlug = object?.object_categories?.[0]?.slug;

	const relatedRes = await objectService.getRelated({
		categorySlug,
		excludeSlug: slug,
		limit: 6
	});
	const relatedObjects = relatedRes?.data?.data || [];

	return (
		<>
			<Hero object={object} />
			{object?.description && <PageContent description={object?.description} />}
			{object?.photos && <ObjectGallery photos={object?.photos || []} />}

			<RelatedObjects
				objects={relatedObjects}
				className='mb-16 lg:mb-25'
			/>
			<div className='bg-light-gray'>
				<div className='layout-container py-20'>
					<DirectorForm />
					{/* <OrderForm title='Оставьте заявку на выполнение такого же проекта' /> */}
				</div>
			</div>
		</>
	);
}
