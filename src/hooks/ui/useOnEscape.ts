'use client';

import { useEffect } from 'react';

export function useOnEscape(enabled: boolean, onEscape: () => void) {
	useEffect(() => {
		if (!enabled) return;
		const handler = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onEscape();
		};
		document.addEventListener('keydown', handler);
		return () => document.removeEventListener('keydown', handler);
	}, [enabled, onEscape]);
}
