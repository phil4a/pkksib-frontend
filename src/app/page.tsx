import Image from 'next/image';

import HeroVideo from '@/components/layout/content/home-page/hero-video/HeroVideo';
import { HeroBullet } from '@/components/layout/content/home-page/hero/HeroBullet';
import { LazyHowWeWork } from '@/components/layout/content/home-page/how-we-work/LazyHowWeWork';
import { LazyObjectsMap } from '@/components/layout/content/home-page/objects-map/LazyObjectsMap';
import { LazyOurServices } from '@/components/layout/content/home-page/our-services/LazyOurServices';
import { LazyPartners } from '@/components/layout/content/home-page/partners/LazyPartners';
import { WhyChooseUs } from '@/components/layout/content/home-page/why-choose-us/WhyChooseUs';
import { DirectorForm } from '@/components/layout/form/director/DirectorForm';
import SmartWidget from '@/components/ui/SmartWidget';

import { Button } from '@/ui/button/Button';
import { SkeletonLoader } from '@/ui/skeleton/SkeletonLoader';
import { ViewportLazy } from '@/ui/viewport/ViewportLazy';

import { COMPANY_FIGURES } from '@/config/site.config';

import mainImage from '@/assets/home-page/hero/main-image.png';

export default function HomePage() {
	return (
		<>
			<HeroVideo />
			<div className='h-[calc(100vh-var(--header-height))] lg:h-[calc(100vh-var(--header-height))] -mt-4 -lg:mt-5 pointer-events-none' />
			<section className='my-16 lg:mb-25 relative'>
				<div className='layout-container'>
					<div className='flex flex-col-reverse lg:flex-row gap-4 lg:items-center bg-light-gray rounded-xl mb-4 overflow-hidden'>
						<div className='lg:flex-4/12 pt-6 pb-6 pl-6 lg:pr-0 lg:py-15'>
							<Image
								src={mainImage}
								alt='кровля дома'
								// priority={true}
								loading='lazy'
								className='object-cover'
								draggable={false}
							></Image>
						</div>
						<div className='lg:flex-5/12 flex flex-col pt-6 pb-0 pl-6 lg:pr-0 lg:py-15 items-start justify-center'>
							<div className='clamp-[pr,6,20]'>
								<p className='mb-4 text-lg lg:text-[22px] font-semibold leading-normal lg:leading-[1.25]'>
									Мы знаем о кровле всё и даже больше
								</p>
								<p className='mb-6 text-dark-gray'>
									«Первая Кровельная Компания» — полный цикл кровельных работ под ключ в
									Новосибирске и области.
								</p>
								<p className='mb-2 text-dark-gray'>
									Наши опытные мастера профессионально выполнят монтаж любой сложности: от
									классической металлочерепицы до современных фасадных систем. Мы работаем быстро,
									качественно и строго по технологии — каждый проект выполняется с соблюдением всех
									строительных норм.
								</p>
								<p className='mb-6 text-dark-gray'>
									Вы получаете европейские материалы и профессиональный монтаж напрямую, без
									переплат. Доверьте свою кровлю специалистам, которые отвечают за результат от
									первого замера до финальной проверки.
								</p>
								<p className='mb-6 italic'>«Первая Кровельная — качество без посредников»</p>
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

			{/* SmartWidgets: отзывы/виджет */}
			{/* <section className='my-16'>
				<div className='layout-container'>
					<div className='mx-auto'>
						<SmartWidget appId='471f80d9de5ce5852981df97fe33cf0a' />
					</div>
				</div>
			</section> */}
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
