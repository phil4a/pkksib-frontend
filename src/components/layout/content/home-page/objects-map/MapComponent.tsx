'use client';

import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { useCallback, useState } from 'react';

import { SkeletonLoader } from '@/ui/skeleton/SkeletonLoader';

const containerStyle = {
	width: '100%',
	height: '600px',
	borderRadius: '12px'
};

const center = {
	lat: 55.0415,
	lng: 82.9346
};

export default function MapComponent() {
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string
	});

	if (!isLoaded) return <SkeletonLoader className='h-[600px] w-full' />;

	return (
		<GoogleMap
			mapContainerStyle={containerStyle}
			center={center}
			zoom={8}
			options={{
				mapId: 'ac105ed86c9bd12f614f546f',
				disableDefaultUI: true,
				streetViewControl: false,
				mapTypeControl: false,
				fullscreenControl: true
			}}
		>
			{/* Тут позже добавим метки */}
		</GoogleMap>
	);
}
