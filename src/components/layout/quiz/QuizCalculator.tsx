'use client';

import { useState } from 'react';

import { Button } from '@/ui/button/Button';
import { Title } from '@/ui/title/Title';

import { formatUnit } from '@/constants/units';

import { Modal } from '@/ui/modal/Modal';

import { cn } from '@/lib/utils';

import { QuizContactStep } from './QuizContactStep';

import type { IService, IServiceCategory } from '@/types/service.types';

interface Props {
	category?: IServiceCategory | null;
	preselectedServiceId?: number;
	className?: string;
}

const OBJECT_TYPE_OPTIONS = ['Частный дом', 'Коммерческий или промышленный объект'];

const URGENCY_OPTIONS = [
	'Срочно, есть проблема прямо сейчас',
	'В этом сезоне',
	'Пока изучаю варианты'
];

const CATEGORY_STEP_LABELS = ['Материал', 'Количество', 'Контакты'];
const SERVICE_STEP_LABELS = ['Объект', 'Сроки', 'Количество', 'Контакты'];

export function QuizCalculator({ category, preselectedServiceId, className }: Props) {
	const services = category?.services ?? [];
	const isServiceContext = preselectedServiceId != null;

	const [open, setOpen] = useState(false);
	const [step, setStep] = useState(1);
	const [selectedServiceId, setSelectedServiceId] = useState<number | null>(
		preselectedServiceId ?? services[0]?.id ?? null
	);
	const [objectType, setObjectType] = useState<string | null>(null);
	const [urgency, setUrgency] = useState<string | null>(null);
	const [quantity, setQuantity] = useState('');
	const [done, setDone] = useState(false);

	if (!category || services.length === 0) return null;

	const stepLabels = isServiceContext ? SERVICE_STEP_LABELS : CATEGORY_STEP_LABELS;
	const totalSteps = stepLabels.length;
	const quantityStep = isServiceContext ? 3 : 2;
	const contactStep = totalSteps;

	const selectedService = services.find(s => s.id === selectedServiceId) ?? null;
	const quantityNumber = Number(String(quantity).replace(',', '.'));
	const estimatedPrice =
		selectedService && quantityNumber > 0
			? Math.round(selectedService.price * quantityNumber)
			: null;

	function handleOpen() {
		setSelectedServiceId(preselectedServiceId ?? services[0]?.id ?? null);
		setStep(1);
		setObjectType(null);
		setUrgency(null);
		setQuantity('');
		setDone(false);
		setOpen(true);
	}

	function handleClose() {
		setOpen(false);
	}

	return (
		<>
			<Button
				type='accent'
				className={cn(className)}
				onClick={handleOpen}
			>
				Рассчитать стоимость
			</Button>

			<Modal
				open={open}
				onClose={handleClose}
			>
				{!done && (
					<div className='mb-6 flex gap-2 pr-10'>
						{stepLabels.map((label, i) => (
							<div
								key={label}
								className={cn(
									'flex-1 h-1 rounded-full bg-light-gray',
									i + 1 <= step && 'bg-accent'
								)}
							/>
						))}
					</div>
				)}

				{done ? (
					<div>
						<Title
							type='h3'
							className='mb-2 text-accent'
						>
							Спасибо за заявку!
						</Title>
						<p className='text-white/80'>Мы свяжемся с вами в ближайшее время 📞</p>
					</div>
				) : (
					<>
						{isServiceContext && step === 1 && (
							<div>
								<Title
									type='h3'
									className='mb-2 text-accent'
								>
									Какой у вас объект?
								</Title>
								<p className='text-white/80 mb-6'>{selectedService?.title}</p>
								<div className='flex flex-col gap-2'>
									{OBJECT_TYPE_OPTIONS.map(option => (
										<button
											key={option}
											type='button'
											onClick={() => {
												setObjectType(option);
												setStep(2);
											}}
											className={cn(
												'text-left p-4 rounded-lg border transition-colors font-medium text-white',
												option === objectType
													? 'border-accent bg-accent/10'
													: 'border-white/20 hover:border-white/40'
											)}
										>
											{option}
										</button>
									))}
								</div>
							</div>
						)}

						{isServiceContext && step === 2 && (
							<div>
								<Title
									type='h3'
									className='mb-2 text-accent'
								>
									Когда планируете начать работы?
								</Title>
								<p className='text-white/80 mb-6'>{selectedService?.title}</p>
								<div className='flex flex-col gap-2'>
									{URGENCY_OPTIONS.map(option => (
										<button
											key={option}
											type='button'
											onClick={() => {
												setUrgency(option);
												setStep(3);
											}}
											className={cn(
												'text-left p-4 rounded-lg border transition-colors font-medium text-white',
												option === urgency
													? 'border-accent bg-accent/10'
													: 'border-white/20 hover:border-white/40'
											)}
										>
											{option}
										</button>
									))}
								</div>
								<Button
									type='black'
									className='mt-4'
									onClick={() => setStep(1)}
								>
									Назад
								</Button>
							</div>
						)}

						{!isServiceContext && step === 1 && (
							<div>
								<Title
									type='h3'
									className='mb-2 text-accent'
								>
									Выберите материал
								</Title>
								<p className='text-white/80 mb-6'>Категория: {category.title}</p>
								<div className='flex flex-col gap-2 max-h-[50vh] overflow-y-auto pr-1'>
									{services.map(service => (
										<button
											key={service.id}
											type='button'
											onClick={() => {
												setSelectedServiceId(service.id);
												setStep(2);
											}}
											className={cn(
												'text-left flex items-center justify-between gap-4 p-4 rounded-lg border transition-colors',
												service.id === selectedServiceId
													? 'border-accent bg-accent/10'
													: 'border-white/20 hover:border-white/40'
											)}
										>
											<span className='font-medium text-white'>{service.title}</span>
											{!!service.price && (
												<span className='shrink-0 text-white/60 whitespace-nowrap'>
													от {service.price} ₽/{formatUnit(service.units)}
												</span>
											)}
										</button>
									))}
								</div>
							</div>
						)}

						{step === quantityStep && selectedService && (
							<div>
								<Title
									type='h3'
									className='mb-2 text-accent'
								>
									Укажите количество
								</Title>
								<p className='text-white/80 mb-6'>{selectedService.title}</p>
								<div className='flex items-center gap-3 mb-2'>
									<input
										type='number'
										inputMode='decimal'
										min={0}
										step='any'
										value={quantity}
										onChange={e => setQuantity(e.target.value)}
										placeholder='0'
										className='w-full py-3 px-4 rounded-sm bg-white border border-light-gray focus:outline-none focus:border-accent transition-colors'
									/>
									<span className='text-white/80 whitespace-nowrap'>
										{formatUnit(selectedService.units)}
									</span>
								</div>
								<p className='min-h-[24px] mb-6 font-semibold text-white'>
									{estimatedPrice
										? `Предварительно: от ${estimatedPrice.toLocaleString('ru-RU')} ₽`
										: 'Введите количество, чтобы увидеть расчёт'}
								</p>
								<p className='text-sm text-white/60 mb-6'>
									Точная стоимость — после выезда замерщика на объект.
								</p>
								<div className='flex gap-3'>
									<Button
										type='black'
										onClick={() => setStep(quantityStep - 1)}
									>
										Назад
									</Button>
									<Button
										type='accent'
										disabled={!(quantityNumber > 0)}
										onClick={() => setStep(quantityStep + 1)}
									>
										Далее
									</Button>
								</div>
							</div>
						)}

						{step === contactStep && selectedService && category && (
							<QuizContactStep
								category={category}
								service={selectedService as IService}
								quantity={quantityNumber}
								estimatedPrice={estimatedPrice}
								objectType={objectType}
								urgency={urgency}
								onBack={() => setStep(quantityStep)}
								onSuccess={() => setDone(true)}
							/>
						)}
					</>
				)}
			</Modal>
		</>
	);
}
