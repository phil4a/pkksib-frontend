import { Breadcrumbs } from '@/ui/Breadcrumbs';
import { Title } from '@/ui/title/Title';

import { PAGE_INFO } from '@/config/pages';

export function Heading() {
	return (
		<div className='layout-container py-8'>
			<Breadcrumbs
				items={[
					{ label: PAGE_INFO.HOME.title, href: PAGE_INFO.HOME.href },
					{ label: PAGE_INFO.SERVICES.title, href: PAGE_INFO.SERVICES.href, isCurrent: true }
				]}
				className='mb-3'
			></Breadcrumbs>
			<Title
				type='h1'
				className='mb-0'
			>
				{PAGE_INFO.SERVICES.title}
			</Title>
		</div>
	);
}
