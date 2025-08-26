import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';

interface Props {
	className?: string;
	href: string;
	iconLink?: string;
	iconAlt?: string;
	secondary?: boolean;
	children: React.ReactNode;
}

export function HeaderLink({
	href,
	iconLink,
	iconAlt = 'иконка для ссылки',
	secondary,
	children,
	className
}: Props) {
	return (
		<Link
			className={cn(
				'flex items-center gap-2 hover:text-primary transition',
				secondary && 'text-dark-gray',
				className
			)}
			href={href}
		>
			{iconLink && (
				<Image
					src={iconLink}
					alt={iconAlt}
					width={16}
					height={16}
				/>
			)}
			{children}
		</Link>
	);
}
