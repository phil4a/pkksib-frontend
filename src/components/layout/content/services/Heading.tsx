import { Breadcrumbs } from '@/ui/Breadcrumbs';
import { Title } from '@/ui/title/Title';

import { PAGE_INFO } from '@/config/pages';

interface Props {
	title?: string;
}

export function Heading({ title }: Props) {
	return (
		<div className='layout-container py-8'>
			<Breadcrumbs
				items={[
					{ label: PAGE_INFO.HOME.title, href: PAGE_INFO.HOME.href },
					{ label: PAGE_INFO.SERVICES.title, href: PAGE_INFO.SERVICES.href, isCurrent: !title },
					...(title ? [{ label: title, isCurrent: true }] : [])
				]}
				className='pb-3'
			></Breadcrumbs>
			<Title
				type='h1'
				className='mb-0 text-[32px] md:text-[44px]'
			>
				{title ? title : PAGE_INFO.SERVICES.title}
			</Title>
		</div>
	);
}
