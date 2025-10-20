'use client';

import { useState } from 'react';

import { MobileFiltersDrawer } from './MobileFiltersDrawer';
import { ObjectsFilters } from './ObjectsFilters';
import { ObjectsList } from './ObjectsList';
import { ObjectsPagination } from './ObjectsPagination';

export function ObjectsWrapper() {
	const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

	return (
		<section className='mb-25'>
			{/* Мобильная кнопка фильтров: закреплена под шапкой */}
			<div className='md:hidden sticky top-[var(--header-height)] z-40 bg-white  py-2'>
				<button
					type='button'
					className='flex gap-2 font-semibold'
					onClick={() => setMobileFiltersOpen(true)}
					aria-haspopup='dialog'
					aria-expanded={mobileFiltersOpen}
					aria-controls='mobile-filters-drawer'
				>
					<svg
						width='16'
						height='24'
						viewBox='0 0 16 24'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<g clipPath='url(#clip0_26_7358)'>
							<path
								d='M5 13L5 22'
								stroke='#21282B'
								strokeWidth='2'
								strokeLinejoin='round'
							/>
							<path
								d='M5 2L5 5'
								stroke='#21282B'
								strokeWidth='2'
								strokeLinejoin='round'
							/>
							<path
								d='M2.5 7.5C2.5 8.88071 3.61929 10 5 10C6.38071 10 7.5 8.88071 7.5 7.5C7.5 6.11929 6.38071 5 5 5C3.61929 5 2.5 6.11929 2.5 7.5Z'
								stroke='#21282B'
								strokeWidth='2'
								strokeLinejoin='round'
							/>
							<path
								d='M11 19L11 22'
								stroke='#21282B'
								strokeWidth='2'
								strokeLinejoin='round'
							/>
							<path
								d='M11 2L11 11'
								stroke='#21282B'
								strokeWidth='2'
								strokeLinejoin='round'
							/>
							<path
								d='M8.5 16.5C8.5 17.8807 9.61929 19 11 19C12.3807 19 13.5 17.8807 13.5 16.5C13.5 15.1193 12.3807 14 11 14C9.61929 14 8.5 15.1193 8.5 16.5Z'
								stroke='#21282B'
								strokeWidth='2'
								strokeLinejoin='round'
							/>
						</g>
						<defs>
							<clipPath id='clip0_26_7358'>
								<rect
									width='24'
									height='16'
									fill='white'
									transform='translate(16) rotate(90)'
								/>
							</clipPath>
						</defs>
					</svg>
					Фильтры
				</button>
			</div>

			{/* Десктопные фильтры */}
			<div className='relative flex gap-5 items-start'>
				<div className='hidden md:block md:sticky md:top-[calc(var(--header-height)+20px)] md:self-start flex-1/4'>
					<div className='md:max-h-[calc(100dvh-var(--header-height))] md:overflow-y-auto'>
						<ObjectsFilters />
					</div>
				</div>
				<div className='flex-3/4'>
					<ObjectsList />
				</div>
			</div>
			<div>
				<ObjectsPagination />
			</div>

			{/* Мобильная панель фильтров */}
			<MobileFiltersDrawer
				open={mobileFiltersOpen}
				onClose={() => setMobileFiltersOpen(false)}
			/>
		</section>
	);
}
