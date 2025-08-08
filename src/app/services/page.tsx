import type { Metadata } from 'next';

import { serviceService } from '@/services/service.service';

export const metadata: Metadata = {
	title: 'Услуги',
	description: 'Услуги ПКК'
};

export default async function ServicesPage() {
	const { data } = await serviceService.getAll();

	return (
		<div>
			<h1>Услуги</h1>
			{/* {data.data.map(service => (
				<div key={service.id}>
					<h2>{service.title}</h2>
					<p>{service.description}</p>
				</div>
			))} */}
		</div>
	);
}
