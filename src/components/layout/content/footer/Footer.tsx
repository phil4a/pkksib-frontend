import Image from 'next/image';
import Link from 'next/link';

import { MAIN_MENU } from '@/config/navigation';
import { PAGE } from '@/config/pages';
import { SITE_CONFIG } from '@/config/site.config';

import { FooterCollapse } from './FooterCollapse';
import { FooterCopyright } from './FooterCopyright';
import { getFooterServicesCached } from '@/services/footer-cache';
import { serviceService } from '@/services/service.service';
import type { IService, IServiceCategory } from '@/types/service.types';

export async function Footer() {
	let categories: IServiceCategory[] = [];
	try {
		const data = await serviceService.getCategories();
		categories = data?.data?.data ?? [];
	} catch {
		categories = [];
	}

	const footerServices: IService[] = await getFooterServicesCached();
	const footerNavigation = [...MAIN_MENU, { label: 'Помощь', href: PAGE.FAQ }];

	return (
		<div className='bg-primary text-white'>
			<div className='layout-container pt-16 pb-10'>
				<div className='flex flex-col lg:flex-row gap-5 mb-10 '>
					<div className='flex-2/12'>
						<p className='font-semibold mb-4'>Навигация</p>
						<nav className='flex flex-col gap-3'>
							{footerNavigation.map(menuItem => (
								<Link
									key={menuItem.label}
									href={menuItem.href}
									className='text-base text-dark-gray hover:text-white transition-colors'
								>
									{menuItem.label}
								</Link>
							))}
						</nav>
					</div>
					{categories.length > 0 && (
						<div className='flex-3/12 '>
							{/* Mobile: collapsible with JS height animation */}
							<FooterCollapse title='Наши услуги'>
								{categories.map(category => (
									<Link
										key={category.id}
										href={`${PAGE.SERVICE(category.slug)}`}
										className='text-dark-gray max-w-[220px] hover:text-white transition-colors'
									>
										{category.title}
									</Link>
								))}
							</FooterCollapse>

							{/* Desktop: static list */}
							<div className='hidden lg:block'>
								<p className='font-semibold mb-4'>Наши услуги</p>
								<div className='flex flex-col gap-2'>
									{categories.map(category => (
										<Link
											key={category.id}
											href={`${PAGE.SERVICE(category.slug)}`}
											className='text-dark-gray max-w-[220px] hover:text-white transition-colors'
										>
											{category.title}
										</Link>
									))}
								</div>
							</div>
						</div>
					)}
					<div className='flex-4/12'>
						{/* Mobile: collapsible with JS height animation */}
						<FooterCollapse title='Монтаж'>
							{footerServices &&
								footerServices.map(service => (
									<Link
										key={service.id}
										href={`${PAGE.SERVICE(service.slug)}`}
										className='text-base text-dark-gray hover:text-white transition-colors'
									>
										{service.title}
									</Link>
								))}
						</FooterCollapse>

						{/* Desktop: static list */}
						<div className='hidden lg:block'>
							<p className='font-semibold mb-4'>Монтаж</p>
							<div className='flex flex-col gap-2'>
								{footerServices &&
									footerServices.map(service => (
										<Link
											key={service.id}
											href={`${PAGE.SERVICE(service.slug)}`}
											className='text-base text-dark-gray hover:text-white transition-colors'
										>
											{service.title}
										</Link>
									))}
							</div>
						</div>
					</div>
					<meta
						itemProp='name'
						content='Первая кровельная компания'
					/>
					<div className='flex-3/12'>
						<Link
							href={`tel:${SITE_CONFIG.phoneNumber}`}
							className='font-semibold text-[22px]'
						>
							{`${SITE_CONFIG.phoneNumber}`}
						</Link>
						<p
							className='text-dark-gray mt-3 mb-6'
							itemProp='address'
							itemType='http://schema.org/PostalAddress'
						>
							<span itemProp='postalCode'>630047</span>,{' '}
							<span itemProp='addressLocality'>г. Новосибирск</span>,{' '}
							<span>ул. Красный проспект 218/1 офис 1</span>
						</p>
						<p className='text-dark-gray'>Пн—Сб: 10:00–18:00</p>
						<p className='text-dark-gray'>Вс: Выходной</p>
					</div>
				</div>
				<div>
					<div className='p-3 border-y border-white/10 flex flex-col sm:flex-row gap-3 sm:gap-10 items-start sm:items-center'>
						<div className='relative h-[65px] w-[65px] shrink-0'>
							<Image
								src='/logo.svg'
								fill
								alt='logo'
							/>
						</div>
						<p className='font-light text-sm text-dark-gray max-w-[700px]'>
							«Первая Кровельная Компания» уже более {new Date().getFullYear() - 2010} лет
							осуществляет кровельные и фасадные работы в Новосибирске, Новосибирской области, а
							также по всей России. Наши мастера — это опытные специалисты с высокой квалификацией.
						</p>
					</div>
					<FooterCopyright />
				</div>
			</div>
		</div>
	);
}
