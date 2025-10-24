'use client';

import type { StaticImageData } from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper/types';

import { TeamSlide } from './TeamSlide';
import team1 from '@/assets/about-page/team/1.png';
import team2 from '@/assets/about-page/team/2.png';
import team3 from '@/assets/about-page/team/3.png';
import team4 from '@/assets/about-page/team/4.png';

interface Props {
	onSwiperReady?: (swiper: SwiperType) => void;
}

export function TeamSlider({ onSwiperReady }: Props) {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	type Member = { name: string; position: string; image: StaticImageData };
	const members: Member[] = useMemo(
		() => [
			{
				name: 'Фамилия Имя',
				position: 'Должность в Первой Кровельной Компании sadasdfadsf asdfasdf a',
				image: team1
			},
			{ name: 'Фамилия Имя', position: 'Должность в Первой Кровельной Компани', image: team2 },
			{
				name: 'Константинов Константин Константинович',
				position: 'Должность в Первой Кровельной Компании',
				image: team3
			},
			{ name: 'Фамилия Имя', position: 'Должность в Первой Кровельной Компании', image: team4 },
			{ name: 'Фамилия Имя', position: 'Должность в Первой Кровельной Компании', image: team1 }
		],
		[]
	);

	if (!mounted) {
		return (
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5'>
				{members.slice(0, 4).map((m, idx) => (
					<TeamSlide
						key={`member-fallback-${idx}`}
						name={m.name}
						position={m.position}
						image={m.image}
						renderImage={false}
					/>
				))}
			</div>
		);
	}

	return (
		<Swiper
			className='!overflow-visible lg:!overflow-hidden'
			slidesPerView={1.1}
			spaceBetween={20}
			onSwiper={onSwiperReady}
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
					slidesPerView: 3.2,
					spaceBetween: 16
				},
				1024: {
					slidesPerView: 4,
					spaceBetween: 20
				}
			}}
		>
			{members.map((m, idx) => (
				<SwiperSlide key={`member-${idx}`}>
					<TeamSlide
						name={m.name}
						position={m.position}
						image={m.image}
					/>
				</SwiperSlide>
			))}
		</Swiper>
	);
}
