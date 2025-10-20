'use client';

import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import { useCloseOnRouteChange } from '@/hooks/navigation/useCloseOnRouteChange';
import { useHtmlScrollLock } from '@/hooks/ui/useHtmlScrollLock';
import { useOnEscape } from '@/hooks/ui/useOnEscape';

import { ObjectsFilters } from './ObjectsFilters';

interface MobileFiltersDrawerProps {
	open: boolean;
	onClose: () => void;
}

export function MobileFiltersDrawer({ open, onClose }: MobileFiltersDrawerProps) {
	useHtmlScrollLock(open);
	useOnEscape(open, onClose);
	useCloseOnRouteChange(open, onClose);

	const closeBtnRef = useRef<HTMLButtonElement | null>(null);
	const prevFocusRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		if (open) {
			prevFocusRef.current = document.activeElement as HTMLElement | null;
			requestAnimationFrame(() => {
				closeBtnRef.current?.focus();
			});
		}
		return () => {
			prevFocusRef.current?.focus?.();
		};
	}, [open]);

	if (!open) return null;

	return createPortal(
		<div
			role='dialog'
			aria-modal='true'
			aria-labelledby='mobile-filters-title'
			className='fixed inset-0 z-50 md:hidden'
		>
			{/* Подложка */}
			<button
				type='button'
				aria-label='Закрыть фильтры'
				onClick={onClose}
				className='absolute inset-0 bg-black/40 backdrop-blur-[1px]'
				tabIndex={-1}
			/>

			<div className='absolute inset-y-0 left-0 h-full w-screen bg-white shadow-xl transition-transform duration-300 ease-out'>
				<div className='flex items-center justify-between p-6 py-5'>
					<h2
						id='mobile-filters-title'
						className='text-lg font-semibold'
					>
						Фильтры
					</h2>
					<button
						ref={closeBtnRef}
						type='button'
						onClick={onClose}
						className='inline-flex items-center font-medium focus:outline-none'
					>
						<X className='h-6 w-6' />
					</button>
				</div>

				{/* Содержимое с вертикальной прокруткой */}
				<div className='h-[calc(100%-3.5rem)] overflow-y-auto p-6 pt-1.5'>
					<ObjectsFilters onApplied={onClose} />
				</div>
			</div>
		</div>,
		document.body
	);
}
