import { OrderForm } from '@/components/layout/form/order/OrderForm';

import { Title } from '@/ui/title/Title';

const ADVANTAGES = {
	title: 'Как работает наша компания',
	list: [
		'Наши сотрудники имеют многолетний опыт в строительстве и проходят ежегодное обучение',
		'Только качественные кровельные материалы по ценам производителя',
		'Осуществляем полную комплектацию объекта строительными материалами',
		'Согласовываем окончательную цену до начала работ, прописываем ее в договоре',
		'Даем гарантию на работы 5 лет и несем за это ответственность',
		'Мы строго следим за соблюдением сроков. В случае срыва сроков мы выплачиваем заказчику неустойку'
	]
};

const FLAWS = {
	title: 'Как работает наша компания',
	list: [
		'После получения аванса зачастую могут вообще не выйти на работу',
		'Специально занижают смету за счет некачественных материалов',
		'Не соблюдают технические нормы, исключают некоторые нужные виды работ',
		'Могут увеличить смету непосредственно во время строительства',
		'Не выезжают на гарантийный случай или вообще не дают гарантий',
		'В летний сезон задерживают сроки работ и доставки материалов'
	]
};

export function WhyChooseUs() {
	return (
		<section className='bg-light-gray pb-20'>
			<div className='layout-container pt-25 '>
				<Title
					type='h2'
					position='center'
				>
					Почему выбирают нас
				</Title>
				<p className='text-dark-gray text-center'>
					Преимущества сотрудничества с “Первой кровельной компанией”
				</p>
				<div className='flex gap-5 mt-8 pb-20'>
					<div className='flex-1/2'>
						<div className='flex gap-3 items-center p-3 bg-accent rounded-xl'>
							<svg
								width='48'
								height='48'
								viewBox='0 0 48 48'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M31.68 19.3854C31.68 20.3254 31.4813 21.2561 31.0954 22.1245C30.7094 22.9929 30.1437 23.7819 29.4306 24.4466C28.7174 25.1112 27.8708 25.6384 26.939 25.9981C26.0072 26.3578 25.0086 26.543 24 26.543C22.9914 26.543 21.9928 26.3578 21.061 25.9981C20.1292 25.6384 19.2826 25.1112 18.5694 24.4466C17.8563 23.7819 17.2906 22.9929 16.9046 22.1245C16.5186 21.2561 16.32 20.3254 16.32 19.3854L31.68 19.3854Z'
									fill='#21282B'
								/>
								<path
									d='M36 39.6001C36 38.1314 35.6896 36.6771 35.0866 35.3203C34.4835 33.9634 33.5996 32.7305 32.4853 31.692C31.371 30.6535 30.0481 29.8297 28.5922 29.2677C27.1363 28.7057 25.5759 28.4164 24 28.4164C22.4241 28.4164 20.8637 28.7057 19.4078 29.2677C17.9519 29.8297 16.629 30.6535 15.5147 31.692C14.4004 32.7305 13.5165 33.9634 12.9134 35.3203C12.3104 36.6771 12 38.1314 12 39.6001H36Z'
									fill='#21282B'
								/>
								<path
									d='M14.88 15.8066H33.12V17.596H14.88V15.8066Z'
									fill='#21282B'
								/>
								<path
									d='M24.96 9.6001C25.7019 9.68683 26.4298 9.87341 27.1228 10.1567C28.1128 10.5613 29.0121 11.1547 29.7698 11.9024C30.5275 12.6501 31.1288 13.5375 31.5389 14.5144C31.949 15.4913 32.16 16.5386 32.16 17.596H15.84C15.84 16.5386 16.051 15.4913 16.4611 14.5144C16.8712 13.5375 17.4725 12.6501 18.2302 11.9024C18.9879 11.1547 19.8872 10.5613 20.8772 10.1567C21.5702 9.87341 22.2981 9.68683 23.04 9.6001V13.1225H24.96V9.6001Z'
									fill='#21282B'
								/>
							</svg>
							<h2 className='font-semibold text-[22px]'>Как работает наша компания</h2>
						</div>
						<div className='flex flex-col gap-2 mt-2'>
							{ADVANTAGES.list.map(item => (
								<ListComponent
									key={item}
									item={item}
									type='checked'
								/>
							))}
						</div>
					</div>
					<div className='flex-1/2'>
						<div className='flex gap-3 items-center p-3 bg-dark-gray rounded-xl'>
							<svg
								width='48'
								height='48'
								viewBox='0 0 48 48'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M30.4 18.588C30.4 22.2265 27.5346 25.176 24 25.176C20.4654 25.176 17.6 22.2265 17.6 18.588C17.6 14.9496 20.4654 12 24 12C27.5346 12 30.4 14.9496 30.4 18.588Z'
									fill='white'
								/>
								<path
									d='M34 37C34 35.6482 33.7413 34.3096 33.2388 33.0607C32.7362 31.8118 31.9997 30.6771 31.0711 29.7212C30.1425 28.7653 29.0401 28.0071 27.8268 27.4898C26.6136 26.9725 25.3132 26.7062 24 26.7062C22.6868 26.7062 21.3864 26.9725 20.1732 27.4898C18.9599 28.0071 17.8575 28.7653 16.9289 29.7212C16.0003 30.6771 15.2638 31.8118 14.7612 33.0607C14.2587 34.3096 14 35.6482 14 37L34 37Z'
									fill='white'
								/>
							</svg>
							<h2 className='font-semibold text-[22px] text-white'>Как работают частные бригады</h2>
						</div>
						<div className='flex flex-col gap-2 mt-2'>
							{FLAWS.list.map(item => (
								<ListComponent
									key={item}
									item={item}
									type='unchecked'
								/>
							))}
						</div>
					</div>
				</div>
				<OrderForm
					title={[
						{ text: 'Оставьте заявку', accent: true },
						{ text: ' — мы свяжемся и рассчитаем смету' }
					]}
				/>
			</div>
		</section>
	);
}

function ListComponent({ item, type }: { item: string; type: 'checked' | 'unchecked' }) {
	return (
		<div className='bg-white/40 px-4 py-4.5 rounded-lg border border-white/40 flex gap-4 items-center'>
			<div
				className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${type === 'checked' ? 'bg-accent' : 'bg-dark-gray'}`}
			>
				{type === 'checked' ? (
					<svg
						width='23'
						height='17'
						viewBox='0 0 23 17'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M2 7.27273L8.72728 14L21 2'
							stroke='currentColor'
							strokeWidth='3'
						/>
					</svg>
				) : (
					<svg
						width='25'
						height='24'
						viewBox='0 0 25 24'
						fill='currentColor'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M21.5 21L3.5 3'
							stroke='white'
							strokeWidth='3'
						/>
						<path
							d='M21.5 3L3.49994 21.0001'
							stroke='white'
							strokeWidth='3'
						/>
					</svg>
				)}
			</div>
			<p>{item}</p>
		</div>
	);
}
