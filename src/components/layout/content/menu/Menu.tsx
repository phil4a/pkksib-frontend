import Link from 'next/link';

import { MAIN_MENU } from '@/config/navigation';

import { HeaderLink } from '../header/HeaderLink';

export function Menu() {
	return (
		<nav className='grow-1 justify-center flex items-center gap-6'>
			{MAIN_MENU.map(item => (
				<HeaderLink
					key={item.label}
					href={item.href}
				>
					{item.label}
				</HeaderLink>
			))}
		</nav>
	);
}
