'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

import { CONTACT_MARKERS } from '@/constants/contact-markers';

import ContactCard from './ContactCard';
import ContactsMap from './ContactsMap';
import type { ContactsViewMode } from './ContactsSwitch';

interface ContactsProps {
	mode?: ContactsViewMode // 'list' | 'map' — mobile only
}

export function Contacts({ mode = 'list' }: ContactsProps) {
	const [selectedMarkerId, setSelectedMarkerId] = useState<number | null>(null);

	return (
		<>
			{/* Desktop: show list and map side by side */}
			<div className='hidden md:flex gap-5 mb-8 mt-4'>
				<div className='flex-1/3'>
					<ul className='flex flex-col gap-5'>
						{CONTACT_MARKERS.map(contact => (
							<ContactCard
								key={contact.id}
								contact={contact}
								onSelect={id => setSelectedMarkerId(id)}
								isSelected={selectedMarkerId === contact.id}
							/>
						))}
					</ul>
				</div>
				<div className='flex-2/3'>
					<ContactsMap
						selectedMarkerId={selectedMarkerId ?? undefined}
						onMarkerSelect={id => setSelectedMarkerId(id)}
					/>
				</div>
			</div>

			{/* Mobile: show either list or map based on switch */}
			<div className='md:hidden mb-8 mt-4'>
				{/* List view */}
				<div className={cn(mode === 'list' ? 'block' : 'hidden')}>
					<ul className='flex flex-col gap-5'>
						{CONTACT_MARKERS.map(contact => (
							<ContactCard
								key={contact.id}
								contact={contact}
								onSelect={id => setSelectedMarkerId(id)}
								isSelected={selectedMarkerId === contact.id}
							/>
						))}
					</ul>
				</div>

				{/* Map view */}
				<div className={cn(mode === 'map' ? 'block' : 'hidden')}>
					<ContactsMap
						selectedMarkerId={selectedMarkerId ?? undefined}
						onMarkerSelect={id => setSelectedMarkerId(id)}
					/>
				</div>
			</div>
		</>
	);
}
