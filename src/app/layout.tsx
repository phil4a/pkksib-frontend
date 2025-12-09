import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import { Footer } from '@/components/layout/content/footer/Footer';
import { Header } from '@/components/layout/content/header/Header';

import { Providers } from '@/providers/Providers';

import { SITE_URL } from '@/constants/constants';

import './globals.css';

export const metadata: Metadata = {
	title: {
		absolute: 'Кровельные работы в Новосибирске'
		// template: `%s | Video platform`
	},
	description:
		'В «Первой Кровельной Компании» помимо товаров для кровли европейского качества предоставляется ряд услуг. У нас имеются мастера, которые выполнят монтажные работы в Новосибирске и области.',
	metadataBase: new URL(SITE_URL)
};

const roboto = Roboto({
	subsets: ['cyrillic'],
	display: 'swap'
});

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang='ru'
			className={`${roboto.className} antialiased`}
		>
			<head>
				<link
					rel='preconnect'
					href='https://cdn.pkksib.ru'
				/>
				<link
					rel='dns-prefetch'
					href='https://cdn.pkksib.ru'
				/>
				<link
					rel='preconnect'
					href='https://befbb7a338eb-pkk-media.s3.ru1.storage.beget.cloud'
				/>
				<link
					rel='dns-prefetch'
					href='https://befbb7a338eb-pkk-media.s3.ru1.storage.beget.cloud'
				/>
			</head>
			<body>
				<Providers>
					<Header />
					<main className='mt-4 lg:mt-5'>{children}</main>
					<Footer />
				</Providers>
			</body>
		</html>
	);
}
