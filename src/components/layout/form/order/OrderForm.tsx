'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';

import { Button } from '@/ui/button/Button';
import { Field } from '@/ui/field/Field';
import { Title } from '@/ui/title/Title';

import { useOrderForm } from './useOrderForm';
import type { IOrderForm } from '@/types/form.types';

interface TitlePart {
	text: string;
	accent?: boolean;
}

interface OrderFormProps {
	title: TitlePart[] | string;
}

const renderTitle = (title: TitlePart[] | string) => {
	if (typeof title === 'string') {
		return title;
	}

	return title.map((part, index) => (
		<span
			key={index}
			className={part.accent ? 'text-accent' : ''}
		>
			{part.text}
		</span>
	));
};

export function OrderForm({ title }: OrderFormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<IOrderForm>({ mode: 'onChange' });

	const { onSubmit, isLoading } = useOrderForm(reset);

	return (
		<div className='bg-primary p-12 rounded-xl'>
			<div className='flex justify-between items-center mb-9'>
				<Title
					type='h2'
					className='m-0 max-w-[566px] text-white leading-[1.15]'
				>
					{renderTitle(title)}
				</Title>
				<svg
					width='145'
					height='78'
					viewBox='0 0 145 78'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
					className='mr-3'
				>
					<path
						d='M81.014 7.34082C82.6072 5.55306 85.3928 5.55306 86.986 7.34083L143.97 71.2853C146.282 73.8795 144.449 78 140.984 78H27.0161C23.5506 78 21.7183 73.8795 24.0301 71.2853L81.014 7.34082Z'
						fill='#373D40'
					/>
					<path
						d='M53.9912 1.2793C55.5939 -0.426171 58.4061 -0.426171 60.0088 1.2793L73.5625 15.7012L30.5225 64H4.03809C0.55828 64 -1.28581 60.0992 1.0293 57.6357L53.9912 1.2793Z'
						fill='white'
						fillOpacity='0.05'
					/>
				</svg>
			</div>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='flex gap-4 p-6 pb-0 bg-white/10 rounded-xl'
			>
				<Field
					type='text'
					registration={register('name', { required: 'Имя обязательно' })}
					error={errors.name?.message}
					placeholder='Имя'
				/>
				<Field
					type='tel'
					registration={register('phone', {
						required: 'Телефон обязателен',
						pattern: {
							value: /^[+()\-\s\d]+$/,
							message: 'Допустимы только цифры, пробелы, «+», «-», «()»'
						},
						validate: value => {
							const digits = String(value || '').replace(/\D/g, '');
							return (digits.length >= 10 && digits.length <= 15) || 'Введите корректный номер';
						}
					})}
					error={errors.phone?.message}
					placeholder='Телефон'
				/>
				<Button
					isLoading={isLoading}
					type='accent'
				>
					Отправить
				</Button>
			</form>
			<div>
				<p className='mt-5 text-dark-gray'>
					Нажимая на кнопку вы соглашаетесь с{' '}
					<Link
						href='/privacy-policy'
						className='underline hover:text-white transition-colors'
					>
						политикой конфиденциальности и обработки персональных данных
					</Link>
				</p>
			</div>
		</div>
	);
}
