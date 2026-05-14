import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { Suspense } from 'react';

import { Footer } from '@/components/layout/content/footer/Footer';
import { Header } from '@/components/layout/content/header/Header';
import { TelegramWidget } from '@/components/ui/TelegramWidget';
import { YandexMetrica } from '@/components/ui/analytics/YandexMetrica';

import { Providers } from '@/providers/Providers';

import { SITE_URL } from '@/constants/constants';
import { CONTACT_MARKERS } from '@/constants/contact-markers';

import { SITE_CONFIG } from '@/config/site.config';

import './globals.css';

export const metadata: Metadata = {
	title: {
		absolute: 'Кровельные работы в Новосибирске'
		// template: `%s | Первая Кровельная Компания`
	},
	description:
		'В «Первой Кровельной Компании» помимо товаров для кровли европейского качества предоставляется ряд услуг. У нас имеются мастера, которые выполнят монтажные работы в Новосибирске и области.',
	metadataBase: new URL(SITE_URL)
};

const roboto = Roboto({
	subsets: ['cyrillic'],
	weight: ['200', '300', '400', '500', '600', '700', '800'],
	preload: false
});

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	const primaryContact = CONTACT_MARKERS[0];

	const normalizePhoneToTel = (value?: string) => {
		const raw = value?.trim();
		if (!raw) return undefined;
		const digits = raw.replace(/\D/g, '');
		if (!digits) return undefined;
		return digits.startsWith('7') ? `+${digits}` : `+7${digits}`;
	};

	const organizationJsonLd = {
		'@context': 'https://schema.org',
		'@type': ['Organization', 'LocalBusiness'],
		name: 'Первая Кровельная Компания',
		url: SITE_URL,
		description: SITE_CONFIG.description,
		telephone: normalizePhoneToTel(SITE_CONFIG.phoneNumber),
		email: SITE_CONFIG.email,
		logo: `${SITE_URL}/logo.svg`,
		image: `${SITE_URL}/logo-square.jpg`,
		address: primaryContact
			? {
					'@type': 'PostalAddress',
					addressLocality: primaryContact.addressLocality,
					postalCode: primaryContact.postalCode,
					streetAddress: primaryContact.streetAddress,
					addressCountry: 'RU'
				}
			: undefined,
		geo: primaryContact
			? {
					'@type': 'GeoCoordinates',
					latitude: primaryContact.coordinates.lat,
					longitude: primaryContact.coordinates.lng
				}
			: undefined,
		openingHoursSpecification: SITE_CONFIG.openingHoursSpecification.map(spec => ({
			'@type': 'OpeningHoursSpecification',
			...spec
		})),
		sameAs: [
			...SITE_CONFIG.sameAs,
			`mailto:${SITE_CONFIG.email}`,
			...(normalizePhoneToTel(SITE_CONFIG.phoneNumber)
				? [`tel:${normalizePhoneToTel(SITE_CONFIG.phoneNumber)}`]
				: [])
		]
	};

	return (
		<html
			lang='ru'
			className={`${roboto.className}  antialiased`}
		>
			<head>
				<link
					rel='preconnect'
					href='https://api.pkksib.ru'
				/>
				<link
					rel='dns-prefetch'
					href='https://api.pkksib.ru'
				/>
				<link
					rel='preconnect'
					href='https://cdn.pkksib.ru'
				/>
				<link
					rel='dns-prefetch'
					href='https://cdn.pkksib.ru'
				/>
				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
				/>
			</head>
			<body>
				<Providers>
					<Suspense>
						<YandexMetrica />
					</Suspense>
					<Header />
					<main className='mt-4 lg:mt-5'>{children}</main>
					<Footer />
					<TelegramWidget />
				</Providers>
			</body>
		</html>
	);
}
