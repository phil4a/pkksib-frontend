import type { Metadata } from 'next';
import Image from 'next/image';

import { objectService } from '@/services/object.service';

export const metadata: Metadata = {
	title: 'Объекты ПКК',
	description: 'Объекты ПКК'
};

export default async function ObjectsPage() {
	const { data } = await objectService.getAll();
	const objects = data.data;

	return (
		<div>
			<h1>Объекты ПКК</h1>
			<div>
				{objects.map(object => (
					<div key={object.id}>
						<h2>{object.title}</h2>
						<p>{object.time}</p>
						<p>{object.area}</p>
						<p>{object.location}</p>
						<div>
							{object.photos.map(
								photo =>
									photo.formats.small && (
										<Image
											width={600}
											height={200}
											key={photo.id}
											src={photo.formats.large?.url || ''}
											alt={photo.alternativeText || ''}
										/>
									)
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
