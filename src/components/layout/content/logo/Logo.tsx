import Image from 'next/image';

export function Logo() {
	return (
		<span className='shrink-0 block h-9 w-9 lg:h-12 md:w-12 relative'>
			<Image
				src={'/logo.svg'}
				alt={'logo'}
				fill
			/>
		</span>
	);
}
