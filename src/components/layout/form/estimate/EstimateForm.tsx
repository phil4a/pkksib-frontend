'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import { Button } from '@/ui/button/Button';
import { Field } from '@/ui/field/Field';
import { Title } from '@/ui/title/Title';

import { useOrderForm } from '../order/useOrderForm';

import formImage from '@/assets/service-page/form-image.jpg';
import type { IOrderForm } from '@/types/form.types';

export function EstimateForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<IOrderForm>({ mode: 'onChange' });

	const { onSubmit, isLoading } = useOrderForm(reset);
	return (
		<section>
			<div className='layout-container pt-16 pb-4 md:py-20 lg:py-25'>
				<div className='flex flex-col md:flex-row gap-2 md:gap-4 lg:gap-5'>
					<div className='md:flex-1/2 bg-accent p-6 lg:py-16 lg:px-12 rounded-xl'>
						<Title
							type='h3'
							className='mb-6 lg:mb-10'
						>
							Получите готовую смету бесплатно
						</Title>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className='flex flex-col gap-3 md:gap-1'
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
										return (
											(digits.length >= 10 && digits.length <= 15) || 'Введите корректный номер'
										);
									}
								})}
								error={errors.phone?.message}
								placeholder='Телефон'
							/>
							<Button
								isLoading={isLoading}
								type='black'
								className='max-w-50 justify-center'
							>
								Отправить
							</Button>
						</form>
						<div>
							<p className='mt-5 text-dark-gray'>
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
					<div className='relative md:flex-1/2 aspect-[4/3] md:aspect-auto'>
						<Image
							src={formImage}
							fill
							sizes='(max-width: 768px) 100vw, 40vw'
							alt='изображения крыши коттеджа'
							className='object-cover h-full rounded-xl'
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
