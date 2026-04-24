import type { Metadata } from 'next';
import { Suspense } from 'react';

import { LazyObjectsMap } from '@/components/layout/content/home-page/objects-map/LazyObjectsMap';
import { ObjectsHeading } from '@/components/layout/content/objects-page/ObjectsHeading';
import { ObjectsText } from '@/components/layout/content/objects-page/ObjectsText';
import { ObjectsWrapper } from '@/components/layout/content/objects-page/ObjectsWrapper';
import { OrderForm } from '@/components/layout/form/order/OrderForm';

import { SkeletonLoader } from '@/ui/skeleton/SkeletonLoader';
import { ViewportLazy } from '@/ui/viewport/ViewportLazy';

import { getObjectsHeadingTitle } from '@/utils/objects';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
	title: 'Выполненные объекты нашей компании',
	description:
		'В «Первой Кровельной Компании» помимо товаров для кровли европейского качества предоставляется ряд услуг. У нас имеются мастера, которые выполнят монтажные работы в Новосибирске и области.',
	alternates: {
		canonical: `${SITE_URL}/objects`
	}
};

export const revalidate = 300;

interface ObjectsPageProps {
	searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ObjectsPage({ searchParams }: ObjectsPageProps) {
	const sp = await searchParams;
	const categoriesParamRaw = Array.isArray(sp.categories) ? sp.categories.join(',') : sp.categories;
	const headingTitle = getObjectsHeadingTitle(categoriesParamRaw);
	const wrapperKey = JSON.stringify(sp);

	return (
		<div className='layout-container'>
			<ObjectsHeading title={headingTitle} />
			<Suspense
				fallback={
					<section className='mb-25'>
						<div className='relative flex gap-5 items-start'>
							<div className='hidden md:block md:sticky md:top-[calc(var(--header-height)+60px)] md:self-start flex-1/4'>
								<div className='space-y-4'>
									<div className='bg-light-gray h-6 rounded-sm animate-pulse' />
									<div className='bg-light-gray h-6 rounded-sm animate-pulse' />
									<div className='bg-light-gray h-6 rounded-sm animate-pulse' />
									<div className='bg-light-gray h-6 rounded-sm animate-pulse' />
								</div>
							</div>
							<div className='flex-3/4'>
								<div className='mt-8 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
									<SkeletonLoader
										count={9}
										className='rounded-xl h-[360px]'
									/>
								</div>
							</div>
						</div>
					</section>
				}
			>
				<ObjectsWrapper
					key={wrapperKey}
					searchParams={sp}
				/>
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
