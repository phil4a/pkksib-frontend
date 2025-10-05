import Image from 'next/image';

import { Title } from '@/ui/title/Title';

import warrantyBg from '@/assets/about-page/c03.jpg';

export function WhyChooseUs() {
	return (
		<section>
			<div className='layout-container py-25'>
				<Title type='h2'>Почему выбирают нас</Title>
				<ul className='mt-8 grid grid-cols-4 gap-5 h-100'>
					<li className='flex flex-col justify-between p-6 pt-5 bg-light-gray rounded-xl'>
						<div className='bg-white/40 pt-[16.7px] pl-[8.7px] border-white border-1 rounded-[6px] w-8 h-8'>
							<svg
								width='12'
								height='7'
								viewBox='0 0 12 7'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M11.5859 5.29289C12.2158 5.92286 11.7697 7 10.8788 7H1.12124C0.23034 7 -0.215827 5.92286 0.414138 5.29289L5.29289 0.414138C5.68342 0.0236141 6.31658 0.0236137 6.70711 0.414138L11.5859 5.29289Z'
									fill='#FCD200'
								/>
							</svg>
						</div>
						<div>
							<Title
								type='h3'
								className='text-[22px]'
							>
								Опыт
							</Title>
							<p className='text-dark-gray'>
								Наши бригады мастеров состоят из высококлассных специалистов. Они постоянно повышают
								свою квалификацию, что в полной мере отражается на всех выполненных проектах.
							</p>
						</div>
					</li>
					<li className='flex flex-col justify-between p-6 pt-5 bg-accent rounded-xl'>
						<div className='bg-primary flex items-center justify-center rounded-[6px] w-8 h-8'>
							<svg
								width='12'
								height='16'
								viewBox='0 0 12 16'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M11.5859 14.2929C12.2158 14.9229 11.7697 16 10.8788 16H1.12124C0.23034 16 -0.215827 14.9229 0.414138 14.2929L5.29289 9.41414C5.68342 9.02361 6.31658 9.02361 6.70711 9.41414L11.5859 14.2929Z'
									fill='#FCD200'
								/>
								<path
									d='M10.8788 0C11.7697 0 12.2158 1.07714 11.5859 1.70711L6.70711 6.58586C6.31658 6.97639 5.68342 6.97639 5.29289 6.58586L0.414139 1.70711C-0.215826 1.07714 0.23034 0 1.12124 0H10.8788Z'
									fill='#FCD200'
								/>
							</svg>
						</div>
						<div>
							<Title
								type='h3'
								className='text-[22px]'
							>
								Качество
							</Title>
							<p className='text-primary'>
								Обратившись к нам, вы сможете не только приобрести качественные материалы для кровли
								или фасада, но и заказать качественный монтаж кровли, черепицы, сайдинга и др.
							</p>
						</div>
					</li>
					<li className='relative overflow-hidden flex flex-col justify-between p-6 pt-5 bg-tra rounded-xl'>
						<Image
							src={warrantyBg}
							alt='Гарантия'
							className='absolute w-full h-full object-cover z-[-1] inset-0'
						/>
						<div className='bg-white/40 flex items-center justify-center rounded-[6px] w-8 h-8'>
							<svg
								width='14'
								height='16'
								viewBox='0 0 14 16'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M13.5859 14.2929C14.2158 14.9229 13.7697 16 12.8788 16H3.12124C2.23034 16 1.78417 14.9229 2.41414 14.2929L7.29289 9.41414C7.68342 9.02361 8.31658 9.02361 8.70711 9.41414L13.5859 14.2929Z'
									fill='#FCD200'
								/>
								<path
									d='M12.8788 0C13.7697 0 14.2158 1.07714 13.5859 1.70711L8.70711 6.58586C8.31658 6.97639 7.68342 6.97639 7.29289 6.58586L2.41414 1.70711C1.78417 1.07714 2.23034 0 3.12124 0H12.8788Z'
									fill='#FCD200'
								/>
								<path
									d='M6.58586 7.29289C6.97639 7.68342 6.97639 8.31658 6.58586 8.70711L1.70711 13.5859C1.07714 14.2158 0 13.7697 0 12.8788V3.12124C0 2.23034 1.07714 1.78417 1.70711 2.41414L6.58586 7.29289Z'
									fill='#FCD200'
								/>
							</svg>
						</div>
						<div>
							<Title
								type='h3'
								className='text-[22px] text-white'
							>
								Гарантия
							</Title>
							<p className='text-primary text-white'>
								На все выполненные работы мы даем гарантию 5 лет, которая прописана в договоре.
								Мастера в процессе монтажа соблюдают все правила и учитывают особенности покрытия.
							</p>
						</div>
					</li>
					<li className='flex flex-col justify-between p-6 pt-5 bg-light-gray rounded-xl'>
						<div className='bg-white/40 flex items-center justify-center border-white border-1 rounded-[6px] w-8 h-8'>
							<svg
								width='16'
								height='16'
								viewBox='0 0 16 16'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M13.5859 14.2929C14.2158 14.9229 13.7697 16 12.8788 16H3.12124C2.23034 16 1.78417 14.9229 2.41414 14.2929L7.29289 9.41414C7.68342 9.02361 8.31658 9.02361 8.70711 9.41414L13.5859 14.2929Z'
									fill='#FCD200'
								/>
								<path
									d='M16 12.8788C16 13.7697 14.9229 14.2158 14.2929 13.5859L9.41414 8.70711C9.02361 8.31658 9.02361 7.68342 9.41414 7.29289L14.2929 2.41414C14.9229 1.78417 16 2.23034 16 3.12124V12.8788Z'
									fill='#FCD200'
								/>
								<path
									d='M12.8788 0C13.7697 0 14.2158 1.07714 13.5859 1.70711L8.70711 6.58586C8.31658 6.97639 7.68342 6.97639 7.29289 6.58586L2.41414 1.70711C1.78417 1.07714 2.23034 0 3.12124 0H12.8788Z'
									fill='#FCD200'
								/>
								<path
									d='M6.58586 7.29289C6.97639 7.68342 6.97639 8.31658 6.58586 8.70711L1.70711 13.5859C1.07714 14.2158 0 13.7697 0 12.8788V3.12124C0 2.23034 1.07714 1.78417 1.70711 2.41414L6.58586 7.29289Z'
									fill='#FCD200'
								/>
							</svg>
						</div>
						<div>
							<Title
								type='h3'
								className='text-[22px]'
							>
								Своевременность
							</Title>
							<p className='text-dark-gray'>
								Мы строго следим за соблюдением сроков исполнения и придерживаемся установленных
								планов. В случае срыва сроков мы выплачиваем заказчику неустойку.
							</p>
						</div>
					</li>
				</ul>
			</div>
		</section>
	);
}
