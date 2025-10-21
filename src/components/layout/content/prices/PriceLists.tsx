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
		<section className='mb-16 lg:mb-25'>
			{categoriesWithServices.map(item => (
				<div
					key={item.title}
					className='mb-12'
				>
					<Title
						type='h3'
						className='text-[22px] md:text-[28px] leading-[1.15] mb-6'
					>
						Цены {item.title.toLocaleLowerCase()}
					</Title>
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
									{item.services.map(service => (
										<tr
											key={service.title}
											className='bg-light-gray'
										>
											<td className='py-3 px-5 border-t-2 border-r-2 border-white'>
												{service.title}
											</td>
											<td className='text-center py-4 px-4 border-t-2 border-r-2 border-white'>
												{formatUnit(service.units)}
											</td>
											<td className='text-center py-4 px-4 border-t-2 border-white'>
												от {service.price} ₽
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>

					{/* Mobile cards: карточки по всем услугам категории */}
					<div className='md:hidden space-y-[2px]'>
						{item.services.map((service, idx) => {
							const isSingle = item.services.length === 1;
							const isFirst = idx === 0;
							const isLast = idx === item.services.length - 1;
							const rounded = isSingle
								? 'rounded-xl'
								: isFirst
									? 'rounded-t-xl'
									: isLast
										? 'rounded-b-xl'
										: '';
							return (
								<div
									key={service.title}
									className={`bg-light-gray p-4 ${rounded}`}
								>
									<p className='font-semibold mb-3'>{service.title}</p>
									<div className='space-y-2'>
										<div className='flex items-center justify-between gap-3'>
											<span className='text-dark-gray'>Единица измерения</span>
											<span>{formatUnit(service.units)}</span>
										</div>
										<div className='flex items-center justify-between'>
											<span className='text-dark-gray'>Цена (без стоимости материалов)</span>
											<span className='shrink-0'>от {service.price} ₽</span>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			))}
		</section>
	);
}
