import { Button } from '@/ui/button/Button';

import { SITE_CONFIG } from '@/config/site.config';

import { HeaderLink } from './HeaderLink';

export function HeaderActions() {
	return (
		<div className='flex gap-4'>
			<div className='flex flex-col items-end'>
				<HeaderLink
					href={`tel:${SITE_CONFIG.phoneNumber}`}
					className='font-semibold text-nowrap'
				>
					{SITE_CONFIG.phoneNumber}
				</HeaderLink>
				<HeaderLink
					href={`mailto:${SITE_CONFIG.email}`}
					className='text-dark-gray'
				>
					{SITE_CONFIG.email}
				</HeaderLink>
			</div>
			<Button
				type='accent'
				data-open-consult
			>
				Связаться c нами
			</Button>
		</div>
	);
}
