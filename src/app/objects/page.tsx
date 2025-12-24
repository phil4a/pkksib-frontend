import type { Metadata } from 'next';
import { Suspense } from 'react';

import { LazyObjectsMap } from '@/components/layout/content/home-page/objects-map/LazyObjectsMap';
import { ObjectsHeading } from '@/components/layout/content/objects-page/ObjectsHeading';
import { ObjectsText } from '@/components/layout/content/objects-page/ObjectsText';
import { ObjectsWrapper } from '@/components/layout/content/objects-page/ObjectsWrapper';
import { OrderForm } from '@/components/layout/form/order/OrderForm';

import { SkeletonLoader } from '@/ui/skeleton/SkeletonLoader';
import { ViewportLazy } from '@/ui/viewport/ViewportLazy';

export const metadata: Metadata = {
	title: 'Выполненные объекты нашей компании',
	description:
		'В «Первой Кровельной Компании» помимо товаров для кровли европейского качества предоставляется ряд услуг. У нас имеются мастера, которые выполнят монтажные работы в Новосибирске и области.'
};

export default async function ObjectsPage() {
	return (
		<div className='layout-container'>
			<ObjectsHeading />
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
