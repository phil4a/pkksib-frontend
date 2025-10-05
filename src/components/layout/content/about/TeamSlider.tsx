'use client';

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
	return (
		<Swiper
			spaceBetween={20}
			slidesPerView={4}
			className='grid grid-cols-4 gap-5'
			onSwiper={onSwiperReady}
		>
			<SwiperSlide>
				<TeamSlide
					name='Фамилия Имя'
					position='Должность в Первой Кровельной Компании'
					image={team1}
				/>
			</SwiperSlide>
			<SwiperSlide>
				<TeamSlide
					name='Фамилия Имя'
					position='Должность в Первой Кровельной Компании1232131 sdfdsafasf sadfdas asdfa sfasdf '
					image={team2}
				/>
			</SwiperSlide>
			<SwiperSlide>
				<TeamSlide
					name='Фамилия Имя'
					position='Должность в Первой Кровельной Компании'
					image={team3}
				/>
			</SwiperSlide>
			<SwiperSlide>
				<TeamSlide
					name='Фамилия Имя'
					position='Должность в Первой Кровельной Компании'
					image={team4}
				/>
			</SwiperSlide>
			<SwiperSlide>
				<TeamSlide
					name='Фамилия Имя'
					position='Должность в Первой Кровельной Компании'
					image={team1}
				/>
			</SwiperSlide>
		</Swiper>
	);
}
