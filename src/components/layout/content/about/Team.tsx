'use client';

import { useEffect, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper/types';

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
		<section>
			<div className='layout-container'>
				<div className='flex justify-between items-center'>
					<TeamHeading
						onPrev={() => swiper?.slidePrev()}
						onNext={() => swiper?.slideNext()}
						canPrev={swiper ? canPrev : false}
						canNext={swiper ? canNext : false}
					/>
				</div>
				<div>
					<TeamSlider onSwiperReady={setSwiper} />
				</div>
			</div>
		</section>
	);
}
