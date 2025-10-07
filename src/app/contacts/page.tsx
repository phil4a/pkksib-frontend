import type { Metadata } from 'next';

import { Contacts } from '@/components/layout/content/contacts/Contacts';
import { Heading } from '@/components/layout/content/contacts/Heading';

export const metadata: Metadata = {
	title: 'Кровельные работы в Новосибирске',
	description:
		'В «Первой Кровельной Компании» помимо товаров для кровли европейского качества предоставляется ряд услуг. У нас имеются мастера, которые выполнят монтажные работы в Новосибирске и области.'
};

export default function ContactsPage() {
	return (
		<div className='layout-container mt-8'>
			<Heading />
			<Contacts />
		</div>
	);
}
