import { Breadcrumbs } from '@/ui/Breadcrumbs';
import { Title } from '@/ui/title/Title';

import { PAGE_INFO } from '@/config/pages';

interface Props {
	title?: string;
}

export function ObjectsHeading({ title }: Props) {
	return (
		<div className='pt-8'>
			<Breadcrumbs
				items={[
					{ label: PAGE_INFO.HOME.title, href: PAGE_INFO.HOME.href },
					{ label: PAGE_INFO.OBJECTS.title, href: PAGE_INFO.OBJECTS.href, isCurrent: !title },
					...(title ? [{ label: title, isCurrent: true }] : [])
				]}
				className='mb-3'
			></Breadcrumbs>
			<Title
				type='h1'
				className='mb-8'
			>
				{title ? title : PAGE_INFO.OBJECTS.title}
			</Title>
		</div>
	);
}
