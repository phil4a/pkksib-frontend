'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

import { objectService } from '@/services/object.service';

export function ObjectsList() {
	const { data, isLoading } = useQuery({
		queryKey: ['objects'],
		queryFn: () => objectService.getAll()
	});
	return (
		<div>
			{isLoading ? (
				<div>Loading</div>
			) : data?.data.objects.length ? (
				data.data.objects.map(object => (
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
				))
			) : (
				<p>Explore are temporarily unavailable</p>
			)}
		</div>
	);
}
