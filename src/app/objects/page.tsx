import type { Metadata } from 'next';
import { Suspense } from 'react';

import { ObjectsHeading } from '@/components/layout/content/objects-page/ObjectsHeading';
import { ObjectsText } from '@/components/layout/content/objects-page/ObjectsText';
import { ObjectsWrapper } from '@/components/layout/content/objects-page/ObjectsWrapper';
import { OrderForm } from '@/components/layout/form/order/OrderForm';

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
			<OrderForm title='Свяжитесь с нами по любому проекту' />
			<ObjectsText />
		</div>
	);
}
