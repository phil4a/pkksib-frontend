'use client';

import { GoogleMap, InfoWindow, OverlayView, useLoadScript } from '@react-google-maps/api';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import Supercluster, { type ClusterFeature, type PointFeature } from 'supercluster';

import { SkeletonLoader } from '@/ui/skeleton/SkeletonLoader';

import { calculateMarkersCenter, calculateOptimalZoom, defaultCenter } from '@/utils/map';

import ClusterMarker from './ClusterMarker';
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
	const [clusters, setClusters] = useState<
		(PointFeature<PointProps> | ClusterFeature<ClusterProps>)[]
	>([]);
	const superclusterRef = useRef<Supercluster<PointProps, ClusterProps> | null>(null);
	const markerMapRef = useRef<Record<string, IObjectMarker>>({});

	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string
	});

	useEffect(() => {
		const fetchMarkers = async () => {
			try {
				const markersData = await objectService.getObjectMarkers();
				setMarkers(markersData);

				// Построение индекса для кластеризации
				markerMapRef.current = Object.fromEntries(markersData.map(m => [String(m.id), m]));
				const points: PointFeature<PointProps>[] = markersData
					.filter(m => !!m.coordinates)
					.map(m => ({
						type: 'Feature',
						properties: { markerId: String(m.id) },
						geometry: { type: 'Point', coordinates: [m.coordinates.lng, m.coordinates.lat] }
					}));
				superclusterRef.current = new Supercluster<PointProps, ClusterProps>({
					radius: 60,
					maxZoom: 20
				});
				superclusterRef.current.load(points);

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

	const updateClusters = useCallback(() => {
		const map = mapRef.current;
		const index = superclusterRef.current;
		if (!map || !index) return;
		const bounds = map.getBounds();
		if (!bounds) return;
		const ne = bounds.getNorthEast();
		const sw = bounds.getSouthWest();
		const zoom = Math.round(map.getZoom() || 0);
		const clusters = index.getClusters([sw.lng(), sw.lat(), ne.lng(), ne.lat()], zoom);
		setClusters(clusters);
	}, []);

	const onMapLoad = useCallback(
		(map: google.maps.Map) => {
			mapRef.current = map;
			// Первичное вычисление кластеров после загрузки карты
			setTimeout(() => updateClusters(), 0);
		},
		[updateClusters]
	);

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
				onIdle={updateClusters}
				options={{
					//mapId: 'ac105ed86c9bd12f614f546f', доработать отображение - вызывает лаги
					disableDefaultUI: true,
					streetViewControl: false,
					mapTypeControl: false,
					zoomControl: true,
					fullscreenControl: true
				}}
			>
				{clusters.map(item => {
					const [lng, lat] = item.geometry.coordinates;
					const position = { lat, lng };

					if ('cluster' in item.properties) {
						const count = item.properties.point_count as number;
						const clusterId = item.properties.cluster_id as number;
						return (
							<ClusterMarker
								key={`cluster-${clusterId}`}
								position={position}
								count={count}
								onClick={() => {
									if (!superclusterRef.current || !mapRef.current) return;
									const expansionZoom = superclusterRef.current.getClusterExpansionZoom(clusterId);
									mapRef.current.setZoom(expansionZoom);
									mapRef.current.panTo(position);
								}}
							/>
						);
					}

					const markerId = (item.properties as PointProps).markerId;
					const marker = markerMapRef.current[markerId];
					if (!marker) return null;
					return (
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
					);
				})}

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

type PointProps = { markerId: string };
type ClusterProps = object;
