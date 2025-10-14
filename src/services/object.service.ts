import qs from 'qs';

import { API_PATHS } from '@/config/api.config';

import { axiosClassic } from '@/api/axios';

import type {
	IObject,
	IObjectCategoryResponse,
	IObjectLocation,
	IObjectMarker,
	IObjectResponse
} from '@/types/object.types';

// Typed filter helpers for Strapi queries
interface SlugFilter {
	$in?: string[];
	$eq?: string;
}
interface NameFilter {
	$in?: string[];
	$eq?: string;
}
interface ObjectFilters {
	object_categories?: { slug: SlugFilter };
	location?: { location: NameFilter };
	slug?: { $eq?: string; $ne?: string };
	service_categories?: { slug: { $eq: string } };
}

class ObjectService {
	constructor() {}
	private _objects = API_PATHS.OBJECTS;
	private _objectCategories = API_PATHS.OBJECT_CATEGORIES;

	getAll(params?: {
		page?: number;
		pageSize?: number;
		categorySlugs?: string[];
		locations?: string[];
	}) {
		const { page = 1, pageSize = 10, categorySlugs, locations } = params || {};
		const filters: ObjectFilters = {};
		if (categorySlugs?.length) {
			filters.object_categories = { slug: { $in: categorySlugs } };
		}
		if (locations?.length) {
			filters.location = { location: { $in: locations } };
		}

		const query = {
			populate: {
				photos: true,
				object_categories: true,
				services: true,
				location: true
			},
			sort: ['updatedAt:desc'],
			pagination: { page, pageSize },
			filters
		};

		const objectsQuery = qs.stringify(query as Record<string, unknown>, { encodeValuesOnly: true });
		return axiosClassic.get<IObjectResponse>(`${this._objects}?${objectsQuery}`);
	}

	async getCategories() {
		const q = qs.stringify({ populate: '*', sort: ['updatedAt:asc'] });
		return axiosClassic.get<IObjectCategoryResponse>(`${this._objectCategories}?${q}`);
	}

	async getUniqueLocations(): Promise<IObjectLocation[]> {
		const unique = new Map<number, IObjectLocation>();
		let page = 1;
		const pageSize = 200;

		while (true) {
			const q = qs.stringify(
				{
					populate: { location: true },
					fields: ['id'],
					pagination: { page, pageSize }
				},
				{ encodeValuesOnly: true }
			);
			const res = await axiosClassic.get<IObjectResponse>(`${this._objects}?${q}`);
			res.data.data.forEach(obj => {
				if (obj.location) unique.set(obj.location.id, obj.location);
			});
			const pageCount = res.data.meta?.pagination?.pageCount ?? 1;
			if (page >= pageCount) break;
			page += 1;
		}

		return Array.from(unique.values());
	}

	async getByServiceCategorySlug(slug: string, limit: number = 10) {
		const filters: ObjectFilters = { service_categories: { slug: { $eq: slug } } };
		const query = qs.stringify(
			{
				populate: ['photos', 'object_categories', 'services', 'service_categories'],
				filters,
				sort: ['createdAt:desc'],
				pagination: { page: 1, pageSize: limit }
			},
			{ encodeValuesOnly: true }
		);

		return axiosClassic.get<IObjectResponse>(`${this._objects}?${query}`);
	}

	async getBySlug(slug: string) {
		const filters: ObjectFilters = { slug: { $eq: slug } };
		const objectQuery = qs.stringify({
			populate: {
				photos: true,
				object_categories: true,
				services: true,
				location: true,
				seo: true
			},
			filters
		});

		const response = await axiosClassic.get<IObjectResponse>(`${this._objects}?${objectQuery}`);
		return { data: response.data.data[0] } as { data: IObject };
	}

	async getObjectMarkers(): Promise<IObjectMarker[]> {
		const objectsQuery = qs.stringify({
			populate: { location: true, photos: true },
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

		const filters: ObjectFilters = {};
		if (categorySlug) {
			filters.object_categories = { slug: { $eq: categorySlug } };
		}
		filters.slug = { $ne: excludeSlug };

		const query = qs.stringify(
			{
				populate: ['photos', 'object_categories'],
				filters,
				sort: ['createdAt:desc'],
				pagination: { page: 1, pageSize: limit }
			},
			{ encodeValuesOnly: true }
		);

		return axiosClassic.get<IObjectResponse>(`${this._objects}?${query}`);
	}
}

export const objectService = new ObjectService();
