'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

import { objectService } from '@/services/object.service';

export function ObjectsList() {
	const { data, isLoading, error } = useQuery({
		queryKey: ['objects'],
		queryFn: () => objectService.getAll()
	});

	const objects = data?.data?.data;

	if (error) {
		return <div>Ошибка получения объектов</div>;
	}

	return (
		<div>
			{isLoading ? (
				<div>Loading</div>
			) : objects?.length ? (
				objects?.map(object => (
					<div key={object.id}>
						<h2>{object.title}</h2>
						<div>
							{object.photos.map(
								photo =>
									photo.formats.large && (
										<Image
											priority
											key={photo.id}
											width={900}
											height={500}
											src={photo.formats.large?.url}
											alt={photo.alternativeText || ''}
										/>
									)
							)}
						</div>
					</div>
				))
			) : (
				<p>Объекты не найдены</p>
			)}
		</div>
	);
}
