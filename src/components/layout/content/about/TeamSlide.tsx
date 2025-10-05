import Image, { type StaticImageData } from 'next/image';

interface Props {
	name: string;
	position: string;
	image: string | StaticImageData;
}

export function TeamSlide({ name, position, image }: Props) {
	return (
		<div className='rounded-xl flex-1/4'>
			<div className='relative aspect-square rounded-lg bg-[radial-gradient(50%_50%_at_50%_50%,_#F8F8F8,_#DCDCDC_100%)] '>
				<Image
					src={image}
					alt={name}
					fill
					className='object-cover'
				/>
			</div>
			<div className='pt-4 px-2'>
				<p className='text-[22px] font-semibold pb-2'>{name}</p>
				<p className='text-dark-gray'>{position}</p>
			</div>
		</div>
	);
}
