import { useEffect } from 'react'

export function useHtmlScrollLock(enabled: boolean) {
	useEffect(() => {
		const root = document.documentElement

		if (enabled) {
			const count = Number(root.dataset.scrollLockCount || '0') + 1
			root.dataset.scrollLockCount = String(count)

			// When first lock is requested, capture scroll position and apply CSS variable
			if (count === 1) {
				const y = window.scrollY || window.pageYOffset || 0
				root.style.setProperty('--lock-scroll-y', `-${y}px`)
				root.dataset.scrollLockY = String(y)
			}

			root.classList.add('lock')
		}

		return () => {
			if (!enabled) return

			const c = Number(root.dataset.scrollLockCount || '1') - 1
			if (c <= 0) {
				// Remove lock and restore scroll
				root.classList.remove('lock')
				const y = Number(root.dataset.scrollLockY || '0')
				root.style.removeProperty('--lock-scroll-y')
				delete root.dataset.scrollLockCount
				delete root.dataset.scrollLockY
				window.scrollTo({ top: y, left: 0, behavior: 'auto' })
			} else {
				root.dataset.scrollLockCount = String(c)
			}
		}
	}, [enabled])
}
