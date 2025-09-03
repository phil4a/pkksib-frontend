'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';

import { SkeletonLoader } from '@/ui/skeleton/SkeletonLoader';
import { Title } from '@/ui/title/Title';

import { serviceService } from '@/services/service.service';
import type { IServiceCategory } from '@/types/service.types';

export function OurServices() {
	const { data, isLoading, error } = useQuery({
		queryKey: ['serviceCategories'],
		queryFn: () => serviceService.getCategories()
	});

	const categories = data?.data?.data;

	if (error) {
		return <div>Ошибка получения объектов</div>;
	}

	return (
		<section>
			<div className='layout-container py-25'>
				<Title type='h2'>Наши услуги</Title>
				<p className='text-dark-gray'>
					Выполняем любые кровельные и фасадные работы по всей Сибири.
				</p>
				<div className='grid gap-5 grid-cols-4 mt-8'>
					{isLoading ? (
						<SkeletonLoader
							count={4}
							className='bg-light-gray rounded-xl relative overflow-hidden group h-[480px]'
						/>
					) : categories?.length ? (
						categories?.map(item => (
							<ServiceItem
								key={item.id}
								{...item}
							/>
						))
					) : null}
				</div>
			</div>
		</section>
	);
}

function ServiceItem({ title, image, slug, shortDescription }: IServiceCategory) {
	return (
		<div className='bg-light-gray rounded-xl relative overflow-hidden group h-[480px]'>
			<Link
				href={`/services/${slug}`}
				className='z-2 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 h-[calc(100%-24px)] w-[calc(100%-24px)] rounded-lg group-hover:bg-white/60 group-hover:backdrop-blur-[20px] transition-all'
			>
				<p className='text-[22px] font-semibold px-4 pt-7'>{title}</p>
				<div className='px-4 pt-4 pb-7 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all'>
					<p className='text-dark-gray line-clamp-7'>{shortDescription}</p>
				</div>
			</Link>
			<div className='absolute bottom-0 left-0 right-0'>
				<Image
					src={image.url}
					alt={title}
					width={310}
					height={310}
				/>
			</div>
			<Link
				href={`/services/${slug}`}
				className='z-3 absolute bottom-6 right-6 bg-accent hover:bg-primary hover:text-accent w-10 h-10 rounded-sm flex items-center justify-center transition-colors'
			>
				<svg
					width='10'
					height='16'
					viewBox='0 0 10 16'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M1 15L8 8L1 1'
						stroke='currentColor'
						strokeWidth='2'
					/>
				</svg>
			</Link>
		</div>
	);
}
