import { TelegramIcon } from '@/ui/icons/TelegramIcon';
import { WhatsAppIcon } from '@/ui/icons/WhatsAppIcon';

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
								className='text-sm font-semibold leading-normal'
							>
								<TelegramIcon />
								Телеграм
							</HeaderLink>

							<HeaderLink
								href='/'
								secondary
								className='text-sm font-semibold leading-normal'
							>
								<WhatsAppIcon />
								WhatsApp
							</HeaderLink>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
