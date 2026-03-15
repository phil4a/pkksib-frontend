import qs from 'qs';

import { API_PATHS } from '@/config/api.config';

import { axiosClassic } from '@/api/axios';

import type { IServiceCategoryResponse, IServiceResponse } from '@/types/service.types';

class ServiceService {
	constructor() {}
	private _services = API_PATHS.SERVICES;
	private _serviceCategories = API_PATHS.SERVICE_CATEGORIES;

	async getAll() {
		const servicesQuery = qs.stringify({
			populate: '*',
			sort: ['sortOrder:asc']
		});
		return axiosClassic.get<IServiceResponse>(`${this._services}?${servicesQuery}`);
	}

	async getBySlug(slug: string) {
		const serviceQuery = qs.stringify({
			populate: {
				image: true,
				service_category: true,
				objects: {
					populate: ['photos']
				},
				seo: true
			},
			filters: {
				slug: {
					$eq: slug
				}
			}
		});

		return axiosClassic.get<IServiceResponse>(`${this._services}?${serviceQuery}`);
	}

	async getCategories() {
		const serviceCategoriesQuery = qs.stringify({
			sort: ['sortOrder:asc'],
			populate: {
				image: true,
				seo: true,
				services: {
					fields: ['id', 'slug', 'title', 'price', 'units', 'sortOrder'],
					sort: ['sortOrder:asc']
				}
			}
		});
		return axiosClassic.get<IServiceCategoryResponse>(
			`${this._serviceCategories}?${serviceCategoriesQuery}`
		);
	}

	async getCategoryBySlug(slug: string) {
		const serviceCategoriesQuery = qs.stringify({
			populate: {
				image: true,
				seo: true,
				services: {
					fields: ['id', 'slug', 'title', 'price', 'units', 'sortOrder'],
					sort: ['sortOrder:asc']
				}
			},
			filters: {
				slug: {
					$eq: slug
				}
			}
		});
		return axiosClassic.get<IServiceCategoryResponse>(
			`${this._serviceCategories}?${serviceCategoriesQuery}`
		);
	}

	async getServicesByCategorySlug(slug: string) {
		const servicesQuery = qs.stringify({
			populate: '*',
			sort: ['sortOrder:asc'],
			filters: {
				service_category: {
					slug: {
						$eq: slug
					}
				}
			}
		});
		return axiosClassic.get<IServiceResponse>(`${this._services}?${servicesQuery}`);
	}

	async getFooterServices() {
		const servicesQuery = qs.stringify({
			fields: ['id', 'slug', 'title'],
			sort: ['sortOrder:asc'],
			filters: {
				isShowedInFooter: {
					$eq: true
				}
			}
		});
		return axiosClassic.get<IServiceResponse>(`${this._services}?${servicesQuery}`);
	}
}

export const serviceService = new ServiceService();
