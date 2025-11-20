'use client';

import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Title } from '@/ui/title/Title';

import kubov from '@/assets/home-page/partners/100-kubov.png';
import aquasystem from '@/assets/home-page/partners/aquasystem.png';
import berezka from '@/assets/home-page/partners/berezka.webp';
import dorken from '@/assets/home-page/partners/doerken.png';
import domProsto from '@/assets/home-page/partners/dom-prosto.webp';
import factum from '@/assets/home-page/partners/factum.svg';
import fakro from '@/assets/home-page/partners/fakro.png';
import shinglas from '@/assets/home-page/partners/shinglas.png';
import sibBiz from '@/assets/home-page/partners/sib-biz.webp';
import tegola from '@/assets/home-page/partners/tegola.svg';
import tehSoyuz from '@/assets/home-page/partners/teh-soyuz.webp';
import teplostroy from '@/assets/home-page/partners/teplostroy.png';
import tn from '@/assets/home-page/partners/tn.svg';
import tolmachevo from '@/assets/home-page/partners/tolmachevo.webp';
import tyvek from '@/assets/home-page/partners/tyvek.png';
import velux from '@/assets/home-page/partners/velux.svg';
import zelLug from '@/assets/home-page/partners/zel-lug.png';

export function Partners() {
	return (
		<div className='layout-container mb-16 sm:mb-20 lg:mb-25'>
			<Title
				type='h2'
				className='mb-6 md:mb-10'
			>
				Партнеры и поставщики
			</Title>
			<Swiper
				modules={[Autoplay]}
				spaceBetween={50}
				slidesPerView={5}
				loop={true}
				autoHeight={false}
				height={120}
				allowTouchMove={false}
				effect='slide'
				speed={4000}
				autoplay={{
					delay: 0
				}}
				wrapperClass='partners-wrapper'
				breakpoints={{
					320: {
						slidesPerView: 2,
						spaceBetween: 16
					},
					560: {
						slidesPerView: 3,
						spaceBetween: 16
					},
					768: {
						slidesPerView: 3.5,
						spaceBetween: 16
					},
					1024: {
						slidesPerView: 5,
						spaceBetween: 50
					}
				}}
			>
				<SwiperSlide className='relative self-center'>
					<div className='h-25'>
						<Image
							draggable={false}
							className='w-full h-full object-contain'
							height={100}
							width={222}
							src={kubov}
							alt='100 кубов'
						/>
					</div>
				</SwiperSlide>
				<SwiperSlide className='relative self-center '>
					<div className='h-25'>
						<Image
							draggable={false}
							className='w-full h-full object-contain'
							height={100}
							width={222}
							src={aquasystem}
							alt='Aquasystem'
						/>
					</div>
				</SwiperSlide>
				<SwiperSlide className='relative self-center'>
					<div className='h-25'>
						<Image
							draggable={false}
							className='w-full h-full object-contain'
							height={100}
							width={222}
							src={berezka}
							alt='Березка'
						/>
					</div>
				</SwiperSlide>
				<SwiperSlide className='relative self-center'>
					<div className='h-25'>
						<Image
							draggable={false}
							className='w-full h-full object-contain'
							height={100}
							width={222}
							src={domProsto}
							alt='Березка'
						/>
					</div>
				</SwiperSlide>
				<SwiperSlide className='relative self-center'>
					<div className='h-25'>
						<Image
							draggable={false}
							className='w-full h-full object-contain'
							height={100}
							width={222}
							src={dorken}
							alt='Дёркен'
						/>
					</div>
				</SwiperSlide>
				<SwiperSlide className='relative self-center'>
					<div className='h-25'>
						<Image
							draggable={false}
							className='w-full h-full object-contain'
							height={100}
							width={222}
							src={factum}
							alt='Фактум'
						/>
					</div>
				</SwiperSlide>
				<SwiperSlide className='relative self-center'>
					<div className='h-25'>
						<Image
							draggable={false}
							className='w-full h-full object-contain'
							height={100}
							width={222}
							src={fakro}
							alt='Факро'
						/>
					</div>
				</SwiperSlide>
				<SwiperSlide className='relative self-center'>
					<div className='h-25'>
						<Image
							draggable={false}
							className='w-full h-full object-contain'
							height={100}
							width={222}
							src={shinglas}
							alt='Шинглас'
						/>
					</div>
				</SwiperSlide>
				<SwiperSlide className='relative self-center'>
					<div className='h-25'>
						<Image
							draggable={false}
							className='w-full h-full object-contain'
							height={100}
							width={222}
							src={sibBiz}
							alt='SibBiz'
						/>
					</div>
				</SwiperSlide>
				<SwiperSlide className='relative self-center'>
					<div className='h-25'>
						<Image
							draggable={false}
							className='w-full h-full object-contain'
							height={100}
							width={222}
							src={tegola}
							alt='Тегола'
						/>
					</div>
				</SwiperSlide>
				<SwiperSlide className='relative self-center'>
					<div className='h-25'>
						<Image
							draggable={false}
							className='w-full h-full object-contain'
							height={100}
							width={222}
							src={tehSoyuz}
							alt='ТехСоюз'
						/>
					</div>
				</SwiperSlide>
				<SwiperSlide className='relative self-center'>
					<div className='h-25'>
						<Image
							draggable={false}
							className='w-full h-full object-contain'
							height={100}
							width={222}
							src={teplostroy}
							alt='Теплострой'
						/>
					</div>
				</SwiperSlide>
				<SwiperSlide className='relative self-center'>
					<div className='h-25'>
						<Image
							draggable={false}
							className='w-full h-full object-contain'
							height={100}
							width={222}
							src={tn}
							alt='Технониколь'
						/>
					</div>
				</SwiperSlide>
				<SwiperSlide className='relative self-center'>
					<div className='h-25'>
						<Image
							draggable={false}
							className='w-full h-full object-contain'
							height={100}
							width={222}
							src={tolmachevo}
							alt='Толмачevo'
						/>
					</div>
				</SwiperSlide>
				<SwiperSlide className='relative self-center'>
					<div className='h-25'>
						<Image
							draggable={false}
							className='w-full h-full object-contain'
							height={100}
							width={222}
							src={tyvek}
							alt='Tyvek'
						/>
					</div>
				</SwiperSlide>
				<SwiperSlide className='relative self-center'>
					<div className='h-25'>
						<Image
							draggable={false}
							className='w-full h-full object-contain'
							height={100}
							width={222}
							src={velux}
							alt='Velux'
						/>
					</div>
				</SwiperSlide>
				<SwiperSlide className='relative self-center'>
					<div className='h-25'>
						<Image
							draggable={false}
							height={100}
							width={222}
							src={zelLug}
							className='w-full h-full object-contain'
							alt='Зеленый луг'
						/>
					</div>
				</SwiperSlide>
			</Swiper>
		</div>
	);
}
