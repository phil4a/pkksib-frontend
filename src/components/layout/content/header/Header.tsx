'use client';

import { Roboto_Condensed } from 'next/font/google';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Logo } from '../logo/Logo';
import { Menu } from '../menu/Menu';

import { HeaderActions } from './HeaderActions';
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
				<div className='layout-container flex gap-6 lg:clamp-[gap,3,6] justify-between items-center py-2'>
					<Link
						href={'/'}
						className='flex items-center gap-2'
					>
						<Logo />
						<div className={cn('flex flex-col items-start font-medium', robotoCondensed.className)}>
							<span className='uppercase tracking-tight lg:tracking-tighter clamp-[text,0.75rem,sm,@xs,@sm] lg:clamp-[text,sm,base,@lg,@80rem] leading-tight'>
								первая кровельная компания
							</span>
							<span className='uppercase text-dark-gray clamp-[text,0.55rem,xs,@xs,@sm] lg:clamp-[text,xs,0.8rem,@lg,@80rem] tracking-tight leading-tight'>
								высокое качество без посредников
							</span>
						</div>
					</Link>
					<Menu />
					<div className='hidden lg:block'>
						<HeaderActions />
					</div>
				</div>
			</div>
		</div>
	);
}
