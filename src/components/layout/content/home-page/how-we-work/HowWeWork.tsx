'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper/types';

import { Button } from '@/ui/button/Button';
import { Title } from '@/ui/title/Title';

import { SITE_CONFIG } from '@/config/site.config';

const stages = [
	{
		title: 'Заявка',
		content: 'Вы оставляете заявку',
		link: `tel:${SITE_CONFIG.phoneNumber}`
	},
	{
		title: 'Замер',
		content: 'Выезд мастера на замер. Составление сметы'
	},
	{
		title: 'Монтаж',
		content: 'Подписание договора. Начало работ'
	},
	{
		title: 'Сдаем объект',
		content: 'Сдача объекта. Подписание акта'
	}
];

export function HowWeWork() {
	const [mounted, setMounted] = useState(false);
	const [swiper, setSwiper] = useState<SwiperType | null>(null);
	const [canPrev, setCanPrev] = useState(false);
	const [canNext, setCanNext] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		if (!swiper) return;

		const syncNav = () => {
			setCanPrev(!swiper.isBeginning);
			setCanNext(!swiper.isEnd);
		};

		syncNav();
		swiper.on('slideChange', syncNav);
		swiper.on('resize', syncNav);
		swiper.on('breakpoint', syncNav);

		return () => {
			swiper.off('slideChange', syncNav);
			swiper.off('resize', syncNav);
			swiper.off('breakpoint', syncNav);
		};
	}, [swiper]);

	return (
		<section className='bg-primary overflow-hidden'>
			<div className='layout-container py-16 lg:py-25 '>
				<div className='mb-6 lg:mb-8 flex flex-wrap gap-6 justify-between items-baseline'>
					<div className='basis-82 lg:basis-auto'>
						<Title
							type='h2'
							className='text-white'
						>
							Как мы работаем
						</Title>
						<p className='text-white'>
							Основные этапы выполнения работ в «Первой Кровельной Компании»
						</p>
					</div>
					<div className='flex gap-2'>
						<Button
							aria-label='Предыдущий слайд'
							onClick={() => swiper?.slidePrev()}
							type='accent'
							disabled={!canPrev}
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
							aria-label='Следующий слайд'
							onClick={() => swiper?.slideNext()}
							type='accent'
							disabled={!canNext}
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

				{mounted ? (
					<Swiper
						className='!overflow-visible lg:!overflow-hidden'
						slidesPerView={1.1}
						spaceBetween={20}
						onSwiper={s => {
							setSwiper(s);
							setCanPrev(!s.isBeginning);
							setCanNext(!s.isEnd);
						}}
						breakpoints={{
							320: {
								slidesPerView: 1.1,
								spaceBetween: 16
							},
							560: {
								slidesPerView: 2.1,
								spaceBetween: 16
							},
							768: {
								slidesPerView: 3.5,
								spaceBetween: 16
							},
							1024: {
								slidesPerView: 4,
								spaceBetween: 20
							}
						}}
					>
						{stages.map((stage, index) => (
							<SwiperSlide
								key={stage.title}
								className='!h-auto'
							>
								<WorkStage
									index={index}
									{...stage}
								/>
							</SwiperSlide>
						))}
					</Swiper>
				) : (
					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5'>
						{stages.map((stage, index) => (
							<WorkStage
								key={stage.title}
								index={index}
								{...stage}
							/>
						))}
					</div>
				)}
			</div>
		</section>
	);
}

interface WorkStageProps {
	index: number;
	title: string;
	content: string;
	link?: string;
}

function WorkStage({ index, title, content, link }: WorkStageProps) {
	return (
		<div
			className={`${index === 0 ? 'bg-accent' : 'bg-light-gray'} rounded-xl p-6 border border-accent min-h-full`}
		>
			<span className='inline-flex bg-primary text-white py-2 px-4 rounded-[30px] mb-8'>
				Этап {index + 1}
			</span>
			<h3
				className={`text-[22px] font-semibold mb-4 ${index === 0 ? 'text-primary' : 'text-primary'}`}
			>
				{title}
			</h3>
			<p className={`${index === 0 ? 'text-primary' : 'text-primary'}`}>{content}</p>
			{link && (
				<Link
					href={link}
					className='font-bold underline'
				>
					{SITE_CONFIG.phoneNumber}
				</Link>
			)}
			{index === 0 && (
				<svg
					className='absolute top-6 right-6'
					width='116'
					height='64'
					viewBox='0 0 116 64'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M64.8096 6.0229C66.0841 4.556 68.3127 4.55601 69.5872 6.0229L115.174 58.4905C117.024 60.6191 115.558 64 112.785 64H21.6113C18.8389 64 17.3731 60.6191 19.2225 58.4905L64.8096 6.0229Z'
						fill='white'
						fillOpacity='0.25'
					/>
					<path
						d='M43.1929 1.04952C44.4751 -0.349841 46.7248 -0.349841 48.0069 1.04952L58.8499 12.8829L24.4179 52.5129H3.23041C0.446568 52.5129 -1.0287 49.3123 0.823381 47.291L43.1929 1.04952Z'
						fill='white'
						fillOpacity='0.15'
					/>
				</svg>
			)}
		</div>
	);
}
