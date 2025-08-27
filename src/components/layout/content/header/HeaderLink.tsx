import Link from 'next/link';

import { cn } from '@/lib/utils';

interface Props {
	className?: string;
	href: string;
	secondary?: boolean;
	children: React.ReactNode;
}

export function HeaderLink({ href, secondary, children, className }: Props) {
	return (
		<Link
			className={cn(
				'flex items-center gap-2 hover:text-primary transition',
				secondary && 'text-dark-gray',
				className
			)}
			href={href}
		>
			{children}
		</Link>
	);
}
