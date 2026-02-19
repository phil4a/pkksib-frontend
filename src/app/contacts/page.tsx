import type { Metadata } from 'next';

import { ContactsClient } from '@/components/layout/content/contacts/ContactsClient';
import { Details } from '@/components/layout/content/contacts/Details';
import { Heading } from '@/components/layout/content/contacts/Heading';
import { OrderForm } from '@/components/layout/form/order/OrderForm';

export const metadata: Metadata = {
	title: 'Кровельные работы в Новосибирске',
	description:
		'В «Первой Кровельной Компании» помимо товаров для кровли европейского качества предоставляется ряд услуг. У нас имеются мастера, которые выполнят монтажные работы в Новосибирске и области.'
};

export default function ContactsPage() {
	return (
		<div className='layout-container mt-4 lg:mt-8'>
			<Heading />
			<ContactsClient />
			<Details />
			<div className='container-layout my-16 lg:my-25'>
				<OrderForm
					title={[
						{ text: 'Оставьте заявку – ' },
						{ text: 'получите бесплатный расчет', accent: true }
					]}
				/>
			</div>
		</div>
	);
}
