'use client';

import Link from 'next/link';

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';

import { MAIN_MENU } from '@/config/navigation';

export function Menu() {
	return (
		<NavigationMenu viewport={false}>
			<NavigationMenuList>
				{MAIN_MENU.map(menuItem => (
					<NavigationMenuItem key={menuItem.label}>
						{menuItem.submenu ? (
							<>
								<NavigationMenuTrigger>{menuItem.label}</NavigationMenuTrigger>
								<NavigationMenuContent>
									<ul className='grid w-[300px] gap-2 p-4'>
										{menuItem.submenu.map(subItem => (
											<li key={subItem.label}>
												<NavigationMenuLink asChild>
													<Link
														href={subItem.href}
														className='block select-none space-y-1 rounded-md p-3  no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'
													>
														<div className=''>{subItem.label}</div>
													</Link>
												</NavigationMenuLink>
											</li>
										))}
									</ul>
								</NavigationMenuContent>
							</>
						) : (
							<NavigationMenuLink
								asChild
								className={navigationMenuTriggerStyle()}
							>
								<Link href={menuItem.href}>{menuItem.label}</Link>
							</NavigationMenuLink>
						)}
					</NavigationMenuItem>
				))}
			</NavigationMenuList>
		</NavigationMenu>
	);
}
