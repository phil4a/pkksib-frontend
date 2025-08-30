interface Props {
	children: React.ReactNode;
	type: 'accent' | 'black';
}

export function Button({ children, type }: Props) {
	return (
		<button
			className={`bg-accent hover:brightness-95 font-semibold h-12 px-6 rounded-lg cursor-pointer transition ${
				type === 'black' ? 'bg-primary text-white' : ''
			}`}
		>
			{children}
		</button>
	);
}
