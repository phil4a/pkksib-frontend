import qs from 'qs';

import { PAGE } from '@/config/pages';

import { axiosClassic } from '@/api/axios';

import type { IServiceResponse } from '@/types/service.types';

class ServiceService {
	constructor() {}
	private _services = PAGE.SERVICES;
	getAll() {
		const servicesQuery = qs.stringify({
			populate: '*'
		});
		return axiosClassic.get<IServiceResponse>(`${this._services}?${servicesQuery}`);
	}
}

export const serviceService = new ServiceService();
