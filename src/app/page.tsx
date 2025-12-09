import Image from 'next/image';

import { HeroBullet } from '@/components/layout/content/home-page/hero/HeroBullet';
import { LazyHowWeWork } from '@/components/layout/content/home-page/how-we-work/LazyHowWeWork';
import { LazyObjectsMap } from '@/components/layout/content/home-page/objects-map/LazyObjectsMap';
import { LazyOurServices } from '@/components/layout/content/home-page/our-services/LazyOurServices';
import { LazyPartners } from '@/components/layout/content/home-page/partners/LazyPartners';
import { WhyChooseUs } from '@/components/layout/content/home-page/why-choose-us/WhyChooseUs';

import { Button } from '@/ui/button/Button';
import { SkeletonLoader } from '@/ui/skeleton/SkeletonLoader';
import { Title } from '@/ui/title/Title';
import { ViewportLazy } from '@/ui/viewport/ViewportLazy';

import { COMPANY_FIGURES } from '@/config/site.config';

import mainBgImage from '@/assets/home-page/hero/main-bg.jpg';
import roofImage from '@/assets/home-page/hero/roof.png';

export default function HomePage() {
	return (
		<>
			<section className='mb-16 lg:mb-25'>
				<div className='layout-container'>
					<div className='flex flex-wrap md:flex-nowrap gap-4 lg:flex-5 md:h-[500px] mb-4 lg:mb-5'>
						<div className='md:flex-1/2 flex flex-col gap-7 justify-between items-start bg-accent rounded-xl p-6 sm:pt-16 sm:pb-12 sm:px-12 relative'>
							<div>
								<Title
									type='h1'
									className='font-semiboldbold mb-4 lg:mb-6 leading-[1.15] max-w-[366px] z-2'
								>
									Кровельные работы и материалы
								</Title>
								<p className='relative block text-lg z-2'>
									Оптовые цены на кровлю и фасад, прозрачный расчёт — экономия до 20%
								</p>
							</div>
							<Button
								type='black'
								className='z-2'
								data-open-consult
							>
								Получить консультацию
							</Button>
							<svg
								width='340'
								height='212'
								viewBox='0 0 340 212'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
								className='absolute bottom-0 right-0 z-1'
							>
								<path
									d='M296.119 27.4795C301.942 20.7868 312.124 20.7868 317.948 27.4795L526.235 266.863C534.685 276.575 527.987 292 515.32 292H98.7461C86.0791 292 79.3814 276.575 87.8316 266.863L296.119 27.4795Z'
									fill='white'
									fillOpacity='0.15'
								/>
								<path
									d='M197.348 4.78846C203.206 -1.59615 213.485 -1.59615 219.343 4.78846L268.885 58.7784L111.565 239.59H14.7597C2.04037 239.59 -4.70013 224.987 3.76203 215.765L197.348 4.78846Z'
									fill='white'
									fillOpacity='0.1'
								/>
							</svg>
						</div>
						<div className='relative w-full md:w-auto md:flex-1/2 h-82 md:h-full'>
							<Image
								src={mainBgImage}
								alt={'Первая кровельная компания'}
								className='object-cover rounded-xl'
								priority={true}
								fetchPriority='high'
								draggable={false}
								fill={true}
								sizes='(max-width: 768px) 100vw, 50vw'
							></Image>
						</div>
					</div>
					<div className='flex flex-col-reverse lg:flex-row gap-4 lg:items-end bg-light-gray rounded-xl mb-4 overflow-hidden'>
						<div className='lg:flex-5/12'>
							<Image
								src={roofImage}
								alt='кровля дома'
								// priority={true}
								loading='lazy'
								className='object-cover'
								draggable={false}
							></Image>
						</div>
						<div className='lg:flex-7/12 flex flex-col pt-6 pb-0 pl-6 lg:pr-0 lg:py-15 items-start justify-center'>
							<div className='clamp-[pr,6,20]'>
								<p className='mb-4 text-lg lg:text-[22px] font-semibold leading-normal lg:leading-[1.25]'>
									В «Первой Кровельной Компании» помимо товаров для кровли европейского качества
									предоставляется ряд услуг. У нас имеются мастера, которые выполнят монтажные
									работы в Новосибирске и области.
								</p>
								<p className='mb-6 text-dark-gray'>
									Высокая квалификация и большой опыт работы позволяет выполнять установку
									кровельных и фасадных материалов быстро и качественно. При этом соблюдаются все
									правила выполнения такого рода строительных работ.
								</p>
							</div>
							<Button
								type={'accent'}
								href='/about'
							>
								Узнать больше
							</Button>
						</div>
					</div>
					<div className='grid gap-4 lg:gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
						{COMPANY_FIGURES.map((figure, i) => (
							<HeroBullet
								key={figure.title}
								title={figure.title}
								number={figure.number}
								units={figure.units}
								icon={figure.icon}
								index={i}
							/>
						))}
					</div>
				</div>
			</section>
			<LazyHowWeWork />
			<LazyOurServices />
			<WhyChooseUs />
			<ViewportLazy
				rootMargin='500px'
				placeholder={
					<div className='layout-container my-16'>
						<SkeletonLoader className='h-90 sm:h-140 md:h-150 w-full rounded-xl' />
					</div>
				}
			>
				<LazyObjectsMap />
			</ViewportLazy>
			<LazyPartners />
		</>
	);
}
