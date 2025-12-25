import type { Metadata } from 'next';

import { AboutCertificates } from '@/components/layout/content/about/AboutCertificates';
import { CompanyNumbers } from '@/components/layout/content/about/CompanyNumbers';
import { Hero } from '@/components/layout/content/about/Hero';
import { Team } from '@/components/layout/content/about/Team';
import { WhyChooseUs } from '@/components/layout/content/about/WhyChooseUs';
import { DirectorForm } from '@/components/layout/form/director/DirectorForm';
import { OrderForm } from '@/components/layout/form/order/OrderForm';

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
			{/* <AboutCertificates /> */}
			<div className='layout-container my-20 md:my-25'>
				<DirectorForm />
			</div>
			{/* <div className='layout-container my-20 md:my-25'>
				<OrderForm
					title={[
						{ text: 'Оставьте заявку', accent: true },
						{ text: ' — мы свяжемся и рассчитаем смету' }
					]}
				/>
			</div> */}
		</>
	);
}
