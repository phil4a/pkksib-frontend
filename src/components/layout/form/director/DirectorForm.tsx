'use client';

import { User } from 'lucide-react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';

import { Button } from '@/ui/button/Button';
import { Field } from '@/ui/field/Field';
import { Title } from '@/ui/title/Title';

import { useDirectorForm } from './useDirectorForm';
import YuriyTitkov from '@/assets/images/Yuriy.jpg';
import { cn } from '@/lib/utils';
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

	const { onSubmit, isLoading } = useDirectorForm(reset);

	return (
		<section
			className={cn('bg-slate-50 rounded-3xl overflow-hidden border border-light-gray', className)}
		>
			<div className='grid md:grid-cols-2 gap-0'>
				<div className='bg-primary text-white p-8 md:p-12 flex flex-col justify-between relative overflow-hidden'>
					<div className='absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-accent/20 rounded-full blur-3xl' />

					<div className='relative z-10'>
						<div className='flex items-center gap-3 mb-6 opacity-80'>
							<span className='uppercase tracking-widest text-xs font-light'>Прямая связь</span>
							<div className='h-px flex-1 bg-white/20' />
						</div>

						<Title
							type='h2'
							className='text-white mb-6 leading-tight'
						>
							Сложный вопрос? <br />
							<span className='text-accent'>Напишите мне лично.</span>
						</Title>

						<p className='text-white mb-8 max-w-md text-lg'>
							Если вы столкнулись с нестандартной ситуацией или хотите оставить отзыв о работе
							команды, я рассмотрю ваше обращение в приоритетном порядке.
						</p>
					</div>

					<div className='relative z-10 flex items-center gap-4 mt-auto'>
						<div className='relative w-30 h-30 rounded-full bg-primary flex items-center justify-center border-2 border-slate-600 shrink-0'>
							<Image
								src={YuriyTitkov}
								fill
								alt='Юрий Титков'
								className='rounded-full'
							/>
						</div>
						<div>
							<div className='font-bold text-xl'>Юрий Титков</div>
							<div className='text-slate-400'>Генеральный директор</div>
						</div>
					</div>
				</div>

				<div className='p-8 md:p-12 bg-white'>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className='flex flex-col gap-3'
					>
						<div className='grid sm:grid-cols-2 gap-5'>
							<Field
								placeholder='Ваше имя'
								registration={register('name', { required: 'Представьтесь, пожалуйста' })}
								error={errors.name?.message}
								className='bg-light-gray'
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
								className='bg-light-gray'
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
							className='bg-light-gray'
						/>

						<div className='w-full'>
							<textarea
								className={cn(
									'w-full py-3 px-4 rounded-sm bg-light-gray border border-light-gray focus:outline-none focus:border-accent transition-colors min-h-[120px] resize-none',
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
							isLoading={isLoading}
							className='w-full md:w-auto self-start mt-1'
						>
							Отправить директору
						</Button>

						<p className='text-sm text-dark-gray mt-4 text-center md:text-left'>
							Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных.
						</p>
					</form>
				</div>
			</div>
		</section>
	);
}
