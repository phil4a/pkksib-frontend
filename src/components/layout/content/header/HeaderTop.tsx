import { TelegramIcon } from '@/ui/icons/TelegramIcon';
import { WhatsAppIcon } from '@/ui/icons/WhatsAppIcon';

import { SITE_CONFIG } from '@/config/site.config';

import { HeaderLink } from './HeaderLink';

export function HeaderTop() {
	return (
		<div className='hidden lg:block bg-light-gray h-8'>
			<div className='layout-container h-full flex items-center justify-end'>
				<div className='flex gap-4'>
					<HeaderLink
						href={SITE_CONFIG.telegramLink}
						secondary
						target='_blank'
						rel='noopener noreferrer'
						className='text-sm font-semibold leading-normal text-[#24A1DE] hover:text-[#196e99]'
					>
						<TelegramIcon />
						Telegram
					</HeaderLink>

					<HeaderLink
						href={SITE_CONFIG.whatsappLink}
						target='_blank'
						secondary
						className='text-sm font-semibold leading-normal text-[#25d366] hover:text-[#199944]'
					>
						<WhatsAppIcon />
						WhatsApp
					</HeaderLink>
				</div>
			</div>
		</div>
	);
}
