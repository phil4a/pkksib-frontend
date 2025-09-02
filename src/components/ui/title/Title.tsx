interface Props {
	children: React.ReactNode;
	type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
	position?: 'left' | 'center';
}

export function Title({ children, type, position = 'left' }: Props) {
	const Tag = type;
	return (
		<Tag
			style={{ textAlign: position }}
			className='text-4xl font-semibold mb-3'
		>
			{children}
		</Tag>
	);
}
