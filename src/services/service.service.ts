import qs from 'qs';

import { PAGE } from '@/config/pages';

import { axiosInternal } from '@/api/axios';

import type { IServiceResponse } from '@/types/service.types';

class ServiceService {
	constructor() {}
	private _services = PAGE.SERVICES;
	getAll() {
		const servicesQuery = qs.stringify({
			populate: '*'
		});
		return axiosInternal.get<IServiceResponse>(`${this._services}?${servicesQuery}`);
	}
}

export const serviceService = new ServiceService();
