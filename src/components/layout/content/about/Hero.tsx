import Image from 'next/image';

import { Breadcrumbs } from '@/ui/Breadcrumbs';
import { Title } from '@/ui/title/Title';

import aboutHero from '@/assets/about-page/hero-bg.png';

export function Hero() {
	return (
		<section className='bg-light-gray'>
			<div className='layout-container pt-16 flex flex-col md:flex-row items-end'>
				<div className='max-w-full md:max-w-[66%] lg:max-w-[50%]'>
					<Breadcrumbs
						items={[
							{ label: 'Главная', href: '/' },
							{ label: 'О нас', isCurrent: true }
						]}
					/>
					<Title
						type='h1'
						className='text-[32px] md:text-[44px] font-semibold leading-[1.15] mt-3 mb-6'
					>
						О Первой кровельной компании
					</Title>
					<p className='text-dark-gray mb-4'>
						В «Первой Кровельной Компании» помимо товаров для кровли европейского качества
						предоставляется ряд услуг. У нас имеются мастера, которые выполнят монтажные работы в
						Новосибирске и области.
					</p>
					<p className='text-dark-gray'>
						Высокая квалификация и большой опыт работы позволяет выполнять установку кровельных и
						фасадных материалов быстро и качественно. При этом соблюдаются все правила выполнения
						такого рода строительных работ.
					</p>
					<ul className='mt-8 md:mt-10 mb-2 md:mb-12 list-disc font-semibold pl-5 marker:text-accent marker:text-xl'>
						<li>
							Если вы еще думаете, где заказать монтажные работы в Новосибирске, то считайте, что
							уже нашли решение!
						</li>
					</ul>
				</div>
				<div className='relative md:basis-[50%] aspect-[16/9] w-full h-auto -mr-[16px]'>
					<Image
						priority={true}
						src={aboutHero}
						alt='О нас'
						fill
					/>
				</div>
			</div>
		</section>
	);
}
