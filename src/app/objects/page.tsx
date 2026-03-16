import type { Metadata } from 'next';
import { Suspense } from 'react';

import { LazyObjectsMap } from '@/components/layout/content/home-page/objects-map/LazyObjectsMap';
import { ObjectsHeading } from '@/components/layout/content/objects-page/ObjectsHeading';
import { ObjectsText } from '@/components/layout/content/objects-page/ObjectsText';
import { ObjectsWrapper } from '@/components/layout/content/objects-page/ObjectsWrapper';
import { OrderForm } from '@/components/layout/form/order/OrderForm';

import { SkeletonLoader } from '@/ui/skeleton/SkeletonLoader';
import { ViewportLazy } from '@/ui/viewport/ViewportLazy';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
	title: 'Выполненные объекты нашей компании',
	description:
		'В «Первой Кровельной Компании» помимо товаров для кровли европейского качества предоставляется ряд услуг. У нас имеются мастера, которые выполнят монтажные работы в Новосибирске и области.',
	alternates: {
		canonical: `${SITE_URL}/objects`
	}
};

function getObjectsHeadingTitle(categoriesRaw: string | undefined): string | undefined {
	const slugs = (categoriesRaw || '')
		.split(',')
		.map(s => s.trim())
		.filter(Boolean);

	if (slugs.length !== 1) return undefined;

	const slug = slugs[0]!.toLowerCase();

	if (slug.includes('administr')) return 'Административные объекты';
	if (slug.includes('prom')) return 'Промышленные объекты';
	if (slug.includes('kotted')) return 'Коттеджи';
	if (slug.includes('pod-klyuch') || slug.includes('pod-kluch')) return 'Объекты: дома под ключ';

	return undefined;
}

interface ObjectsPageProps {
	searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ObjectsPage({ searchParams }: ObjectsPageProps) {
	const sp = await searchParams;
	const categoriesParamRaw = Array.isArray(sp.categories) ? sp.categories.join(',') : sp.categories;
	const headingTitle = getObjectsHeadingTitle(categoriesParamRaw);

	return (
		<div className='layout-container'>
			<ObjectsHeading title={headingTitle} />
			<Suspense fallback={<div>Загрузка объектов...</div>}>
				<ObjectsWrapper />
			</Suspense>
			<div className='-mx-4'>
				<ViewportLazy
					rootMargin='500px'
					placeholder={
						<div className='my-16'>
							<SkeletonLoader className='h-90 sm:h-140 md:h-150 w-full rounded-xl' />
						</div>
					}
				>
					<LazyObjectsMap />
				</ViewportLazy>
			</div>
			<OrderForm title='Свяжитесь с нами по любому проекту' />
			<ObjectsText />
		</div>
	);
}
