import { Fragment } from 'react';

import { Title } from '@/ui/title/Title';

import { formatUnit } from '@/constants/units';

import type { IServiceCategory } from '@/types/service.types';

type PriceListsProps = {
	items: IServiceCategory[];
};

export function PriceLists({ items }: PriceListsProps) {
	if (!items?.length) return null;

	const categoriesWithServices = items.filter(
		c => Array.isArray(c.services) && c.services.length > 0
	);

	return (
		<section className='mb-25'>
			{categoriesWithServices.map(item => (
				<div
					key={item.title}
					className='mb-12'
				>
					<Title
						type='h3'
						className='text-[28px] mb-6'
					>
						Цены {item.title.toLocaleLowerCase()}
					</Title>
					{item.services.map(service => (
						<Fragment key={service.title}>
							{/* Desktop table */}
							<div className='hidden md:block'>
								<div className='overflow-hidden rounded-xl border-1 border-white'>
									<table className='w-full border-collapse'>
										<thead>
											<tr className='bg-accent text-primary'>
												<th className='text-left py-4 px-5 border-r-2 border-white'>
													Наименование работ
												</th>
												<th className='text-center py-4 border-r-2 border-white w-2/12'>
													Единица измерения
												</th>
												<th className='text-center py-4 w-3/12'>Цена (без стоимости материалов)</th>
											</tr>
										</thead>
										<tbody>
											<tr
												key={service.title}
												className='bg-light-gray'
											>
												<td className='py-3 px-5 border-t-2 border-r-2 border-white'>
													{item.title}
												</td>
												<td className='text-center py-4 px-4 border-t-2 border-r-2 border-white'>
													{formatUnit(service.units)}
												</td>
												<td className='text-center py-4 px-4 border-t-2 border-white'>
													от {service.price} ₽
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
							{/* Mobile cards */}
							<div className='md:hidden space-y-[2px]'>
								<div
									key={service.title}
									className='rounded-xl bg-light-gray p-4'
								>
									<p className='font-semibold mb-3'>{service.title}</p>
									<div className='space-y-2'>
										<div className='flex items-center justify-between gap-3'>
											<span className='text-dark-gray'>Единица измерения</span>
											<span>{formatUnit(service.units)}</span>
										</div>
										<div className='flex items-center justify-between'>
											<span className='text-dark-gray'>Цена (без стоимости материалов)</span>
											<span>от {service.price} ₽</span>
										</div>
									</div>
								</div>
							</div>
						</Fragment>
					))}
				</div>
			))}
		</section>
	);
}
