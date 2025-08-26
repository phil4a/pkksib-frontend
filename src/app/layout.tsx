import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

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
			<body>
				<Providers>
					<Header />
					{children}
				</Providers>
			</body>
		</html>
	);
}
