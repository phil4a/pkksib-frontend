'use client';

import { GoogleMap, InfoWindow, OverlayView, useLoadScript } from '@react-google-maps/api';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

import { SkeletonLoader } from '@/ui/skeleton/SkeletonLoader';

import { CustomMarker } from './CustomMarker';
import { objectService } from '@/services/object.service';
import type { IObjectMarker } from '@/types/object.types';

const containerStyle = {
	width: '100%',
	height: '600px',
	borderRadius: '12px'
};

const defaultCenter = {
	lat: 55.0415,
	lng: 82.9346
};

// Функция для расчета центральной точки всех маркеров
const calculateMarkersCenter = (markers: IObjectMarker[]) => {
	if (markers.length === 0) return defaultCenter;

	const totalLat = markers.reduce((sum, marker) => sum + marker.coordinates.lat, 0);
	const totalLng = markers.reduce((sum, marker) => sum + marker.coordinates.lng, 0);

	return {
		lat: totalLat / markers.length,
		lng: totalLng / markers.length
	};
};

// Функция для расчета оптимального зума на основе разброса маркеров
const calculateOptimalZoom = (markers: IObjectMarker[]) => {
	if (markers.length === 0) return 8;
	if (markers.length === 1) return 12;

	const lats = markers.map(marker => marker.coordinates.lat);
	const lngs = markers.map(marker => marker.coordinates.lng);

	const latRange = Math.max(...lats) - Math.min(...lats);
	const lngRange = Math.max(...lngs) - Math.min(...lngs);
	const maxRange = Math.max(latRange, lngRange);
	console.log(maxRange);

	// Определяем зум на основе максимального разброса координат
	if (maxRange > 10) return 5;
	if (maxRange > 5) return 6;
	if (maxRange > 2) return 7;
	if (maxRange > 1) return 8;
	if (maxRange > 0.5) return 9;
	if (maxRange > 0.2) return 10;
	if (maxRange > 0.1) return 11;
	return 12;
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
		return <SkeletonLoader className='h-[600px] w-full' />;
	}

	return (
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
					<div className='flex gap-4 p-2 min-w-[300px] max-w-[322px] '>
						<div className='flex-shrink-0 w-20 h-20'>
							{selectedMarker.firstPhoto?.formats?.thumbnail ? (
								<Image
									src={selectedMarker.firstPhoto.formats.thumbnail.url}
									width={160}
									height={160}
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
						<div className='flex-1 flex flex-col gap-1'>
							<h3 className='font-semibold text-sm text-gray-800 pr-8 leading-tight'>
								{selectedMarker.title}
							</h3>

							{selectedMarker.area && (
								<p className='text-xs text-gray-700'>
									<span className='font-medium'>Площадь:</span> {selectedMarker.area} м²
								</p>
							)}

							{selectedMarker.description && (
								<p className='text-xs text-gray-600 leading-relaxed'>
									{selectedMarker.description.length > 120
										? `${selectedMarker.description.substring(0, 120)}...`
										: selectedMarker.description}
								</p>
							)}
						</div>
					</div>
				</InfoWindow>
			)}
		</GoogleMap>
	);
}
