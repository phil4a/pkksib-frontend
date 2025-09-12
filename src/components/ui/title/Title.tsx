import { cn } from '@/lib/utils';

interface Props {
	children: React.ReactNode;
	type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
	position?: 'left' | 'center';
	className?: string;
}

export function Title({ children, type, position = 'left', className }: Props) {
	const Tag = type;
	return (
		<Tag
			style={{ textAlign: position }}
			className={cn('text-4xl font-semibold mb-3', className)}
		>
			{children}
		</Tag>
	);
}
