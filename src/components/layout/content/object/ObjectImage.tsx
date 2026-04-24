'use client';

import Image from 'next/image';
import { useState } from 'react';

import { SkeletonLoader } from '@/ui/skeleton/SkeletonLoader';

interface ObjectImageProps {
	src?: string;
	alt: string;
	sizes: string;
	className?: string;
}

export function ObjectImage({ src, alt, sizes, className }: ObjectImageProps) {
	const [loaded, setLoaded] = useState(false);

	return (
		<div className='absolute inset-0'>
			<SkeletonLoader
				className={`absolute inset-0 h-full rounded-xl transition-opacity duration-300 ${loaded ? 'opacity-0' : 'opacity-100'} ${className ?? ''}`}
			/>
			{src ? (
				<Image
					src={src}
					alt={alt}
					fill
					sizes={sizes}
					className={`object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
					placeholder='empty'
					onLoadingComplete={() => setLoaded(true)}
				/>
			) : null}
		</div>
	);
}
