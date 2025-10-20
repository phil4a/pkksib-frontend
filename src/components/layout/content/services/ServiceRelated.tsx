'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper/types';

import { Object as ObjectCard } from '@/components/layout/content/object/Object';

import { Button } from '@/ui/button/Button';
import { SkeletonLoader } from '@/ui/skeleton/SkeletonLoader';
import { Title } from '@/ui/title/Title';

import { objectService } from '@/services/object.service';
import type { IServiceCategory } from '@/types/service.types';

export function ServiceRelated({ category }: { category?: IServiceCategory }) {
	const [swiper, setSwiper] = useState<SwiperType | null>(null);
	const [canPrev, setCanPrev] = useState(false);
	const [canNext, setCanNext] = useState(false);

	useEffect(() => {
		if (!swiper) return;

		const syncNav = () => {
			setCanPrev(!swiper.isBeginning);
			setCanNext(!swiper.isEnd);
		};

		syncNav();
		swiper.on('slideChange', syncNav);

		return () => {
			swiper.off('slideChange', syncNav);
		};
	}, [swiper]);

	const { data, isLoading, error } = useQuery({
		queryKey: ['objects_related', category?.slug ?? 'all'],
		queryFn: () =>
			category?.slug
				? objectService.getByServiceCategorySlug(category.slug, 10)
				: objectService.getAll({ pageSize: 10 })
	});

	const objects = data?.data?.data;

	if (error) {
		return <div>Ошибка получения объектов</div>;
	}

	return (
		<section className='py-16 md:py-20 lg:py-25 overflow-hidden'>
			<div className='layout-container'>
				<div className='mb-6 lg:mb-8 flex flex-wrap gap-6 justify-between items-baseline'>
					<Title
						type='h2'
						className='mb-0 basis-82 lg:basis-auto'
					>
						Наши проекты
					</Title>
					<div className='flex gap-2'>
						<Button
							onClick={() => swiper?.slidePrev()}
							disabled={!canPrev}
							type='accent'
							className={`flex items-center justify-center w-10 h-10 p-0`}
						>
							<svg
								width='10'
								height='16'
								viewBox='0 0 10 16'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M9 15L2 8L9 1'
									stroke='#21282B'
									strokeWidth='2'
								/>
							</svg>
						</Button>
						<Button
							onClick={() => swiper?.slideNext()}
							disabled={!canNext}
							type='accent'
							className='flex items-center justify-center w-10 h-10 p-0'
						>
							<svg
								width='10'
								height='16'
								viewBox='0 0 10 16'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M1 15L8 8L1 1'
									stroke='#21282B'
									strokeWidth='2'
								/>
							</svg>
						</Button>
					</div>
				</div>
				{isLoading ? (
					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5'>
						<SkeletonLoader
							count={4}
							className='rounded-xl h-[360px]'
						/>
					</div>
				) : objects?.length ? (
					<Swiper
						className='!overflow-visible'
						slidesPerView={1.1}
						spaceBetween={20}
						breakpoints={{
							320: {
								slidesPerView: 1.1,
								spaceBetween: 16
							},
							480: {
								slidesPerView: 2.1,
								spaceBetween: 16
							},
							768: {
								slidesPerView: 3.2,
								spaceBetween: 16
							},
							1024: {
								slidesPerView: 4,
								spaceBetween: 20
							}
						}}
						onSwiper={s => {
							setSwiper(s);
							setCanPrev(!s.isBeginning);
							setCanNext(!s.isEnd);
						}}
					>
						{objects.map(item => (
							<SwiperSlide key={item.id}>
								<ObjectCard
									key={item.id}
									item={item}
								/>
							</SwiperSlide>
						))}
					</Swiper>
				) : null}
			</div>
		</section>
	);
}
