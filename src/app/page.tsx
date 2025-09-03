import Image from 'next/image';

import { HeroBullet } from '@/components/layout/content/home-page/hero/HeroBullet';
import { HowWeWork } from '@/components/layout/content/home-page/how-we-work/HowWeWork';
import { OurServices } from '@/components/layout/content/home-page/our-services/OurServices';
import { WhyChooseUs } from '@/components/layout/content/home-page/why-choose-us/WhyChooseUs';

import { Button } from '@/ui/button/Button';

import { COMPANY_FIGURES } from '@/config/site.config';

import mainBgImage from '@/assets/home-page/hero/main-bg.jpg';
import roofImage from '@/assets/home-page/hero/roof.png';

export default function HomePage() {
	return (
		<>
			<section className='mb-25'>
				<div className='layout-container'>
					<div className='flex gap-5 h-[500px] mb-4'>
						<div className='flex-1/2 flex flex-col justify-between items-start bg-accent rounded-xl pt-16 pb-12 px-12 relative'>
							<div>
								<h1 className='text-4xl font-bold mb-6 leading-[1.15] max-w-[366px] z-1'>
									Кровельные работы и материалы
								</h1>
								<p className='text-lg z-1'>
									Оптовые цены на кровлю и фасад, прозрачный расчёт — экономия до 20%
								</p>
							</div>
							<Button
								type='black'
								className='z-1'
							>
								Получить консультацию
							</Button>
							<svg
								width='340'
								height='212'
								viewBox='0 0 340 212'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
								className='absolute bottom-0 right-0'
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
						<div className='flex-1/2 relative'>
							<Image
								src={mainBgImage}
								alt={'Первая кровельная компания'}
								className='object-cover rounded-xl'
								priority={true}
								draggable={false}
								fill={true}
							></Image>
						</div>
					</div>
					<div className='flex gap-5 items-end bg-light-gray rounded-xl mb-4 overflow-hidden'>
						<div className='flex-5/12 '>
							<Image
								src={roofImage}
								alt='кровля дома'
								priority={true}
								className='object-cover '
								draggable={false}
							></Image>
						</div>
						<div className='flex-7/12 flex flex-col py-15 items-start justify-center'>
							<div className='clamp-[pr,5,20]'>
								<p className='mb-4 text-[22px] font-semibold leading-[1.25]'>
									В «Первой Кровельной Компании» помимо товаров для кровли европейского качества
									предоставляется ряд услуг. У нас имеются мастера, которые выполнят монтажные
									работы в Новосибирске и области.
								</p>
								<p className='mb-6'>
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
					<div className='grid gap-5 grid-cols-4'>
						{COMPANY_FIGURES.map(figure => (
							<HeroBullet
								key={figure.title}
								title={figure.title}
								number={figure.number}
								units={figure.units}
								icon={figure.icon}
							/>
						))}
					</div>
				</div>
			</section>
			<HowWeWork />
			<OurServices />
			<WhyChooseUs />
		</>
	);
}
