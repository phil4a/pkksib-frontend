import qs from 'qs';

import { PAGE } from '@/config/pages';

import { axiosClassic } from '@/api/axios';

import type { IObject, IObjectMarker } from '@/types/object.types';

interface IObjectResponse {
	data: IObject[];
}

interface ISingleObjectResponse {
	data: IObject;
}

class ObjectService {
	constructor() {}
	private _objects = PAGE.OBJECTS;

	getAll(limit?: number) {
		const query: Record<string, unknown> = {
			populate: {
				photos: true,
				object_categories: true,
				services: true,
				location: true
			}
		};

		if (typeof limit === 'number' && limit > 0) {
			query.sort = ['updatedAt:desc'];
			query.pagination = { page: 1, pageSize: limit };
		}

		const objectsQuery = qs.stringify(query);
		return axiosClassic.get<IObjectResponse>(`${this._objects}?${objectsQuery}`);
	}

	async getByServiceCategorySlug(slug: string, limit: number = 10) {
		const query = qs.stringify(
			{
				populate: ['photos', 'object_categories', 'services', 'service_categories'],
				filters: {
					service_categories: {
						slug: { $eq: slug }
					}
				},
				sort: ['createdAt:desc'],
				pagination: { page: 1, pageSize: limit }
			},
			{ encodeValuesOnly: true }
		);

		return axiosClassic.get<IObjectResponse>(`${this._objects}?${query}`);
	}

	async getBySlug(slug: string): Promise<ISingleObjectResponse> {
		const objectQuery = qs.stringify({
			populate: {
				photos: true,
				object_categories: true,
				services: true,
				location: true,
				seo: true
			},
			filters: {
				slug: {
					$eq: slug
				}
			}
		});

		const response = await axiosClassic.get<IObjectResponse>(`${this._objects}?${objectQuery}`);

		return {
			data: response.data.data[0]
		};
	}

	async getObjectMarkers(): Promise<IObjectMarker[]> {
		const objectsQuery = qs.stringify({
			populate: {
				location: true,
				photos: true
			},
			fields: ['id', 'slug', 'title', 'area', 'time', 'short_description']
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
					short_description: obj.short_description,
					firstPhoto: obj.photos && obj.photos.length > 0 ? obj.photos[0] : undefined
				};
			});
	}

	async getRelated(params: { categorySlug?: string; excludeSlug: string; limit?: number }) {
		const { categorySlug, excludeSlug, limit = 6 } = params;

		const query = qs.stringify(
			{
				populate: ['photos', 'object_categories'],
				filters: {
					...(categorySlug ? { object_categories: { slug: { $eq: categorySlug } } } : {}),
					slug: { $ne: excludeSlug }
				},
				sort: ['createdAt:desc'],
				pagination: { page: 1, pageSize: limit }
			},
			{ encodeValuesOnly: true }
		);

		return axiosClassic.get(`${this._objects}?${query}`);
	}
}

export const objectService = new ObjectService();
