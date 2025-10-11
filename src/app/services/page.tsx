import type { Metadata } from 'next';

import { Heading } from '@/components/layout/content/services/Heading';
import { ServiceRelated } from '@/components/layout/content/services/ServiceRelated';
import { ServiceText } from '@/components/layout/content/services/ServiceText';
import { ServicesList } from '@/components/layout/content/services/ServicesList';

import { serviceService } from '@/services/service.service';

export const metadata: Metadata = {
	title: 'Кровельные и фасадные работы в Новосибирске',
	description:
		'В «Первой Кровельной Компании» помимо товаров для кровли европейского качества предоставляется ряд услуг. У нас имеются мастера, которые выполнят монтажные работы в Новосибирске и области.'
};

export const revalidate = 300;
export const dynamic = 'force-static';

export default async function ServicesPage() {
	const { data } = await serviceService.getCategories();
	const categories = data.data;

	return (
		<>
			<Heading />
			<ServicesList items={categories} />
			<ServiceText />
			<ServiceRelated />
		</>
	);
}
