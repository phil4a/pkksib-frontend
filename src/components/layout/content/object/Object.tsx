import Image from 'next/image';
import Link from 'next/link';

import type { IObject } from '@/types/object.types';

interface Props {
	item: IObject;
}

export function Object({ item }: Props) {
	return (
		<Link
			key={item.slug}
			href={`/objects/${item.slug}`}
			className='block overflow-hidden'
		>
			<div className='relative aspect-[1/1] rounded-xl overflow-hidden'>
				<Image
					src={item.photos?.[0]?.url || '/logo.png'}
					alt={item.title || 'Объект'}
					fill
					className='object-cover'
					placeholder='blur'
					blurDataURL='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTAwJyBoZWlnaHQ9JzEwMCc+PHJlY3Qgd2lkdGg9JzEwMCUnIGhlaWdodD0nMTAwJScgZmlsbD0nI2VlZWUnLz48L3N2Zz4='
				/>
				<div className='absolute top-4 right-4 w-8 h-8 bg-accent rounded-lg flex items-center justify-center'>
					<svg
						width='18'
						height='16'
						viewBox='0 0 18 16'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M2.7 16H15.3V7.11111H18L9 0L0 7.11111H2.7V16Z'
							fill='#21282B'
						/>
					</svg>
				</div>
			</div>
			<div className='px-2 pt-3'>
				<p className='font-semibold text-[22px]'>{item.title}</p>
			</div>
		</Link>
	);
}
