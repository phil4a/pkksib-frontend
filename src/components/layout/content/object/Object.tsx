import Image from 'next/image';
import Link from 'next/link';

import { ObjectCategoryIcon } from '@/ui/icons/object-category/ObjectCategoryIcon';

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
					sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw'
					blurDataURL='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTAwJyBoZWlnaHQ9JzEwMCc+PHJlY3Qgd2lkdGg9JzEwMCUnIGhlaWdodD0nMTAwJScgZmlsbD0nI2VlZWUnLz48L3N2Zz4='
				/>
				<div className='absolute top-4 right-4 w-8 h-8 bg-accent rounded-lg flex items-center justify-center'>
					<ObjectCategoryIcon slug={item.object_categories?.[0]?.slug} />
				</div>
			</div>
			<div className='px-2 pt-3'>
				<p className='font-semibold text-[22px]'>{item.title}</p>
			</div>
		</Link>
	);
}
