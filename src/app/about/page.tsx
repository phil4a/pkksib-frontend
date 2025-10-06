import type { Metadata } from 'next';

import { CompanyNumbers } from '@/components/layout/content/about/CompanyNumbers';
import { Hero } from '@/components/layout/content/about/Hero';
import { Team } from '@/components/layout/content/about/Team';
import { WhyChooseUs } from '@/components/layout/content/about/WhyChooseUs';

export const metadata: Metadata = {
	title: 'Первая Кровельная Компания - Кровельные работы в Новосибирске',
	description:
		'В «Первой Кровельной Компании» помимо товаров для кровли европейского качества предоставляется ряд услуг. У нас имеются мастера, которые выполнят монтажные работы в Новосибирске и области.'
};

export default function AboutPage() {
	return (
		<>
			<Hero />
			<WhyChooseUs />
			<Team />
			<CompanyNumbers />
		</>
	);
}
