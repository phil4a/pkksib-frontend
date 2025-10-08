import type { IObjectMarker } from '@/types/object.types';

export const defaultCenter = {
	lat: 55.0415,
	lng: 82.9346
};

export const calculateMarkersCenter = (
	markers: Array<Pick<IObjectMarker, 'coordinates'>>,
	fallback: { lat: number; lng: number } = defaultCenter
) => {
	if (!markers || markers.length === 0) return fallback;

	const totalLat = markers.reduce((sum, marker) => sum + marker.coordinates.lat, 0);
	const totalLng = markers.reduce((sum, marker) => sum + marker.coordinates.lng, 0);

	return {
		lat: totalLat / markers.length,
		lng: totalLng / markers.length
	};
};

export const calculateOptimalZoom = (markers: Array<Pick<IObjectMarker, 'coordinates'>>) => {
	if (!markers || markers.length === 0) return 8;
	if (markers.length === 1) return 12;

	const lats = markers.map(marker => marker.coordinates.lat);
	const lngs = markers.map(marker => marker.coordinates.lng);

	const latRange = Math.max(...lats) - Math.min(...lats);
	const lngRange = Math.max(...lngs) - Math.min(...lngs);
	const maxRange = Math.max(latRange, lngRange);

	if (maxRange > 10) return 5;
	if (maxRange > 5) return 6;
	if (maxRange > 2) return 7;
	if (maxRange > 1) return 8;
	if (maxRange > 0.5) return 9;
	if (maxRange > 0.2) return 10;
	if (maxRange > 0.1) return 11;
	return 12;
};