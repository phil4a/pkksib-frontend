'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';

import { Button } from '@/ui/button/Button';
import { Field } from '@/ui/field/Field';
import { Title } from '@/ui/title/Title';

import { formatUnit } from '@/constants/units';

import { useOrderForm } from '../form/order/useOrderForm';

import type { IOrderForm } from '@/types/form.types';
import type { IService, IServiceCategory } from '@/types/service.types';

interface Props {
	category: IServiceCategory;
	service: IService;
	quantity: number;
	estimatedPrice: number | null;
	objectType?: string | null;
	urgency?: string | null;
	onBack: () => void;
	onSuccess: () => void;
}

export function QuizContactStep({
	category,
	service,
	quantity,
	estimatedPrice,
	objectType,
	urgency,
	onBack,
	onSuccess
}: Props) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<IOrderForm>({ mode: 'onChange' });

	const { onSubmit, isLoading } = useOrderForm(reset);

	async function submit(data: IOrderForm) {
		const message = [objectType && `Тип объекта: ${objectType}`, urgency && `Сроки: ${urgency}`]
			.filter(Boolean)
			.join('. ');

		const payload: IOrderForm = {
			...data,
			source: 'quiz',
			serviceCategory: category.title,
			serviceTitle: service.title,
			quantity,
			unit: service.units ?? undefined,
			estimatedPrice: estimatedPrice ?? undefined,
			pageUrl: typeof window !== 'undefined' ? window.location.pathname : undefined,
			message: message || undefined
		};
		await onSubmit(payload);
		onSuccess();
	}

	return (
		<div>
			<Title
				type='h3'
				className='mb-2 text-accent'
			>
				Оставьте контакты
			</Title>
			<p className='text-white/80 mb-6'>
				<b>Услуга:</b> {service.title}
				{quantity > 0 && `, ${quantity} ${formatUnit(service.units)}`}.<br /> Специалист перезвонит,
				чтобы уточнить детали для точного расчёта.
			</p>
			{/* Плоские кнопки вместо <form>: внутри модалки с шагами Enter/submit по умолчанию
			    неочевиден, а общей кнопке Button нельзя передать HTML-атрибут type="button" —
			    проще и надёжнее развести обработчики явными onClick. */}
			<div className='flex flex-col gap-3 md:gap-1'>
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
				<div className='flex gap-3 mt-2'>
					<Button
						type='black'
						onClick={onBack}
					>
						Назад
					</Button>
					<Button
						type='accent'
						isLoading={isLoading}
						onClick={handleSubmit(submit)}
					>
						Отправить
					</Button>
				</div>
				<p className='mt-3 text-sm text-dark-gray'>
					Нажимая на кнопку вы соглашаетесь с{' '}
					<Link
						href='/privacy-policy'
						className='underline hover:text-primary transition-colors'
					>
						политикой конфиденциальности и обработки персональных данных
					</Link>
				</p>
			</div>
		</div>
	);
}
