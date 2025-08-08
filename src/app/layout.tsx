import type { Metadata } from 'next';
import { Noto_Sans } from 'next/font/google';

import { Providers } from '@/providers/Providers';

import { SITE_URL } from '@/constants/constants';

import './globals.css';

const notoSans = Noto_Sans({
	variable: '--font-noto-sans',
	subsets: ['latin']
});

export const metadata: Metadata = {
	title: {
		absolute: 'Video platform',
		template: `%s | Video platform`
	},
	description: 'App for video watching',
	metadataBase: new URL(SITE_URL)
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`${notoSans.variable}  antialiased`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
