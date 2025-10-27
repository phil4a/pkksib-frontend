'use client';

import { MarkerClusterer } from '@googlemaps/markerclusterer';
import { GoogleMap, InfoWindow, useLoadScript } from '@react-google-maps/api';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { type Root, createRoot } from 'react-dom/client';

import { CustomMarker } from '@/components/layout/content/home-page/objects-map/CustomMarker';

import { SkeletonLoader } from '@/ui/skeleton/SkeletonLoader';

import { calculateMarkersCenter, calculateOptimalZoom, defaultCenter } from '@/utils/map';

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
	const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);
	const markerRootsRef = useRef<Root[]>([]);
	const markerClustererRef = useRef<MarkerClusterer | null>(null);

	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
		libraries: ['marker']
	});

	const createCustomMarkerIcon = useCallback((marker: IObjectMarker) => {
		// Создаем SVG иконку для маркера
		const svg = `
			<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
				<circle cx="20" cy="20" r="18" fill="#ffffff" stroke="#2563eb" stroke-width="2"/>
				<circle cx="20" cy="20" r="8" fill="#2563eb"/>
			</svg>
		`;

		return {
			url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg),
			scaledSize: new google.maps.Size(40, 40),
			anchor: new google.maps.Point(20, 20)
		};
	}, []);

	const createMarkers = useCallback(
		(markersData: IObjectMarker[]) => {
			if (!mapRef.current) {
				console.log('❌ No map reference, skipping marker creation');
				return;
			}

			// Очищаем существующие маркеры и React-рендеры
			markersRef.current.forEach(marker => (marker.map = null));
			markersRef.current = [];
			markerRootsRef.current.forEach(root => {
				try {
					root.unmount();
				} catch {}
			});
			markerRootsRef.current = [];

			// Очищаем существующий кластеризатор
			if (markerClustererRef.current) {
				markerClustererRef.current.clearMarkers();
				markerClustererRef.current = null;
			}

			// Создаем новые маркеры
			const validMarkers = markersData.filter(m => !!m.coordinates);

			const newMarkers = validMarkers.map(markerData => {
				// Контейнер и React-рендер кастомного маркера
				const container = document.createElement('div');
				const root = createRoot(container);
				root.render(
					<CustomMarker
						marker={markerData}
						onClick={() => setSelectedMarker(markerData)}
					/>
				);
				markerRootsRef.current.push(root);

				const advMarker = new google.maps.marker.AdvancedMarkerElement({
					position: { lat: markerData.coordinates.lat, lng: markerData.coordinates.lng },
					map: mapRef.current!,
					content: container,
					title: markerData.title
				});

				advMarker.addListener('click', () => {
					setSelectedMarker(markerData);
				});

				return advMarker;
			});

			markersRef.current = newMarkers;

			// Создаем кластеризатор
			if (newMarkers.length > 0) {
				markerClustererRef.current = new MarkerClusterer({
					map: mapRef.current,
					markers: newMarkers,
					renderer: {
						render: ({ count, position }) => {
							// DOM-контент для кластера через AdvancedMarkerElement
							const cluster = document.createElement('div');
							cluster.style.width = '42px';
							cluster.style.height = '42px';
							cluster.style.borderRadius = '50%';
							cluster.style.backgroundColor = 'var(--primary)';
							cluster.style.color = 'var(--accent)';
							cluster.style.display = 'flex';
							cluster.style.alignItems = 'center';
							cluster.style.justifyContent = 'center';
							cluster.style.fontWeight = 'semibold';
							cluster.style.fontSize = '16px';
							cluster.style.border = '1px solid var(--light-gray)';
							cluster.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
							cluster.textContent = String(count);

							const advClusterMarker = new google.maps.marker.AdvancedMarkerElement({
								position,
								content: cluster
							});

							advClusterMarker.addListener('click', () => {
								const map = mapRef.current;
								if (!map) return;
								map.panTo(position);
								map.setZoom(Math.min((map.getZoom() ?? 8) + 2, 18));
							});

							// Приведение типов для совместимости с MarkerClusterer
							return advClusterMarker as unknown as google.maps.Marker;
						}
					}
				});
			}
		},
		[createCustomMarkerIcon]
	);

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
				console.error('❌ Ошибка при загрузке меток объектов:', error);
			} finally {
				setIsLoadingMarkers(false);
			}
		};

		if (isLoaded) {
			fetchMarkers();
		}
	}, [isLoaded]);

	// Создаем маркеры после загрузки данных и карты
	useEffect(() => {
		if (markers.length > 0 && mapRef.current && !isLoadingMarkers) {
			// Небольшая задержка для гарантии того, что карта полностью загружена
			setTimeout(() => {
				createMarkers(markers);
			}, 100);
		}
	}, [markers, createMarkers, isLoadingMarkers]);

	const onInfoWindowClose = useCallback(() => {
		setSelectedMarker(null);
	}, []);

	const onMapLoad = useCallback(
		(map: google.maps.Map) => {
			mapRef.current = map;

			// Если у нас уже есть маркеры, создаем их
			if (markers.length > 0 && !isLoadingMarkers) {
				setTimeout(() => {
					createMarkers(markers);
				}, 100);
			}
		},
		[markers, createMarkers, isLoadingMarkers]
	);

	// Очистка при размонтировании
	useEffect(() => {
		return () => {
			if (markerClustererRef.current) {
				markerClustererRef.current.clearMarkers();
			}
			markersRef.current.forEach(marker => (marker.map = null));
		};
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
					mapId: process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID as string | undefined,
					disableDefaultUI: true,
					streetViewControl: false,
					mapTypeControl: false,
					zoomControl: true,
					fullscreenControl: true
				}}
			>
				{selectedMarker && (
					<InfoWindow
						position={{
							lat: selectedMarker.coordinates.lat,
							lng: selectedMarker.coordinates.lng
						}}
						options={{
							// Сдвигаем окно вверх на 40px, чтобы не перекрывать кастомный маркер
							pixelOffset: new google.maps.Size(0, -40),
							disableAutoPan: false
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
