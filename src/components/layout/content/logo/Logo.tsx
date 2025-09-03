import Image from 'next/image';
import Link from 'next/link';

export function Logo() {
	return (
		<Link
			href='/'
			className='grow-0 shrink-0 h-12 w-12 relative'
		>
			<Image
				src={'/logo.svg'}
				alt={'logo'}
				fill
			></Image>
		</Link>
	);
}
