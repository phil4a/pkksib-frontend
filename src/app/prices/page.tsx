import type { Metadata } from 'next';

import { PriceLists } from '@/components/layout/content/prices/PriceLists';
import { PricesHeading } from '@/components/layout/content/prices/PricesHeading';

import { serviceService } from '@/services/service.service';

export const metadata: Metadata = {
	title: `Цены на кровельные работы в Новосибирске в ${new Date().getFullYear()} году`,
	description: `Актуальные цены на кровельные работы в Новосибирске. Узнайте стоимость монтажа, ремонта и обслуживания кровли под ключ. Прайс-лист ${new Date().getFullYear()} года.`
};

export const revalidate = 300;
export const dynamic = 'force-static';

export default async function PricesPage() {
	const { data } = await serviceService.getCategories();
	const categories = data.data;

	const ROOFING_KEYWORDS = [
		'кровл',
		'кровель',
		'крыш',
		'черепиц',
		'профнастил',
		'фальц',
		'шифер',
		'ондулин'
	];

	const sortedCategories = [...categories].sort((a, b) => {
		const isRoofingA = ROOFING_KEYWORDS.some(k => a.title.toLowerCase().includes(k));
		const isRoofingB = ROOFING_KEYWORDS.some(k => b.title.toLowerCase().includes(k));

		if (isRoofingA && !isRoofingB) return -1;
		if (!isRoofingA && isRoofingB) return 1;
		return 0;
	});

	return (
		<div className='layout-container'>
			<PricesHeading />
			<PriceLists items={sortedCategories} />
		</div>
	);
}
