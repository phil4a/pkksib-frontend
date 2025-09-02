import qs from 'qs';

import { API_PATHS } from '@/config/api.config';

import { axiosClassic } from '@/api/axios';

import type { IServiceCategoryResponse, IServiceResponse } from '@/types/service.types';

// Кешированные функции
export async function getCachedServices() {
	'use cache';
	const servicesQuery = qs.stringify({
		populate: '*'
	});
	const response = await axiosClassic.get<IServiceResponse>(
		`${API_PATHS.SERVICES}?${servicesQuery}`
	);
	return response.data;
}

export async function getCachedServiceCategories() {
	'use cache';
	const serviceCategoriesQuery = qs.stringify({
		populate: '*'
	});
	const response = await axiosClassic.get<IServiceCategoryResponse>(
		`${API_PATHS.SERVICE_CATEGORIES}?${serviceCategoriesQuery}`
	);
	return response.data;
}

// Оригинальный класс для некешированных запросов
class ServiceService {
	constructor() {}
	private _services = API_PATHS.SERVICES;
	private _serviceCategories = API_PATHS.SERVICE_CATEGORIES;

	getAll() {
		const servicesQuery = qs.stringify({
			populate: '*'
		});
		return axiosClassic.get<IServiceResponse>(`${this._services}?${servicesQuery}`);
	}

	getCategories() {
		const serviceCategoriesQuery = qs.stringify({
			populate: '*'
		});
		return axiosClassic.get<IServiceCategoryResponse>(
			`${this._serviceCategories}?${serviceCategoriesQuery}`
		);
	}
}

export const serviceService = new ServiceService();
