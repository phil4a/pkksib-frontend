'use client';

import Image from 'next/image';
import React from 'react';

import type { IObjectMarker } from '@/types/object.types';

interface CustomMarkerProps {
	marker: IObjectMarker;
	onClick: () => void;
}

export const CustomMarker: React.FC<CustomMarkerProps> = ({ marker, onClick }) => {
	return (
		<div
			className='custom-marker flex gap-2 items-center bg-white/90 p-1 rounded-r-sm rounded-l-2xl cursor-pointer min-w-fit truncate transition-all hover:scale-105 -translate-x-1/8  relative'
			onClick={onClick}
		>
			{/* Иконка маркера */}
			<div>
				<Image
					src={
						marker.isCommercial
							? '/assets/icons/commercial-marker.svg'
							: '/assets/icons/residential-marker.svg'
					}
					alt={marker.title}
					width={32}
					height={32}
				/>
			</div>

			{/* Название объекта */}
			<span className='block text-base py-1 pr-2'>{marker.title}</span>
		</div>
	);
};
