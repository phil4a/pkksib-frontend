import Link from 'next/link';

import { HeaderLink } from './HeaderLink';

export function Header() {
	return (
		<div>
			<div>
				<div className='bg-light-gray h-8'>
					<div className='layout-container h-full flex items-center justify-end'>
						<div className='flex gap-4'>
							<HeaderLink
								href='/'
								secondary
								iconLink='/assets/icons/telegram.svg'
								className='text-sm font-semibold leading-normal'
							>
								Телеграм
							</HeaderLink>

							<HeaderLink
								href='/'
								secondary
								iconLink='/assets/icons/whatsapp.svg'
								className='text-sm font-semibold leading-normal'
							>
								WhatsApp
							</HeaderLink>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
