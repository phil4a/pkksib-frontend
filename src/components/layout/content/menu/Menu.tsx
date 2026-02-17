'use client';

import { ChevronDown, ChevronUp, Menu as MenuIcon, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/button/Button';
import { TelegramIcon } from '@/components/ui/icons/TelegramIcon';
import { WhatsAppIcon } from '@/components/ui/icons/WhatsAppIcon';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';

import { MaxIcon } from '@/ui/icons/MaxIcon';

import { MAIN_MENU } from '@/config/navigation';
import { PAGE } from '@/config/pages';
import { SITE_CONFIG } from '@/config/site.config';

import { useActivePath } from '@/hooks/navigation/useActivePath';
import { useCloseOnRouteChange } from '@/hooks/navigation/useCloseOnRouteChange';
import { useServiceCategories } from '@/hooks/services/useServiceCategories';
import { useHtmlScrollLock } from '@/hooks/ui/useHtmlScrollLock';
import { useOnEscape } from '@/hooks/ui/useOnEscape';

import { cn } from '@/lib/utils';

export function Menu() {
	const { categories, isLoading } = useServiceCategories();
	const { isActiveHref, isExact } = useActivePath();
	const [mobileOpen, setMobileOpen] = useState(false);
	const [servicesOpen, setServicesOpen] = useState(false);

	// Externalized logic hooks
	useHtmlScrollLock(mobileOpen);
	useOnEscape(mobileOpen, () => setMobileOpen(false));
	useCloseOnRouteChange(mobileOpen, () => {
		setMobileOpen(false);
		setServicesOpen(false);
	});

	return (
		<>
			{/* Desktop navigation */}
			<NavigationMenu
				viewport={false}
				className='hidden lg:flex'
			>
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
											<ul className='grid w-[300px] gap-5 p-4'>
												{!!menuItem.href && (
													<li key={`${menuItem.label}-all`}>
														<NavigationMenuLink
															asChild
															className='p-0 hover:bg-transparent'
														>
															<Link
																href={menuItem.href}
																className={cn(
																	'block leading-[1.4] select-none bg-transparent border-transparent font-semibold outline-none rounded-none hover:bg-transparent  hover:underline',
																	isExact(menuItem.href) && 'text-primary underline'
																)}
															>
																Все услуги
															</Link>
														</NavigationMenuLink>
													</li>
												)}
												{!isLoading &&
													categories.map(category => (
														<li key={category.slug}>
															<NavigationMenuLink
																asChild
																className='p-0'
															>
																<Link
																	href={PAGE.SERVICE(category.slug)}
																	className={cn(
																		'block leading-[1.4] select-none bg-transparent rounded-md  border-transparent outline-none rounded-none hover:bg-transparent hover:underline',
																		isExact(PAGE.SERVICE(category.slug)) && 'text-primary underline'
																	)}
																>
																	{category.title}
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

			{/* Mobile burger trigger with animated icon swap */}
			<button
				type='button'
				aria-label={mobileOpen ? 'Закрыть меню' : 'Открыть меню'}
				aria-expanded={mobileOpen}
				className='lg:hidden w-10 h-10 rounded-xl bg-light-gray flex items-center justify-center text-dark-gray relative overflow-hidden'
				onClick={() => setMobileOpen(prev => !prev)}
			>
				<MenuIcon
					className={cn(
						'size-6 transition-all duration-300 ease-out',
						mobileOpen ? 'opacity-0 -rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'
					)}
				/>
				<X
					className={cn(
						'size-6 absolute transition-all duration-300 ease-out',
						mobileOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-75'
					)}
				/>
			</button>

			{/* Mobile overlay menu */}
			{mobileOpen && (
				<div className='lg:hidden fixed top-[var(--header-height)] inset-0 z-50 bg-white h-[calc(100dvh - var(--header-height))] flex flex-col gap-10 justify-between w-full px-4'>
					<nav className='overflow-y-auto pt-6'>
						<ul className='flex flex-col items-center text-center'>
							{MAIN_MENU.map((menuItem, idx) => {
								const isLast = idx === MAIN_MENU.length - 1;
								const isServices = menuItem.href === PAGE.SERVICES;
								if (isServices) {
									return (
										<li
											key={menuItem.label}
											className={cn(
												'w-full border-t border-light-gray',
												isLast && 'border-b border-light-gray'
											)}
										>
											<button
												type='button'
												className='w-full py-4 font-semibold flex items-center justify-center gap-2'
												onClick={() => setServicesOpen(prev => !prev)}
												aria-expanded={servicesOpen}
												aria-controls='mobile-services-collapse'
											>
												{menuItem.label}{' '}
												{servicesOpen ? (
													<ChevronUp className='size-4' />
												) : (
													<ChevronDown className='size-4' />
												)}
											</button>
											<div
												id='mobile-services-collapse'
												className={cn(
													'overflow-hidden transition-all duration-300 ease-out',
													servicesOpen
														? 'max-h-[640px] opacity-100 translate-y-0'
														: 'max-h-0 opacity-0 -translate-y-1'
												)}
											>
												<ul className='flex flex-col items-center gap-2 pb-2'>
													<li>
														<Link
															href={menuItem.href}
															className={cn(
																'block py-2 font-semibold hover:text-primary transition-colors',
																isExact(menuItem.href) && 'text-primary'
															)}
															onClick={() => setMobileOpen(false)}
														>
															Все услуги
														</Link>
													</li>
													{!isLoading &&
														categories.map(category => (
															<li key={category.slug}>
																<Link
																	href={PAGE.SERVICE(category.slug)}
																	className={cn(
																		'block py-2 text-dark-gray hover:text-primary transition-colors',
																		isExact(PAGE.SERVICE(category.slug)) && 'text-primary'
																	)}
																	onClick={() => setMobileOpen(false)}
																>
																	{category.title}
																</Link>
															</li>
														))}
												</ul>
											</div>
										</li>
									);
								}
								return (
									<li
										key={menuItem.label}
										className={cn(
											'w-full border-t border-light-gray',
											isLast && 'border-b border-light-gray',
											isExact(menuItem.href) && 'bg-accent'
										)}
									>
										<Link
											href={menuItem.href}
											className={cn(
												'block py-4 font-semibold'
												// isExact(menuItem.href) && 'text-primary'
											)}
											onClick={() => setMobileOpen(false)}
										>
											{menuItem.label}
										</Link>
									</li>
								);
							})}
						</ul>
					</nav>

					<div className='layout-container w-full sm:w-fit'>
						<div className='flex items-center justify-center gap-2 pb-6'>
							<Link
								href={SITE_CONFIG.telegramLink}
								aria-label='Telegram'
								className='w-9 h-9 rounded-xl bg-light-gray text-dark-gray flex items-center justify-center'
								target='_blank'
							>
								<TelegramIcon />
							</Link>
							<Link
								href={SITE_CONFIG.whatsappLink}
								aria-label='WhatsApp'
								className='w-9 h-9 rounded-xl bg-light-gray text-dark-gray flex items-center justify-center'
								target='_blank'
							>
								<WhatsAppIcon />
							</Link>
							<Link
								href={SITE_CONFIG.maxLink}
								aria-label='MAX'
								className='w-9 h-9 rounded-xl bg-light-gray text-dark-gray flex items-center justify-center'
								target='_blank'
							>
								<MaxIcon />
							</Link>
						</div>
						<div className='flex flex-col gap-4 mb-6'>
							<Link
								href={`tel:${SITE_CONFIG.phoneNumber}`}
								className='text-center text-lg font-semibold'
							>
								{SITE_CONFIG.phoneNumber}
							</Link>
							<Link
								href={`mailto:${SITE_CONFIG.email}`}
								className='text-center text-lg  font-semibold text-dark-gray'
							>
								{SITE_CONFIG.email}
							</Link>
						</div>
						<Button
							type='accent'
							className='w-full justify-center mb-6'
							data-open-consult
						>
							Связаться с нами
						</Button>
					</div>
				</div>
			)}
		</>
	);
}
