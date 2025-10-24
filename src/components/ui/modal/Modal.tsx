'use client';

import { X } from 'lucide-react';
import { useCallback, useEffect } from 'react';

interface ModalProps {
	open: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

export function Modal({ open, onClose, children }: ModalProps) {
	const onKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		},
		[onClose]
	);

	useEffect(() => {
		if (!open) return;
		document.addEventListener('keydown', onKeyDown);
		document.body.style.overflow = 'hidden';
		return () => {
			document.removeEventListener('keydown', onKeyDown);
			document.body.style.overflow = '';
		};
	}, [open, onKeyDown]);

	if (!open) return null;

	return (
		<div className='fixed inset-0 z-[1000] flex items-center justify-center'>
			<div
				className='absolute inset-0 bg-black/50'
				onClick={onClose}
				aria-label='Закрыть модальное окно'
			/>
			<div className='relative bg-primary rounded-xl shadow-xl max-w-[600px] w-[92%] md:w-[80%] p-6 md:p-8'>
				<button
					type='button'
					onClick={onClose}
					aria-label='Закрыть'
					className='absolute cursor-pointer top-3 right-3 inline-flex items-center justify-center size-8 rounded-md hover:bg-white'
				>
					<span className='sr-only'>Закрыть</span>
					<X className='size-6 text-white' />
				</button>
				{children}
			</div>
		</div>
	);
}
