'use client';

import { useEffect, useRef, useState } from 'react';

import { Logo } from '../logo/Logo';
import { Menu } from '../menu/Menu';

import { HeaderActions } from './HeaderActions';
import { HeaderTop } from './HeaderTop';
import { cn } from '@/lib/utils';

export function Header() {
	const [scrolled, setScrolled] = useState(false);
	const sentinelRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const el = sentinelRef.current;
		if (!el) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				setScrolled(!entry.isIntersecting);
			},
			{ root: null, threshold: 0 }
		);

		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	return (
		<>
			<HeaderTop />
			<div
				ref={sentinelRef}
				aria-hidden='true'
				className='h-px'
			></div>
			<div className={cn('sticky top-0 z-50 bg-white transition-shadow', scrolled && 'shadow-sm')}>
				<div className='layout-container flex gap-6 justify-between items-center py-2'>
					<Logo />
					<Menu />
					<div className='hidden lg:block'>
						<HeaderActions />
					</div>
				</div>
			</div>
		</>
	);
}
