import Link from 'next/link';

import { ObjectCategoryIcon } from '@/ui/icons/object-category/ObjectCategoryIcon';

import type { IObject } from '@/types/object.types';

import { ObjectImage } from './ObjectImage';

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
				<ObjectImage
					src={item.photos?.[0]?.url}
					alt={item.title || 'Объект'}
					sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw'
				/>
				<div className='absolute top-4 right-4 w-8 h-8 bg-accent rounded-lg flex items-center justify-center'>
					<ObjectCategoryIcon slug={item.object_categories?.[0]?.slug} />
				</div>
			</div>
			<div className='px-2 pt-3'>
				<p className='font-semibold text-[18px] lg:text-[22px]'>{item.title}</p>
			</div>
		</Link>
	);
}
