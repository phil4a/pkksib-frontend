import type { Metadata } from 'next';

import { ContactsClient } from '@/components/layout/content/contacts/ContactsClient';
import { Details } from '@/components/layout/content/contacts/Details';
import { Heading } from '@/components/layout/content/contacts/Heading';
import { OrderForm } from '@/components/layout/form/order/OrderForm';

import { SITE_URL } from '@/constants/constants';
import { CONTACT_MARKERS } from '@/constants/contact-markers';

export const metadata: Metadata = {
	title: 'Кровельные работы в Новосибирске',
	description:
		'В «Первой Кровельной Компании» помимо товаров для кровли европейского качества предоставляется ряд услуг. У нас имеются мастера, которые выполнят монтажные работы в Новосибирске и области.',
	alternates: {
		canonical: `${SITE_URL}/contacts`
	},
	openGraph: {
		title: 'Кровельные работы в Новосибирске',
		description:
			'В «Первой Кровельной Компании» помимо товаров для кровли европейского качества предоставляется ряд услуг. У нас имеются мастера, которые выполнят монтажные работы в Новосибирске и области.',
		type: 'website',
		siteName: 'Первая Кровельная Компания',
		locale: 'ru_RU',
		url: `${SITE_URL}/contacts`,
		images: [
			{
				url: `${SITE_URL}/logo.png`,
				width: 512,
				height: 512,
				alt: 'Первая Кровельная Компания'
			}
		]
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Кровельные работы в Новосибирске',
		description:
			'В «Первой Кровельной Компании» помимо товаров для кровли европейского качества предоставляется ряд услуг. У нас имеются мастера, которые выполнят монтажные работы в Новосибирске и области.',
		images: [`${SITE_URL}/logo.png`]
	}
};

export default function ContactsPage() {
	const siteUrl = SITE_URL;
	const primaryContact = CONTACT_MARKERS[0];
	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'RoofingContractor',
		name: 'Первая Кровельная Компания',
		url: `${siteUrl}/contacts`,
		telephone: primaryContact?.telephoneLink
			? `+${primaryContact.telephoneLink.replace(/\D/g, '')}`
			: undefined,
		address: primaryContact
			? {
					'@type': 'PostalAddress',
					addressLocality: primaryContact.addressLocality,
					postalCode: primaryContact.postalCode,
					streetAddress: primaryContact.streetAddress,
					addressCountry: 'RU'
				}
			: undefined,
		logo: `${siteUrl}/logo-square.jpg`
	};

	return (
		<div className='layout-container mt-4 lg:mt-8'>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
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
