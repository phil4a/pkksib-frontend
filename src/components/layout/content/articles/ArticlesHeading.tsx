import { Breadcrumbs } from '@/ui/Breadcrumbs';
import { Title } from '@/ui/title/Title';

import { PAGE_INFO } from '@/config/pages';

interface Props {
	title?: string;
}

export function ArticlesHeading({ title }: Props) {
	return (
		<div className='pt-8'>
			<Breadcrumbs
				items={[
					{ label: PAGE_INFO.HOME.title, href: PAGE_INFO.HOME.href },
					{ label: PAGE_INFO.ARTICLES.title, href: PAGE_INFO.ARTICLES.href, isCurrent: !title },
					...(title ? [{ label: title, isCurrent: true }] : [])
				]}
				className='mb-3'
			></Breadcrumbs>
			<Title
				type='h1'
				className='mb-4'
			>
				{title ? title : PAGE_INFO.ARTICLES.title}
			</Title>
		</div>
	);
}
