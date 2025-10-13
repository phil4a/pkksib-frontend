import type { CSSProperties } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props {
	count?: number;
	style?: CSSProperties;
	className?: string;
}

export function SkeletonLoader({ count = 1, style, className = '' }: Props) {
	return (
		<>
			{Array.from({ length: count }).map((_, index) => (
				<div
					key={index}
					className={twMerge('bg-light-gray rounded-sm h-10 animate-pulse', className)}
					style={style}
				/>
			))}
		</>
	);
}
