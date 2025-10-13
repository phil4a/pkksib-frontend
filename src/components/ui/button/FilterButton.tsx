import type { ButtonHTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

interface Props extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
	children: React.ReactNode;
	type: 'checked' | 'unchecked';
	className?: string;
	isLoading?: boolean;
}

export function FilterButton({
	children,
	className,
	type,
	isLoading,
	disabled: disabledProp,
	...props
}: Props) {
	const isDisabled = !!isLoading || !!disabledProp;

	const styles = cn(
		'inline-flex items-center h-10.5 px-6 rounded-[30px] border-1 border-light-gray cursor-pointer transition ',
		type === 'checked' ? 'bg-primary text-white' : 'bg-transparent text-primary',
		isDisabled ? 'cursor-not-allowed' : 'cursor-pointer hover:brightness-95',
		'disabled:bg-gray-300',
		className
	);

	return (
		<button
			className={styles}
			disabled={isDisabled}
			{...props}
		>
			{isLoading ? 'Отправка...' : children}
		</button>
	);
}
