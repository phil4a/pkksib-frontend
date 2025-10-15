import { Breadcrumbs } from '@/ui/Breadcrumbs';
import { Title } from '@/ui/title/Title';

import { PAGE_INFO } from '@/config/pages';

export function PricesHeading() {
	return (
		<div className='my-8'>
			<Breadcrumbs
				items={[
					{ label: 'Главная', href: '/' },
					{ label: PAGE_INFO.PRICES.title, href: PAGE_INFO.PRICES.href, isCurrent: true }
				]}
				className='mb-3'
			></Breadcrumbs>
			<Title
				type='h1'
				className='mb-0'
			>
				Прайс-лист
			</Title>
		</div>
	);
}
