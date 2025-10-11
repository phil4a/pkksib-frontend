import { Breadcrumbs } from '@/ui/Breadcrumbs';

import { PAGE_INFO } from '@/config/pages';
import { PAGE } from '@/config/pages';

import type { IService } from '@/types/service.types';

interface Props {
	service?: IService;
}

export function ServiceHeading({ service }: Props) {
	return (
		<div className='layout-container py-8'>
			<Breadcrumbs
				items={[
					{ label: PAGE_INFO.HOME.title, href: PAGE_INFO.HOME.href },
					{
						label: PAGE_INFO.SERVICES.title,
						href: PAGE_INFO.SERVICES.href,
						isCurrent: !service?.title
					},
					...(service?.service_category
						? [
								{
									label: service.service_category.title,
									href: PAGE.SERVICE(service.service_category.slug)
								}
							]
						: []),

					...(service?.title ? [{ label: service.title, isCurrent: true }] : [])
				]}
				className='mb-3'
			></Breadcrumbs>
		</div>
	);
}
