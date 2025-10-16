'use client';

import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

type FooterCollapseProps = {
	title: string;
	children: React.ReactNode;
};

export function FooterCollapse({ title, children }: FooterCollapseProps) {
	const [open, setOpen] = useState(false);
	const contentRef = useRef<HTMLDivElement>(null);

	const toggle = () => setOpen(prev => !prev);

	useEffect(() => {
		const el = contentRef.current;
		if (!el) return;

		if (open) {
			// expand: 0 -> scrollHeight, then set to auto
			el.style.height = '0px';
			// force reflow to ensure transition starts from 0
			void el.offsetHeight;
			el.style.height = el.scrollHeight + 'px';
			el.addEventListener(
				'transitionend',
				() => {
					el.style.height = 'auto';
				},
				{ once: true }
			);
		} else {
			// collapse: scrollHeight -> 0
			el.style.height = el.scrollHeight + 'px';
			// force reflow
			void el.offsetHeight;
			el.style.height = '0px';
		}
	}, [open]);

	return (
		<div className='lg:hidden'>
			<button
				type='button'
				className='w-full sm:w-auto list-none cursor-pointer flex items-center justify-between gap-2 font-semibold'
				aria-expanded={open}
				onClick={toggle}
			>
				<span>{title}</span>
				<ChevronDown
					className={cn(
						'size-4 text-dark-gray transition-transform duration-300',
						open && 'rotate-180'
					)}
				/>
			</button>
			<div
				ref={contentRef}
				className={cn(
					'overflow-hidden transition-[height,opacity,transform] duration-300 ease-in-out',
					open ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'
				)}
				style={{ height: 0 }}
			>
				<div className='pt-4 flex flex-col gap-3 pb-2'>{children}</div>
			</div>
		</div>
	);
}
