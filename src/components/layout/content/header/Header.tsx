'use client';

import { Roboto_Condensed } from 'next/font/google';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { SITE_CONFIG } from '@/config/site.config';

import { Logo } from '../logo/Logo';
import { Menu } from '../menu/Menu';

import { HeaderActions } from './HeaderActions';
import { HeaderLink } from './HeaderLink';
import { HeaderTop } from './HeaderTop';
import { cn } from '@/lib/utils';

const robotoCondensed = Roboto_Condensed({
	subsets: ['cyrillic'],
	weight: ['500'],
	preload: false
});

export function Header() {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const onScroll = () => {
			setScrolled(window.scrollY > 0);
		};

		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	return (
		<div
			className={cn(
				'sticky top-0 z-50 bg-white transition-shadow',
				scrolled && 'shadow-[0_1px_6px_rgba(0,0,0,0.05)]'
			)}
		>
			<HeaderTop />
			<div>
				<div className='layout-container flex gap-2 lg:clamp-[gap,3,6] justify-between items-center py-2'>
					<Link
						href={'/'}
						className='flex items-center gap-2'
					>
						<Logo />
						<div
							className={cn(
								'hidden min-[400px]:flex flex-col items-start font-medium',
								robotoCondensed.className
							)}
						>
							<span className='uppercase tracking-tight lg:tracking-tighter clamp-[text,0.55rem,xs,@xs,@sm] lg:clamp-[text,sm,base,@lg,@80rem] leading-tight'>
								первая кровельная компания
							</span>
							<span className='uppercase text-dark-gray clamp-[text,0.45rem,0.55rem,@xs,@sm] lg:clamp-[text,xs,0.8rem,@lg,@80rem] tracking-tight leading-tight'>
								высокое качество без посредников
							</span>
						</div>
					</Link>
					<div className='flex items-center gap-2 sm:gap-4'>
						<HeaderLink
							href={`tel:${SITE_CONFIG.mobilePhone}`}
							className='block lg:hidden font-semibold text-sm sm:text-base text-nowrap'
						>
							{SITE_CONFIG.mobilePhone}
						</HeaderLink>
						<Menu />
					</div>
					<div className='hidden lg:block'>
						<HeaderActions />
					</div>
				</div>
			</div>
		</div>
	);
}
