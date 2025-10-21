'use client';

import { useState } from 'react';
import { Contacts } from './Contacts';
import { ContactsSwitch, type ContactsViewMode } from './ContactsSwitch';

export function ContactsClient() {
	const [mode, setMode] = useState<ContactsViewMode>('list');

	return (
		<>
			<ContactsSwitch active={mode} onChange={setMode} />
			<Contacts mode={mode} />
		</>
	);
}