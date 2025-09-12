import Image from 'next/image';

interface Props {
	title: string;
	number: number;
	units: string;
	icon: string;
}

export function HeroBullet({ title, number, units, icon }: Props) {
	return (
		<div className='bg-light-gray rounded-xl p-6 pt-5 flex flex-col justify-between items-start h-[240px] group'>
			<div className='flex items-center justify-center bg-white/30 border-[0.8px] border-white/50 rounded-md w-8 h-8'>
				<Image
					width={17}
					height={17}
					src={icon}
					alt={title}
					style={{ width: 'auto', height: 'auto' }}
				/>
			</div>
			<div>
				<p className='font-semibold text-4xl mb-2 transition-transform duration-300 ease-out group-hover:scale-110 origin-left will-change-transform backface-visibility-hidden transform-gpu'>
					{number} {units}
				</p>
				<p className='text-dark-gray'>{title}</p>
			</div>
		</div>
	);
}
