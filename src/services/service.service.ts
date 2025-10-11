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
			populate: '*'
		});
		return axiosClassic.get<IServiceResponse>(`${this._services}?${servicesQuery}`);
	}

	async getBySlug(slug: string) {
		const serviceQuery = qs.stringify({
			populate: '*',
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
			populate: '*'
		});
		return axiosClassic.get<IServiceCategoryResponse>(
			`${this._serviceCategories}?${serviceCategoriesQuery}`
		);
	}

	async getCategoryBySlug(slug: string) {
		const serviceCategoriesQuery = qs.stringify({
			populate: '*',
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
