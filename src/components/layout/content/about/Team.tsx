'use client';

import { useEffect, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper/types';

import { OurValues } from './OurValues';
import { TeamHeading } from './TeamHeading';
import { TeamSlider } from './TeamSlider';

export function Team() {
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

	return (
		<section className='bg-light-gray pt-16  md:pt-20 lg:pt-25 pb-16 md:pb-20 overflow-hidden'>
			<div className='layout-container'>
				<TeamHeading
					onPrev={() => swiper?.slidePrev()}
					onNext={() => swiper?.slideNext()}
					canPrev={swiper ? canPrev : false}
					canNext={swiper ? canNext : false}
				/>
				<TeamSlider onSwiperReady={setSwiper} />
				<OurValues />
			</div>
		</section>
	);
}
