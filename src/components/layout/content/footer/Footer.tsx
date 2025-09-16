import Link from 'next/link';

import { MAIN_MENU } from '@/config/navigation';

import { serviceService } from '@/services/service.service';

const data = await serviceService.getCategories();
const categories = data?.data?.data;

export function Footer() {
	return (
		<div className='bg-light-gray'>
			<div className='layout-container pt-16 pb-10'>
				<div className='flex gap-5'>
					<div className='flex-2/12'>
						<p className='font-semibold mb-4'>Навигация</p>
						<nav className='flex flex-col gap-2'>
							{MAIN_MENU.map(menuItem => (
								<Link
									key={menuItem.label}
									href={menuItem.href}
									className='text-base text-dark-gray'
								>
									{menuItem.label}
								</Link>
							))}
						</nav>
					</div>
					<div className='flex-3/12 '>
						<p className='font-semibold mb-4'>Наши услуги</p>
						<div className='flex flex-col gap-2'>
							{categories &&
								categories.map(category => (
									<Link
										key={category.id}
										href={`/services/${category.slug}`}
										className='text-base text-dark-gray max-w-[220px]'
									>
										{category.title}
									</Link>
								))}
						</div>
					</div>
					<div className='flex-4/12 mb-4'>
						<p className='font-semibold'>Монтаж</p>
					</div>
					<div className='flex-3/12 mb-4'>
						<p className='font-semibold'>Контакты</p>
					</div>
				</div>
				<div>копирайт</div>
			</div>
		</div>
	);
}
