import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/ui/button/Button';

import { PAGE } from '@/config/pages';

import type { IServiceCategory } from '@/types/service.types';

interface Props {
	category: IServiceCategory;
}

export function ServiceCard({ category }: Props) {
	return (
		<Link
			href={PAGE.SERVICE(category.slug)}
			className='flex flex-col items-center p-3 border-1 border-light-gray rounded-xl h-full'
		>
			<div className='relative w-full aspect-square mb-3 bg-light-gray rounded-lg'>
				<Image
					src={category.image.url}
					alt={category.title}
					fill
					sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw'
					className='object-cover rounded-lg'
				/>
			</div>
			<div className='p-3 flex gap-4 flex-col h-full'>
				<p className='text-[20px] font-semibold'>{category.title}</p>
				<p className='text-dark-gray line-clamp-2 '>{category.shortDescription}</p>
				<div className='flex justify-between items-center gap-4 mt-auto'>
					{category.price && <p className='text-[22px] font-semibold'>от {category.price} ₽/м²</p>}
					<Button
						type='accent'
						className='flex items-center justify-center w-10 h-10 p-0'
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
								stroke='#21282B'
								strokeWidth='2'
							/>
						</svg>
					</Button>
				</div>
			</div>
		</Link>
	);
}
