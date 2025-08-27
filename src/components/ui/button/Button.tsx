interface Props {
	children: React.ReactNode;
}

export function Button({ children }: Props) {
	return (
		<button className='bg-accent hover:brightness-95 font-semibold h-12 px-6 rounded-lg cursor-pointer transition'>
			{children}
		</button>
	);
}
