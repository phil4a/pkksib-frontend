import qs from 'qs';

import { PAGE } from '@/config/pages';

import { axiosClassic } from '@/api/axios';

import type { IObject, IObjectMarker } from '@/types/object.types';

interface IObjectResponse {
	data: IObject[];
}

class ObjectService {
	constructor() {}
	private _objects = PAGE.OBJECTS;

	getAll() {
		const objectsQuery = qs.stringify({
			populate: {
				photos: true,
				object_categories: true,
				services: true,
				location: true
			}
		});
		return axiosClassic.get<IObjectResponse>(`${this._objects}?${objectsQuery}`);
	}

	async getObjectMarkers(): Promise<IObjectMarker[]> {
		const objectsQuery = qs.stringify({
			populate: {
				location: true,
				photos: true
			},
			fields: ['id', 'slug', 'title', 'area', 'time', 'description']
		});

		const response = await axiosClassic.get<IObjectResponse>(`${this._objects}?${objectsQuery}`);

		return response.data.data
			.filter(obj => obj.location && obj.location.coordinates)
			.map(obj => {
				const [lat, lng] = obj.location.coordinates
					.split(',')
					.map(coord => parseFloat(coord.trim()));
				return {
					id: obj.id,
					title: obj.title,
					slug: obj.slug,
					coordinates: { lat, lng },
					isCommercial: obj.location.isCommercial,
					area: obj.area,
					time: obj.time,
					description: obj.description,
					firstPhoto: obj.photos && obj.photos.length > 0 ? obj.photos[0] : undefined
				};
			});
	}
}

export const objectService = new ObjectService();
