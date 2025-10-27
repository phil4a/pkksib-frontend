'use client';

import { OverlayView } from '@react-google-maps/api';
import React from 'react';

interface ClusterMarkerProps {
	position: google.maps.LatLngLiteral;
	count: number;
	onClick?: () => void;
}

export default function ClusterMarker({ position, count, onClick }: ClusterMarkerProps) {
	return (
		<OverlayView
			position={position}
			mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
		>
			<button
				onClick={onClick}
				style={{
					cursor: 'pointer',
					border: 'none',
					background: 'transparent'
				}}
				aria-label={`Кластер из ${count} объектов`}
			>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						width: 42,
						height: 42,
						borderRadius: '50%',
						background: 'var(--primary)',
						color: 'var(--accent)',
						boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
						border: '3px solid var(--dark-gray)', // border to accent clusters
						fontWeight: 600,
						fontSize: 16,
						userSelect: 'none'
					}}
				>
					{count}
				</div>
			</button>
		</OverlayView>
	);
}
