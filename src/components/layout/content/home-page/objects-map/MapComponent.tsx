'use client';

import { GoogleMap, InfoWindow, OverlayView, useLoadScript } from '@react-google-maps/api';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

import { SkeletonLoader } from '@/ui/skeleton/SkeletonLoader';

import { calculateMarkersCenter, calculateOptimalZoom, defaultCenter } from '@/utils/map';

import { CustomMarker } from './CustomMarker';
import { objectService } from '@/services/object.service';
import type { IObjectMarker } from '@/types/object.types';

const containerStyle = {
	width: '100%',
	height: '100%'
};

export default function MapComponent() {
	const [markers, setMarkers] = useState<IObjectMarker[]>([]);
	const [selectedMarker, setSelectedMarker] = useState<IObjectMarker | null>(null);
	const [isLoadingMarkers, setIsLoadingMarkers] = useState(true);
	const [mapCenter, setMapCenter] = useState(defaultCenter);
	const [mapZoom, setMapZoom] = useState(8);
	const mapRef = useRef<google.maps.Map | null>(null);

	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string
	});

	useEffect(() => {
		const fetchMarkers = async () => {
			try {
				const markersData = await objectService.getObjectMarkers();
				setMarkers(markersData);

				// Автоматически центрируем карту и устанавливаем зум
				if (markersData.length > 0) {
					const center = calculateMarkersCenter(markersData);
					const zoom = calculateOptimalZoom(markersData);
					setMapCenter(center);
					setMapZoom(zoom);
				}
			} catch (error) {
				console.error('Ошибка при загрузке меток объектов:', error);
			} finally {
				setIsLoadingMarkers(false);
			}
		};

		if (isLoaded) {
			fetchMarkers();
		}
	}, [isLoaded]);

	const onMarkerClick = useCallback((marker: IObjectMarker) => {
		setSelectedMarker(marker);
	}, []);

	const onInfoWindowClose = useCallback(() => {
		setSelectedMarker(null);
	}, []);

	const onMapLoad = useCallback((map: google.maps.Map) => {
		mapRef.current = map;
	}, []);

	if (!isLoaded || isLoadingMarkers) {
		return <SkeletonLoader className='h-90 sm:h-140 md:h-150 w-full' />;
	}

	return (
		<div className='h-90 sm:h-140 md:h-150 rounded-xl overflow-hidden map-infowindow'>
			<GoogleMap
				mapContainerStyle={containerStyle}
				center={mapCenter}
				zoom={mapZoom}
				onLoad={onMapLoad}
				options={{
					//mapId: 'ac105ed86c9bd12f614f546f', доработать отображение - вызывает лаги
					disableDefaultUI: true,
					streetViewControl: false,
					mapTypeControl: false,
					zoomControl: true,
					fullscreenControl: true
				}}
			>
				{markers.map(marker => (
					<OverlayView
						key={marker.id}
						position={marker.coordinates}
						mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
					>
						<CustomMarker
							marker={marker}
							onClick={() => onMarkerClick(marker)}
						/>
					</OverlayView>
				))}

				{selectedMarker && (
					<InfoWindow
						position={{
							lat: selectedMarker.coordinates.lat,
							lng: selectedMarker.coordinates.lng
						}}
						onCloseClick={onInfoWindowClose}
					>
						<div className='flex gap-4 p-1 pt-[7px]'>
							<div className='relative flex-shrink-0 w-20 h-20'>
								{selectedMarker.firstPhoto?.formats?.thumbnail ? (
									<Image
										src={selectedMarker.firstPhoto.formats.thumbnail.url}
										fill
										sizes='(max-width: 160px) 100%, 160px'
										alt={selectedMarker.firstPhoto.alternativeText || selectedMarker.title}
										className='w-full h-full object-cover rounded-md'
									/>
								) : (
									<div className='w-full h-full bg-gray-200 rounded-md flex items-center justify-center'>
										<span className='text-gray-400 text-xs'>Нет фото</span>
									</div>
								)}
							</div>

							{/* Правая часть - информация */}
							<div className='flex flex-col gap-2'>
								<h3 className='font-semibold text-base text-gray-800 pr-8 leading-tight'>
									{selectedMarker.title}
								</h3>

								<div className='flex flex-col sm:flex-row gap-0.5 sm:gap-4 text-base'>
									{selectedMarker.time && (
										<p>
											<span className='text-dark-gray'>Срок:</span> {selectedMarker.time}
										</p>
									)}
									{selectedMarker.area && (
										<p>
											<span className='text-dark-gray'>Площадь:</span> {selectedMarker.area} м²
										</p>
									)}
								</div>

								{selectedMarker.short_description && (
									<p className='text-sm leading-snug'>
										{selectedMarker.short_description.length > 120
											? `${selectedMarker.short_description.substring(0, 120)}...`
											: selectedMarker.short_description}
									</p>
								)}
								{selectedMarker.slug && (
									<Link
										href={`/objects/${selectedMarker.slug}`}
										className='text-base mt-2 underline outline-0'
									>
										К проекту
									</Link>
								)}
							</div>
						</div>
					</InfoWindow>
				)}
			</GoogleMap>
		</div>
	);
}
