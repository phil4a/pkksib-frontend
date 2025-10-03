import type { Metadata } from 'next';

import { Hero } from '@/components/layout/content/about/Hero';

export const metadata: Metadata = {
	title: 'Первая Кровельная Компания - Кровельные работы в Новосибирске',
	description:
		'В «Первой Кровельной Компании» помимо товаров для кровли европейского качества предоставляется ряд услуг. У нас имеются мастера, которые выполнят монтажные работы в Новосибирске и области.'
};

export default function AboutPage() {
	return (
		<>
			<Hero />
		</>
	);
}
