import { Breadcrumbs } from '@/ui/Breadcrumbs';
import { Title } from '@/ui/title/Title';

export function Hero() {
	return (
		<section className='relative overflow-hidden'>
			<div className='layout-container pt-16 pb-8 flex flex-col md:flex-row items-end'>
				<div className='max-w-full md:max-w-[66%] lg:max-w-[50%]'>
					<Breadcrumbs
						className='pl-6 lg:pl-8'
						color='white'
						items={[
							{ label: 'Главная', href: '/' },
							{ label: 'О нас', isCurrent: true }
						]}
					/>
					<Title
						type='h1'
						className='text-[32px] text-white md:text-[44px] font-semibold leading-[1.15] pl-6 lg:pl-8 mt-3 mb-6'
					>
						О Первой кровельной компании
					</Title>
					<div className='bg-black/7 backdrop-blur-xs rounded-3xl p-6 lg:p-8'>
						<p className='text-white mb-4'>
							В «Первой Кровельной Компании» помимо товаров для кровли европейского качества
							предоставляется ряд услуг. У нас имеются мастера, которые выполнят монтажные работы в
							Новосибирске и области.
						</p>
						<p className='text-white'>
							Высокая квалификация и большой опыт работы позволяет выполнять установку кровельных и
							фасадных материалов быстро и качественно. При этом соблюдаются все правила выполнения
							такого рода строительных работ.
						</p>
						<ul className='mt-8 md:mt-10 mb-2 md:mb-12 list-disc font-semibold pl-5 text-white marker:text-accent marker:text-xl'>
							<li>
								Если вы еще думаете, где заказать монтажные работы в Новосибирске, то считайте, что
								уже нашли решение!
							</li>
						</ul>
					</div>
				</div>
			</div>

			<div className='absolute inset-0 flex -z-1'>
				<video
					autoPlay
					muted
					loop
					playsInline
					preload='auto'
					src={'/videos/hero-desktop-2.mp4'}
					className='w-full h-full object-cover'
				></video>
				<div className='absolute inset-0 pointer-events-none bg-gradient-to-b from-black-10 to-black/80 md:to-black/60' />
			</div>
		</section>
	);
}
