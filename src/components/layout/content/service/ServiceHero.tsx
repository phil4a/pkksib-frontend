import Image from 'next/image';

import { Button } from '@/ui/button/Button';
import { Title } from '@/ui/title/Title';

import { formatUnit } from '@/constants/units';

import type { IService } from '@/types/service.types';

interface Props {
	service: IService;
}

export function ServiceHero({ service }: Props) {
	return (
		<section>
			<div className='layout-container flex gap-5'>
				<div className='relative shrink-0 grow-0 flex-1/3 aspect-square rounded-xl overflow-hidden'>
					<Image
						className='object-cover'
						fill
						sizes='(max-width: 768px) 100vw, 33vw'
						src={service.image.url}
						alt={service.title}
					/>
				</div>
				<div className='grow-1 bg-light-gray rounded-xl p-12'>
					<Title
						type='h1'
						className='mb-4'
					>
						{service.title}
					</Title>
					<p className='block font-semibold text-[22px] text-dark-gray'>
						от {service.price} ₽/{formatUnit(service.units)}
					</p>

					<p className='block text-dark-gray pt-6 pb-9'>{service.shortDescription}</p>
					<Button type='accent'>Рассчитать стоимость</Button>
				</div>
			</div>
		</section>
	);
}
