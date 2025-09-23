import type { Metadata } from 'next';

import { Hero } from '@/components/layout/content/object-page/Hero';

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

	const cleanDescription = object.description ? stripHtml(object.description.slice(0, 200)) : '';

	return {
		title: object.title,
		openGraph: {
			title: object.title || '',
			type: 'article',
			images: [object.photos?.[0]?.url || '']
		},
		description: cleanDescription
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
	return <Hero object={object} />;
}
