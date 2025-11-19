'use client';

import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Title } from '@/ui/title/Title';

import kubov from '@/assets/home-page/partners/100-kubov.webp';
import aquasystem from '@/assets/home-page/partners/aquasystem.webp';
import berezka from '@/assets/home-page/partners/berezka.webp';
import domProsto from '@/assets/home-page/partners/dom-prosto.webp';
import dorken from '@/assets/home-page/partners/dorken.svg';
import factum from '@/assets/home-page/partners/factum.webp';
import fakro from '@/assets/home-page/partners/fakro.webp';
import shinglas from '@/assets/home-page/partners/shinglas.webp';
import sibBiz from '@/assets/home-page/partners/sib-biz.webp';
import tegola from '@/assets/home-page/partners/tegola.webp';
import tehSoyuz from '@/assets/home-page/partners/teh-soyuz.webp';
import teplostroy from '@/assets/home-page/partners/teplostroy.webp';
import tn from '@/assets/home-page/partners/tn.webp';
import tolmachevo from '@/assets/home-page/partners/tolmachevo.webp';
import tyvek from '@/assets/home-page/partners/tyvek.webp';
import velux from '@/assets/home-page/partners/velux.webp';
import zelLug from '@/assets/home-page/partners/zel-lug.webp';

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
				autoplay={{
					delay: 3000,
					disableOnInteraction: true
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
						slidesPerView: 5,
						spaceBetween: 50
					}
				}}
			>
				<SwiperSlide>
					<Image
						src={kubov}
						alt='100 кубов'
					/>
				</SwiperSlide>
				<SwiperSlide>
					<Image
						src={aquasystem}
						alt='Aquasystem'
					/>
				</SwiperSlide>
				<SwiperSlide>
					<Image
						src={berezka}
						alt='Березка'
					/>
				</SwiperSlide>
				{/* <SwiperSlide>
					<Image
						src={dorken}
						alt='Доркен'
					/>
				</SwiperSlide> */}
				<SwiperSlide>
					<Image
						src={factum}
						alt='Фактум'
					/>
				</SwiperSlide>
				{/* <SwiperSlide>
					<Image
						src={fakro}
						alt='Факро'
					/>
				</SwiperSlide> */}
				<SwiperSlide>
					<Image
						src={shinglas}
						alt='Шинглас'
					/>
				</SwiperSlide>
				<SwiperSlide>
					<Image
						src={sibBiz}
						alt='SibBiz'
					/>
				</SwiperSlide>
				{/* <SwiperSlide>
					<Image
						src={tegola}
						alt='Тегола'
					/>
				</SwiperSlide> */}
				<SwiperSlide>
					<Image
						src={tehSoyuz}
						alt='ТехСоюз'
					/>
				</SwiperSlide>
				<SwiperSlide>
					<Image
						src={teplostroy}
						alt='Теплострой'
					/>
				</SwiperSlide>
				<SwiperSlide>
					<Image
						src={tn}
						alt='Технониколь'
					/>
				</SwiperSlide>
				<SwiperSlide>
					<Image
						src={tolmachevo}
						alt='Толмачevo'
					/>
				</SwiperSlide>
				<SwiperSlide>
					<Image
						src={tyvek}
						alt='Tyvek'
					/>
				</SwiperSlide>
				<SwiperSlide>
					<Image
						src={velux}
						alt='Velux'
					/>
				</SwiperSlide>
				<SwiperSlide>
					<Image
						src={zelLug}
						alt='Зеленый луг'
					/>
				</SwiperSlide>
			</Swiper>
		</div>
	);
}
