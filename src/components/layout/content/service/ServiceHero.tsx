import Image from 'next/image';

import { Title } from '@/ui/title/Title';

import { formatUnit } from '@/constants/units';

import { QuizCalculator } from '@/components/layout/quiz/QuizCalculator';

import type { IService } from '@/types/service.types';

interface Props {
	service: IService;
}

export function ServiceHero({ service }: Props) {
	return (
		<section className='mb-12 md:mb-20'>
			<div className='layout-container flex flex-col md:flex-row gap-4 md:gap-5'>
				<div className='relative grow-1 md:shrink-0 grow-0 md:flex-1/3 aspect-[4/3] lg:aspect-square rounded-xl overflow-hidden bg-light-gray'>
					{service.image?.url ? (
						<Image
							className='object-cover'
							fill
							sizes='(max-width: 768px) 100vw, 33vw'
							src={service.image.url}
							alt={service.title}
						/>
					) : (
						<div className='w-full h-full flex items-center justify-center text-dark-gray'>
							Нет изображения
						</div>
					)}
				</div>
				<div className='md:grow-1 bg-light-gray rounded-xl p-6 lg:p-12'>
					<Title
						type='h1'
						className='mb-4 text-[26px]  font-semibold'
					>
						{service.title}
					</Title>
					<p className='block font-semibold text-lg md:text-[22px] text-dark-gray'>
						от {service.price} ₽/{formatUnit(service.units)}
					</p>
					{service.shortDescription && (
						<p className='block text-dark-gray pt-6 pb-3'>{service.shortDescription}</p>
					)}
					<div className='flex flex-wrap gap-3 mt-6'>
						{/* <Button
							type='accent'
							data-open-consult
						>
							Рассчитать стоимость
						</Button> */}
						<QuizCalculator
							category={service.service_category}
							preselectedServiceId={service.id}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
