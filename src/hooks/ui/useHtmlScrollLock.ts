'use client';

import { useEffect } from 'react';

/**
 * Toggles `html.lock` class with a ref-count, so multiple overlays/modals
 * can safely request scroll lock without stepping on each other.
 */
export function useHtmlScrollLock(enabled: boolean) {
	useEffect(() => {
		const root = document.documentElement;

		if (enabled) {
			const count = Number(root.dataset.scrollLockCount || '0') + 1;
			root.dataset.scrollLockCount = String(count);
			root.classList.add('lock');
		}

		return () => {
			if (enabled) {
				const c = Number(root.dataset.scrollLockCount || '1') - 1;
				if (c <= 0) {
					root.classList.remove('lock');
					delete root.dataset.scrollLockCount;
				} else {
					root.dataset.scrollLockCount = String(c);
				}
			}
		};
	}, [enabled]);
}
