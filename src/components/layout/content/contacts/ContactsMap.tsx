'use client';

import { GoogleMap, InfoWindow, OverlayView, useLoadScript } from '@react-google-maps/api';
import { useCallback, useEffect, useRef, useState } from 'react';

import { CustomMarker } from '@/components/layout/content/home-page/objects-map/CustomMarker';

import { SkeletonLoader } from '@/ui/skeleton/SkeletonLoader';

import { CONTACT_MARKERS } from '@/constants/contact-markers';
import type { IContactMarker } from '@/constants/contact-markers';

import { calculateMarkersCenter, calculateOptimalZoom, defaultCenter } from '@/utils/map';

const containerStyle = {
	width: '100%',
	height: '518px',
	borderRadius: '12px'
};

export default function ContactsMap({
	selectedMarkerId,
	onMarkerSelect
}: {
	selectedMarkerId?: number;
	onMarkerSelect?: (id: number) => void;
}) {
	const [markers, setMarkers] = useState<IContactMarker[]>([]);
	const [selectedMarker, setSelectedMarker] = useState<IContactMarker | null>(null);
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
				// Используем константы контактов вместо API объектов
				const markersData = CONTACT_MARKERS;
				setMarkers(markersData);

				// Автоматически центрируем карту и устанавливаем зум
				if (markersData.length > 0) {
					const center = calculateMarkersCenter(markersData);
					const zoom = calculateOptimalZoom(markersData);
					setMapCenter(center);
					setMapZoom(zoom);
				}
			} catch (error) {
				console.error('Ошибка при загрузке меток контактов:', error);
			} finally {
				setIsLoadingMarkers(false);
			}
		};

		if (isLoaded) {
			fetchMarkers();
		}
	}, [isLoaded]);

	// Выбор маркера по клику на карточку
	useEffect(() => {
		if (!selectedMarkerId || markers.length === 0 || !mapRef.current) return;
		const marker = markers.find(m => m.id === selectedMarkerId) || null;
		if (marker) {
			setSelectedMarker(marker);
			mapRef.current.panTo(marker.coordinates);
			mapRef.current.setZoom(13);
		}
	}, [selectedMarkerId, markers]);

	const onMarkerClick = useCallback(
		(marker: IContactMarker) => {
			setSelectedMarker(marker);
			onMarkerSelect?.(marker.id);
		},
		[onMarkerSelect]
	);

	const onInfoWindowClose = useCallback(() => {
		setSelectedMarker(null);
	}, []);

	const onMapLoad = useCallback((map: google.maps.Map) => {
		mapRef.current = map;
	}, []);

	if (!isLoaded || isLoadingMarkers) {
		return <SkeletonLoader className='h-[518px] w-full' />;
	}

	return (
		<GoogleMap
			mapContainerStyle={containerStyle}
			center={mapCenter}
			zoom={mapZoom}
			onLoad={onMapLoad}
			options={{
				// mapId: 'ac105ed86c9bd12f614f546f',
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
					<div className='p-2 min-w-[300px] max-w-[400px] text-base'>
						<div className='inline-flex items-center gap-2'>
							<svg
								width='9'
								height='12'
								viewBox='0 0 9 12'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M4.5 0C5.69334 1.61881e-08 6.83775 0.486197 7.68164 1.35156C8.52552 2.21708 8.99996 3.39121 9 4.61523C9 8.76856 4.50112 11.9992 4.5 12C4.49912 11.9994 0 8.76867 0 4.61523C3.88592e-05 3.39121 0.47448 2.21708 1.31836 1.35156C2.16225 0.486197 3.30666 0 4.5 0ZM4.5 3C3.67157 3 3 3.67157 3 4.5C3 5.32843 3.67157 6 4.5 6C5.32843 6 6 5.32843 6 4.5C6 3.67157 5.32843 3 4.5 3Z'
									fill='#FCD200'
								/>
							</svg>
							<span className='font-semibold'>{selectedMarker.city}</span>
						</div>
						<div className='mt-1'>
							<span className='pb-1 block'>{selectedMarker.title}</span>
							<p>
								{selectedMarker.postalCode}, г. {selectedMarker.addressLocality},{' '}
								{selectedMarker.streetAddress}
							</p>
							<a
								href={`tel:${selectedMarker.telephoneLink}`}
								className='font-semibold py-2'
							>
								{selectedMarker.telephone}
							</a>
							<p>{selectedMarker.schedule}</p>
						</div>
					</div>
				</InfoWindow>
			)}
		</GoogleMap>
	);
}
