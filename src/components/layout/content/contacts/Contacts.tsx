import Link from 'next/link';

import ContactsMap from './ContactsMap';

export function Contacts() {
	return (
		<div className='flex gap-5 my-8'>
			<div className='flex-1/3'>
				<ul className='flex flex-col gap-5'>
					<li className='p-8 border-1 border-light-gray rounded-lg'>
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
							<span className='text-white font-semibold'>Новосибирск</span>
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
								ТЦ Большая Медведица
							</span>
							<p>
								<span itemProp='postalCode'>630047</span>,{' '}
								<span itemProp='addressLocality'>г. Новосибирск</span>,{' '}
								<span itemProp='streetAddress'>ул. Красный проспект 218/1</span> офис 1
							</p>
							<Link
								href='tel:+73832866444'
								className='font-semibold text-[22px] py-2'
								itemProp='telephone'
							>
								+7 (383) 286-64-44
							</Link>
							<p>Ежедневно 10:00-20:00</p>
						</div>
					</li>
					<li className='p-8 border-1 border-light-gray rounded-lg'>
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
							<span className='text-white font-semibold'>Бердск</span>
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
								Торговый дом Форум
							</span>
							<p>
								<span itemProp='postalCode'>633010</span>,{' '}
								<span itemProp='addressLocality'>г. Бердск</span>,{' '}
								<span itemProp='streetAddress'>ул М.Горького, д. 4А, 4 этаж</span> офис 410
							</p>
							<Link
								href='tel:+79830036555'
								className='font-semibold text-[22px] py-2'
								itemProp='telephone'
							>
								+7 (983) 003-65-55
							</Link>
							<p>Ежедневно 10:00-20:00</p>
						</div>
					</li>
				</ul>
			</div>
			<div className='flex-2/3'>
				<ContactsMap />
			</div>
		</div>
	);
}
