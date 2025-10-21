import Image from 'next/image';
import Link from 'next/link';

import { PAGE } from '@/config/pages';

import { formatDateToRu } from '@/utils/formatDate';

import type { IArticle } from '@/types/article.types';

interface Props {
	item: IArticle;
	priority?: boolean;
}

export function ArticleCard({ item, priority }: Props) {
	return (
		<Link
			key={item.id}
			href={PAGE.ARTICLE(item.slug)}
			className='group flex flex-col rounded-xl overflow-hidden bg-light-gray'
		>
			<div className='shrink-0 h-70 w-full relative overflow-hidden'>
				{item.image?.url ? (
					<Image
						src={item.image.url}
						alt={item.image?.alternativeText || item.title}
						fill
						sizes='(max-width: 768px) 100vw, 50vw'
						className='w-full h-full object-cover'
						priority={priority}
					/>
				) : (
					<span className='text-sm text-gray-500'>Нет изображения</span>
				)}
			</div>
			<div className='p-6 pt-5 flex flex-col h-full'>
				<p className='text-dark-gray mb-1'>{formatDateToRu(item.createdAt)}</p>
				<h3 className='text-lg lg:text-[22px] font-semibold mb-3 leading-[1.25]'>{item.title}</h3>
				<p className='text-dark-gray line-clamp-2 mb-4'>{item.short_description}</p>
				<div className='font-semibold mt-auto flex items-center gap-2'>
					Читать <span>→</span>
				</div>
			</div>
		</Link>
	);
}
