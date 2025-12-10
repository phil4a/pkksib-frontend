import Link from 'next/link';

import type { IContactMarker } from '@/constants/contact-markers';

interface ContactCardProps {
	contact: IContactMarker;
	onSelect?: (id: number) => void;
	isSelected?: boolean;
}

export default function ContactCard({ contact, onSelect, isSelected }: ContactCardProps) {
	const {
		city,
		title,
		postalCode,
		addressLocality,
		streetAddress,
		telephone,
		telephoneLink,
		schedule
	} = contact;

	return (
		<li
			className={`p-8 border-1 border-light-gray rounded-lg cursor-pointer ${isSelected ? 'bg-light-gray' : ''}`}
			onClick={() => onSelect?.(contact.id)}
		>
			<div className='inline-flex items-center gap-2 py-2 px-4 rounded-[30px] bg-primary'>
				<svg
					width='9'
					height='12'
					viewBox='0 0 9 12'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M4.5 0C5.69334 1.61881e-08 6.83775 0.486197 7.68164 1.35156C8.52552 2.21708 8.99996 3.39121 9 4.61523C9 8.76856 4.50112 11.9992 4.5 12C4.49912 11.9994 0 8.76867 0 4.61523C3.88592e-05 3.39121 0.47448 2.21708 1.31836 1.35156C2.16225 0.486197 3.30666 0 4.5 0ZM4.5 3C3.67157 3 3 3.67157 3 4.5C3 5.32843 3.67157 6 4.5 6C5.32843 6 6 5.32843 6 4.5C6 3.67157 5.32843 3 4.5 3Z'
						fill='#FCD200'
					/>
				</svg>
				<span className='text-white font-semibold'>{city}</span>
			</div>
			<div
				itemProp='address'
				itemScope
				itemType='http://schema.org/PostalAddress'
				className='mt-4'
			>
				<span
					itemProp='name'
					className='pb-1'
				>
					{title}
				</span>
				<p>
					<span itemProp='postalCode'>{postalCode}</span>,{' '}
					<span itemProp='addressLocality'>г. {addressLocality}</span>,{' '}
					<span itemProp='streetAddress'>{streetAddress}</span>
				</p>
				<Link
					href={`tel:${telephoneLink}`}
					className='font-semibold text-[22px] py-2'
					itemProp='telephone'
				>
					{telephone}
				</Link>
				{Array.isArray(schedule) ? (
					<ul className='mt-1 space-y-1'>
						{schedule.map((line, idx) => (
							<li
								key={idx}
								className='flex items-center gap-2'
							>
								<svg
									width='14'
									height='14'
									viewBox='0 0 24 24'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										d='M12 8v5l4 2'
										stroke='#868686'
										strokeWidth='1.6'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
									<path
										d='M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
										stroke='#868686'
										strokeWidth='1.6'
									/>
								</svg>
								<span>{line}</span>
							</li>
						))}
					</ul>
				) : schedule && typeof schedule === 'string' && schedule.includes('\n') ? (
					<ul className='mt-1 space-y-1'>
						{schedule.split(/\r?\n/).map((line, idx) => (
							<li
								key={idx}
								className='flex items-center gap-2'
							>
								<svg
									width='14'
									height='14'
									viewBox='0 0 24 24'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										d='M12 8v5l4 2'
										stroke='#868686'
										strokeWidth='1.6'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
									<path
										d='M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
										stroke='#868686'
										strokeWidth='1.6'
									/>
								</svg>
								<span>{line}</span>
							</li>
						))}
					</ul>
				) : (
					<p>{schedule}</p>
				)}
			</div>
		</li>
	);
}
