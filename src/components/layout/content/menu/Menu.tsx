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
import { PAGE } from '@/config/pages';

import { useActivePath } from '@/hooks/navigation/useActivePath';
import { useServiceCategories } from '@/hooks/services/useServiceCategories';

import { cn } from '@/lib/utils';

export function Menu() {
	const { categories, isLoading } = useServiceCategories();
	const { isActiveHref, isExact } = useActivePath();

	return (
		<NavigationMenu viewport={false}>
			<NavigationMenuList>
				{MAIN_MENU.map(menuItem => {
					const isServices = menuItem.href === PAGE.SERVICES;
					return (
						<NavigationMenuItem key={menuItem.label}>
							{isServices ? (
								<>
									<NavigationMenuTrigger
										className={cn(
											isActiveHref(menuItem.href) && 'bg-accent text-accent-foreground'
										)}
									>
										{menuItem.label}
									</NavigationMenuTrigger>
									<NavigationMenuContent>
										<ul className='grid w-[300px] gap-2 p-4'>
											{!!menuItem.href && (
												<li key={`${menuItem.label}-all`}>
													<NavigationMenuLink asChild>
														<Link
															href={menuItem.href}
															className={cn(
																'block select-none space-y-1 rounded-md p-3 no-underline outline-none transition-colors bg-white/60 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
																isExact(menuItem.href) && 'bg-accent text-accent-foreground'
															)}
														>
															<div className='font-medium'>Все услуги</div>
														</Link>
													</NavigationMenuLink>
												</li>
											)}
											{!isLoading &&
												categories.map(category => (
													<li key={category.slug}>
														<NavigationMenuLink asChild>
															<Link
																href={PAGE.SERVICE(category.slug)}
																className={cn(
																	'block select-none space-y-1 rounded-md p-3 no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
																	isExact(PAGE.SERVICE(category.slug)) &&
																		'bg-accent text-accent-foreground'
																)}
															>
																<div className=''>{category.title}</div>
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
									className={cn(
										navigationMenuTriggerStyle(),
										isActiveHref(menuItem.href) && 'bg-accent text-accent-foreground'
									)}
								>
									<Link href={menuItem.href}>{menuItem.label}</Link>
								</NavigationMenuLink>
							)}
						</NavigationMenuItem>
					);
				})}
			</NavigationMenuList>
		</NavigationMenu>
	);
}
