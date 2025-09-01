import Link from 'next/link';

interface Props {
	href?: string;
	children: React.ReactNode;
	type: 'accent' | 'black';
	className?: string;
}

export function Button({ children, className, type, href }: Props) {
	const styles = `inline-flex items-center bg-accent hover:brightness-95 font-semibold h-12 px-6 rounded-lg cursor-pointer transition ${
		type === 'black' ? 'bg-primary text-white' : ''
	} ${className}`;

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

	return <button className={styles}>{children}</button>;
}
