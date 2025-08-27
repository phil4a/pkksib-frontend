import Image from 'next/image';
import Link from 'next/link';

export function Logo() {
	return (
		<Link
			href='/'
			className='grow-0 shrink-0'
		>
			<Image
				src={'/logo.png'}
				alt={'logo'}
				width={270}
				height={65}
			></Image>
		</Link>
	);
}
