import type { Metadata } from 'next';

import { PriceLists } from '@/components/layout/content/prices/PriceLists';
import { PricesHeading } from '@/components/layout/content/prices/PricesHeading';

import { serviceService } from '@/services/service.service';

export const metadata: Metadata = {
	title: '',
	description: ''
};

export const revalidate = 300;
export const dynamic = 'force-static';

export default async function PricesPage() {
	const { data } = await serviceService.getCategories();
	const categories = data.data;

	return (
		<div className='layout-container'>
			<PricesHeading />
			<PriceLists items={categories} />
		</div>
	);
}
