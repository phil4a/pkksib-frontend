'use client';

import { useEffect, useState } from 'react';

import { Logo } from '../logo/Logo';
import { Menu } from '../menu/Menu';

import { HeaderActions } from './HeaderActions';
import { HeaderTop } from './HeaderTop';
import { cn } from '@/lib/utils';

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
				<div className='layout-container flex gap-6 justify-between items-center py-2'>
					<Logo />
					<Menu />
					<div className='hidden lg:block'>
						<HeaderActions />
					</div>
				</div>
			</div>
		</div>
	);
}
