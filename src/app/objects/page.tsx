import type { Metadata } from 'next';

import { ObjectsList } from '@/components/layout/objects/ObjectsList';

export const metadata: Metadata = {
	title: 'Объекты ПКК',
	description: 'Объекты ПКК'
};

export default async function ObjectsPage() {
	return (
		<div>
			<h1>Объекты ПКК</h1>
			<div>
				<ObjectsList />
			</div>
		</div>
	);
}
