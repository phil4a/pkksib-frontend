'use client';

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Mail, Phone, User } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { Button } from '@/ui/button/Button';
import { Field } from '@/ui/field/Field';
import { Title } from '@/ui/title/Title';

import { cn } from '@/lib/utils';
import { formService } from '@/services/order-form.service';
import type { IDirectorForm } from '@/types/form.types';

interface DirectorFormProps {
	className?: string;
}

export function DirectorForm({ className }: DirectorFormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<IDirectorForm>({ mode: 'onChange' });

	const { mutateAsync, isPending } = useMutation({
		mutationKey: ['director-form'],
		mutationFn: (data: IDirectorForm) => formService.sendDirector(data)
	});

	const onSubmit = (data: IDirectorForm) => {
		toast.promise(mutateAsync(data), {
			loading: 'Отправка директору...',
			success: () => {
				reset();
				return 'Сообщение отправлено! Директор рассмотрит его лично.';
			},
			error: error => {
				if (axios.isAxiosError(error)) {
					return error.response?.data.message || 'Ошибка отправки';
				}
				return 'Произошла ошибка';
			}
		});
	};

	return (
		<section
			className={cn(
				'bg-slate-50 rounded-3xl overflow-hidden shadow-sm border border-slate-100',
				className
			)}
		>
			<div className='grid md:grid-cols-2 gap-0'>
				{/* Left Column: Info & Trust */}
				<div className='bg-slate-900 text-white p-8 md:p-12 flex flex-col justify-between relative overflow-hidden'>
					{/* Decorative background element */}
					<div className='absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-accent/20 rounded-full blur-3xl' />

					<div className='relative z-10'>
						<div className='flex items-center gap-3 mb-6 opacity-80'>
							<span className='uppercase tracking-widest text-xs font-semibold'>Прямая связь</span>
							<div className='h-px flex-1 bg-white/20' />
						</div>

						<Title
							type='h2'
							className='text-white mb-6 leading-tight'
						>
							Сложный вопрос? <br />
							<span className='text-accent'>Напишите мне лично.</span>
						</Title>

						<p className='text-slate-300 mb-8 max-w-md text-lg'>
							Если вы столкнулись с нестандартной ситуацией или хотите оставить отзыв о работе
							команды, я рассмотрю ваше обращение в приоритетном порядке.
						</p>
					</div>

					<div className='relative z-10 flex items-center gap-4 mt-auto'>
						<div className='w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center border-2 border-slate-600 shrink-0'>
							<User className='w-8 h-8 text-slate-400' />
						</div>
						<div>
							<div className='font-bold text-lg'>Иван Иванов</div>
							<div className='text-slate-400 text-sm'>Генеральный директор</div>
						</div>
					</div>
				</div>

				{/* Right Column: Form */}
				<div className='p-8 md:p-12 bg-white'>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className='flex flex-col gap-5'
					>
						<div className='grid sm:grid-cols-2 gap-5'>
							<Field
								placeholder='Ваше имя'
								registration={register('name', { required: 'Представьтесь, пожалуйста' })}
								error={errors.name?.message}
								className='bg-slate-50'
							/>
							<Field
								type='tel'
								placeholder='Телефон'
								registration={register('phone', {
									required: 'Телефон обязателен',
									pattern: {
										value: /^[+()\-\s\d]+$/,
										message: 'Некорректный формат'
									},
									minLength: { value: 10, message: 'Минимум 10 цифр' }
								})}
								error={errors.phone?.message}
								className='bg-slate-50'
							/>
						</div>

						<Field
							type='email'
							placeholder='Email для ответа'
							registration={register('email', {
								required: 'Email обязателен',
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
									message: 'Некорректный email'
								}
							})}
							error={errors.email?.message}
							className='bg-slate-50'
						/>

						<div className='w-full'>
							<textarea
								className={cn(
									'w-full py-3 px-4 rounded-sm bg-white border border-light-gray focus:outline-none focus:border-accent transition-colors min-h-[120px] resize-none',
									errors.message ? 'border-red-500' : ''
								)}
								placeholder='Суть вопроса или обращения...'
								{...register('message', {
									required: 'Сообщение не может быть пустым',
									minLength: { value: 10, message: 'Распишите подробнее (мин. 10 символов)' }
								})}
							/>
							{errors.message && (
								<p className='text-red-600 text-sm mt-1'>{errors.message.message}</p>
							)}
						</div>

						<Button
							type='accent'
							disabled={isPending}
							className='w-full md:w-auto self-start mt-2'
						>
							{isPending ? 'Отправка...' : 'Отправить директору'}
						</Button>

						<p className='text-xs text-slate-400 mt-4 text-center md:text-left'>
							Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных.
						</p>
					</form>
				</div>
			</div>
		</section>
	);
}
