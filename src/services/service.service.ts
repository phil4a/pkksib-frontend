import qs from 'qs';

import { PAGE } from '@/config/pages';

import { axiosClassic } from '@/api/axios';

class ServiceService {
	constructor() {}
	private _services = PAGE.SERVICES;
	getAll() {
		const servicesQuery = qs.stringify({
			populate: '*'
		});
		return axiosClassic.get(`${this._services}?${servicesQuery}`);
	}
}

export const serviceService = new ServiceService();
