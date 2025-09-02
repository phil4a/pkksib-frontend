import Link from 'next/link';

import { SITE_CONFIG } from '@/config/site.config';

const stages = [
	{
		title: 'Заявка',
		content: 'Вы оставляете заявку',
		link: `tel:${SITE_CONFIG.phoneNumber}`
	},
	{
		title: 'Замер',
		content: 'Выезд мастера на замер. Составление сметы'
	},
	{
		title: 'Монтаж',
		content: 'Подписание договора. Начало работ'
	},
	{
		title: 'Сдаем объект',
		content: 'Сдача объекта. Подписание акта'
	}
];

export function HowWeWork() {
	return (
		<section className='bg-light-gray'>
			<div className='layout-container py-25'>
				<div className='mb-8'>
					<h2 className='text-4xl font-semibold mb-3'>Как мы работаем</h2>
					<p className='text-dark-gray'>
						Основные этапы выполнения работ в «Первой Кровельной Компании»
					</p>
				</div>
				<div className='grid gap-5 grid-cols-4'>
					{stages.map((stage, index) => (
						<WorkStage
							key={stage.title}
							index={index}
							{...stage}
						/>
					))}
				</div>
			</div>
		</section>
	);
}

interface WorkStageProps {
	index: number;
	title: string;
	content: string;
	link?: string;
}

function WorkStage({ index, title, content, link }: WorkStageProps) {
	return (
		<div className={`${index === 0 ? 'bg-accent' : 'bg-white'} rounded-xl p-6 relative`}>
			<span className='inline-flex bg-primary text-white py-2 px-4 rounded-[30px] mb-8'>
				Этап {index + 1}
			</span>
			<h3 className='text-[22px] font-semibold mb-4'>{title}</h3>
			<p className={`${index === 0 ? 'text-primary' : 'text-dark-gray'}`}>{content}</p>
			{link && (
				<Link
					href={link}
					className='font-bold underline'
				>
					{SITE_CONFIG.phoneNumber}
				</Link>
			)}
			{index === 0 && (
				<svg
					className='absolute top-6 right-6'
					width='116'
					height='64'
					viewBox='0 0 116 64'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M64.8096 6.0229C66.0841 4.556 68.3127 4.55601 69.5872 6.0229L115.174 58.4905C117.024 60.6191 115.558 64 112.785 64H21.6113C18.8389 64 17.3731 60.6191 19.2225 58.4905L64.8096 6.0229Z'
						fill='white'
						fillOpacity='0.25'
					/>
					<path
						d='M43.1929 1.04952C44.4751 -0.349841 46.7248 -0.349841 48.0069 1.04952L58.8499 12.8829L24.4179 52.5129H3.23041C0.446568 52.5129 -1.0287 49.3123 0.823381 47.291L43.1929 1.04952Z'
						fill='white'
						fillOpacity='0.15'
					/>
				</svg>
			)}
		</div>
	);
}
