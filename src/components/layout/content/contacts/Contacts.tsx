'use client';

import { useState } from 'react';
import ContactsMap from './ContactsMap';
import ContactCard from './ContactCard';
import { CONTACT_MARKERS } from '@/constants/contact-markers';

export function Contacts() {
	const [selectedMarkerId, setSelectedMarkerId] = useState<number | null>(null);

	return (
		<div className='flex gap-5 my-8'>
			<div className='flex-1/3'>
				<ul className='flex flex-col gap-5'>
					{CONTACT_MARKERS.map((contact) => (
						<ContactCard key={contact.id} contact={contact} onSelect={(id) => setSelectedMarkerId(id)} />
					))}
				</ul>
			</div>
			<div className='flex-2/3'>
				<ContactsMap selectedMarkerId={selectedMarkerId ?? undefined} />
			</div>
		</div>
	);
}
