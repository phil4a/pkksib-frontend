'use client';

import Link from 'next/link';

import { TelegramIcon } from '@/components/ui/icons/TelegramIcon';

import { SITE_CONFIG } from '@/config/site.config';

export function TelegramWidget() {
	return (
		<Link
			href={SITE_CONFIG.telegramLink}
			target='_blank'
			rel='noopener noreferrer'
			className='fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-50 flex items-center justify-center w-10 h-10 lg:w-14 lg:h-14 bg-[#2AABEE] text-white rounded-full shadow-lg hover:bg-[#229ED9] hover:scale-110 hover:-translate-y-1 transition-all duration-300 group'
			aria-label='Написать в Telegram'
		>
			<div className='relative flex items-center justify-center w-full h-full'>
				<TelegramIcon className='w-5 h-5 lg:w-7 lg:h-7 mr-0.5 lg:mr-1' />

				<span className='absolute inset-0 rounded-full bg-[#2AABEE] opacity-75 animate-ping-slow group-hover:animate-none -z-10' />
			</div>

			<span className='absolute right-full mr-4 px-3 py-2 bg-white text-primary text-sm font-base rounded-lg shadow-xl opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap pointer-events-none border border-gray-100'>
				Написать в Telegram
				<span className='absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-white border-r border-b border-gray-100 -rotate-45' />
			</span>
		</Link>
	);
}
