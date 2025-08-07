import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'О нас',
	description: 'О нас ПКК'
};

export default function AboutPage() {
	return (
		<div>
			<h1>О нас</h1>
		</div>
	);
}
