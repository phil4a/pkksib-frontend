import Image from 'next/image';

import { Title } from '@/ui/title/Title';

import aboutNumbersBg from '@/assets/about-page/numbers-bg.jpg';

export function CompanyNumbers() {
	return (
		<section className='relative pt-16 md:pt-20 pb-4 md:pb-10'>
			<div className='absolute top-0 right-0 w-full h-full bg-black/50'>
				<Image
					src={aboutNumbersBg}
					alt='Company numbers background'
					className='-z-1 absolute top-0 right-0 w-full h-full object-cover'
				/>
			</div>
			<div className='layout-container relative text-white'>
				<div className='mb-8 md:mb-16'>
					<Title
						type='h2'
						className='max-w-62 md:max-w-94 mb-8 leading-[1.15] text-accent'
					>
						Компания в цифрах за 2025 год
					</Title>

					<div className='max-w-160'>
						<p className='mb-4'>
							Мы уже более 11 лет осуществляет кровельные и фасадные работы в Новосибирске и
							области. Наши мастера- это опытные специалисты с высокой квалификацией.
						</p>
						<p className='mb-4'>
							Они проходят сертификацию для работы с материалами европейского качества, что
							позволяет им качественно и быстро осуществлять установку кровельных и фасадных
							материалов.
						</p>
						<p>
							Наши специалисты подберут материал с учетом вашего бюджета, у нас найдется все — от
							флюгера до самореза!
						</p>
					</div>
				</div>
				<ul className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 gap-5'>
					<li className='p-6 pt-5 bg-white/20 border-1 border-white/20 rounded-xl backdrop-blur-sm'>
						<p className='text-[26px] md:text-4xl font-semibold mb-2 text-accent'>10000 м²</p>
						<p className='text-light-gray'>
							кровельных работ, из них по реконструкции более 5000 м²
						</p>
					</li>
					<li className='p-6 pt-5 bg-white/20 border-1 border-white/20 rounded-xl backdrop-blur-sm'>
						<p className='text-[26px] md:text-4xl font-semibold mb-2 text-accent'>5000 м³</p>
						<p className='text-light-gray'>смонтированных домов из клееного и профильного бруса</p>
					</li>
					<li className='p-6 pt-5 bg-white/20 border-1 border-white/20 rounded-xl backdrop-blur-sm'>
						<p className='text-[26px] md:text-4xl font-semibold mb-2 text-accent'>20000 м²</p>
						<p className='text-light-gray'>выполненных различных фасадных работ</p>
					</li>
					<li className='p-6 pt-5 bg-white/20 border-1 border-white/20 rounded-xl backdrop-blur-sm'>
						<p className='text-[26px] md:text-4xl font-semibold mb-2 text-accent'>100</p>
						<p className='text-light-gray'>выполненных строительных объектов</p>
					</li>
				</ul>
			</div>
		</section>
	);
}
