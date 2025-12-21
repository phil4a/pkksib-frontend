'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { Button } from '@/ui/button/Button';

export default function HeroVideo() {
	const videoRef = useRef<HTMLVideoElement>(null);
	const [isVideoReady, setIsVideoReady] = useState(false);

	const handleCanPlay = () => {
		setIsVideoReady(true);
		if (videoRef.current) {
			videoRef.current.play().catch((err: unknown) => console.log('Autoplay prevented:', err));
		}
	};

	useEffect(() => {
		if (videoRef.current && videoRef.current.readyState >= 3) {
			handleCanPlay();
		}
	}, []);

	return (
		<section className='absolute top-0 left-0 w-full h-screen overflow-hidden'>
			<div
				className={`absolute inset-0 transition-opacity duration-1000 ${
					isVideoReady ? 'opacity-0 pointer-events-none' : 'opacity-100'
				}`}
			>
				<Image
					src='/hero-poster.jpg'
					alt='Кровельные работы Первая Кровельная'
					fill
					priority
					quality={75}
					className='object-cover'
					sizes='100vw'
				/>
			</div>

			{/* Видео */}
			<video
				ref={videoRef}
				onCanPlay={handleCanPlay}
				className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
					isVideoReady ? 'opacity-100' : 'opacity-0'
				}`}
				autoPlay
				muted
				loop
				playsInline
				preload='auto'
			>
				<source
					src='/videos/hero-desktop-2.mp4'
					type='video/mp4'
				/>
			</video>

			<div className='absolute inset-0 bg-black/10 z-1' />

			<div className='layout-container h-full relative'>
				<div className='h-full flex flex-col justify-center items-start relative z-2'>
					<div className='bg-black/7 backdrop-blur-xs rounded-3xl p-6 lg:p-8'>
						<h1 className='text-accent font-extrabold uppercase mb-4 lg:mb-6 leading-[1.4] max-w-[550px] text-3xl sm:text-4xl md:text-5xl'>
							Кровельные работы и материалы
						</h1>
						<p className='block text-lg text-white mb-8 max-w-[550px]'>
							Оптовые цены на кровлю и фасад, прозрачный расчёт — экономия до 20%
						</p>
						<Button
							type='accent'
							data-open-consult
						>
							Получить консультацию
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
