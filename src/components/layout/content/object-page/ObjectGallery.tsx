'use client';

import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-zoom.css';
// import styles
import 'lightgallery/css/lightgallery.css';
// import plugins if you need
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import LightGallery from 'lightgallery/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

import { Title } from '@/ui/title/Title';

import type { IPhoto } from '@/types/photo.types';

interface ObjectGalleryProps {
	photos: IPhoto[];
}

export function ObjectGallery({ photos }: ObjectGalleryProps) {
	const lightGalleryRef = useRef<unknown>(null);

	if (!photos || photos.length === 0) {
		return null;
	}

	return (
		<section className='py-16 lg:py-25'>
			<div className='layout-container'>
				<Title
					type='h3'
					className='text-[28px] font-semibold mb-6 lg:mb-8'
				>
					Фото проекта
				</Title>

				<LightGallery
					onInit={ref => {
						if (ref) {
							lightGalleryRef.current = ref.instance;
						}
					}}
					speed={500}
					plugins={[lgThumbnail, lgZoom]}
					elementClassNames='masonry-gallery xs:columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 lg:gap-5 '
				>
					{photos.map((photo, index) => (
						<Link
							key={photo.id}
							href={photo.url}
							className='block break-inside-avoid mb-4 lg:mb-5 group cursor-pointer'
							data-src={photo.url}
							data-sub-html={`<h4>Фото проекта ${index + 1}</h4>`}
						>
							<div className='relative overflow-hidden rounded-lg transition-all duration-300'>
								<Image
									src={photo.url}
									alt={`Фото проекта ${index + 1}`}
									width={photo.width || 400}
									height={photo.height || 300}
									className='w-full h-auto object-cover'
									style={{ aspectRatio: 'auto' }}
									blurDataURL='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjY2NjIi8+PC9zdmc+'
								/>
								<div className='absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center'>
									<div className='opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
										<svg
											className='w-8 h-8 text-white'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7'
											/>
										</svg>
									</div>
								</div>
							</div>
						</Link>
					))}
				</LightGallery>
			</div>
		</section>
	);
}
