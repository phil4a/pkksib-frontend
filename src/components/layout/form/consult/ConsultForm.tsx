'use client';

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { Button } from '@/ui/button/Button';
import { Field } from '@/ui/field/Field';
import { MaxIcon } from '@/ui/icons/MaxIcon';
import { TelegramIcon } from '@/ui/icons/TelegramIcon';
import { WhatsAppIcon } from '@/ui/icons/WhatsAppIcon';
import { Title } from '@/ui/title/Title';

import { SITE_CONFIG } from '@/config/site.config';

import { formService } from '@/services/order-form.service';
import type { IOrderForm } from '@/types/form.types';

interface ConsultFormProps {
	onSubmitted?: () => void;
}

type ConsultFormData = IOrderForm & { message?: string };

export function ConsultForm({ onSubmitted }: ConsultFormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<ConsultFormData>({ mode: 'onChange' });

	const { mutateAsync, isPending } = useMutation({
		mutationKey: ['consult-form'],
		mutationFn: (data: ConsultFormData) => formService.send(data)
	});

	const onSubmit = (data: ConsultFormData) => {
		toast.promise(mutateAsync(data), {
			loading: 'Отправка...',
			success: () => {
				reset();
				onSubmitted?.();
				return 'Спасибо за обращение!\n Мы свяжемся с Вами в ближайшее время 📞';
			},
			error: error => {
				if (axios.isAxiosError(error)) {
					return error.response?.data.message;
				}
			}
		});
	};

	return (
		<div>
			<div className='flex flex-col gap-2 mb-6'>
				<Title
					type='h3'
					className='m-0 text-accent'
				>
					Получить консультацию
				</Title>
				<p className='text-white/80 mb-4'>
					Получите бесплатный расчет, а также консультацию и выезд специалиста
				</p>
			</div>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='flex flex-col gap-3'
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
				<div className='w-full'>
					<textarea
						className='w-full py-3 px-4 rounded-sm bg-white border border-light-gray focus:outline-none focus:border-accent transition-colors min-h-[100px]'
						{...register('message', {
							minLength: { value: 5, message: 'Минимум 5 символов' }
						})}
						placeholder='Сообщение'
					/>
					<p
						aria-live='polite'
						className={`text-sm mt-1 md:min-h-[20px] ${errors.message ? 'text-red-600' : 'opacity-0'}`}
					>
						{errors.message?.message || ''}
					</p>
				</div>
				<Button
					isLoading={isPending}
					type='accent'
					className='w-50 justify-center'
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
			<div className='mt-6 text-white/80 flex flex-col gap-4'>
				<Link
					href={SITE_CONFIG.telegramLink}
					target='_blank'
					rel='noopener noreferrer'
					className='hover:text-white transition-colors flex items-center gap-2'
				>
					<TelegramIcon
						color='#24A1DE'
						width={20}
						height={20}
					/>
					— написать в Telegram
				</Link>
				<Link
					href={SITE_CONFIG.whatsappLink}
					target='_blank'
					rel='noopener noreferrer'
					className='hover:text-white transition-colors flex items-center gap-2'
				>
					<WhatsAppIcon
						color='#25d366'
						width={20}
						height={20}
					/>
					— написать в Whatsapp
				</Link>
				<Link
					href={SITE_CONFIG.maxLink}
					target='_blank'
					rel='noopener noreferrer'
					className='hover:text-white transition-colors flex items-center gap-2'
				>
					<MaxIcon
						color='#443064'
						width={20}
						height={20}
					/>
					— написать в Max
				</Link>
			</div>
		</div>
	);
}
