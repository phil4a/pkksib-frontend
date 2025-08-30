import Image from 'next/image';

import { Button } from '@/ui/button/Button';

import mainBgImage from '@/assets/home-page/hero/main-bg.jpg';

export default function HomePage() {
	return (
		<div className='layout-container'>
			<div className='flex gap-5 h-[500px]'>
				<div className='flex-1/2 flex flex-col justify-between items-start bg-accent rounded-xl pt-16 pb-12 px-12 relative'>
					<div>
						<h1 className='text-4xl font-bold mb-6 leading-[1.15] max-w-[366px]'>
							Кровельные работы и материалы
						</h1>
						<p className='text-lg'>
							Оптовые цены на кровлю и фасад, прозрачный расчёт — экономия до 20%
						</p>
					</div>
					<Button type='black'>Получить консультацию</Button>
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
				<div className='flex-1/2'>
					<Image
						src={mainBgImage}
						alt={'Первая кровельная компания'}
						priority={true}
						draggable={false}
					></Image>
				</div>
			</div>
		</div>
	);
}
