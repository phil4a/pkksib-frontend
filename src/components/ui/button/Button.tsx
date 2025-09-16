import Link from 'next/link';

import { cn } from '@/lib/utils';

interface Props {
	href?: string;
	children: React.ReactNode;
	type: 'accent' | 'black';
	className?: string;
	isLoading?: boolean;
}

export function Button({ children, className, type, href, isLoading, ...props }: Props) {
	const styles = cn(
		'inline-flex items-center bg-accent hover:brightness-95 font-semibold h-12 px-6 rounded-lg cursor-pointer disabled:bg-gray-300 transition',
		type === 'black' && 'bg-primary text-white',
		className
	);

	if (href) {
		return (
			<Link
				href={href}
				className={styles}
			>
				{children}
			</Link>
		);
	}

	return (
		<button
			className={styles}
			disabled={isLoading}
			{...props}
		>
			{isLoading ? 'Отправка...' : children}
		</button>
	);
}
