import { axiosClassic } from '@/api/axios';

import type { IOrderForm } from '@/types/form.types';

interface IFormResponse {
	data: IOrderForm[];
}

class FormService {
	constructor() {}
	private _FORM = '/order-forms';
	async send(data: IOrderForm) {
		return axiosClassic.post<IFormResponse>(`${this._FORM}`, { data });
	}
}

export const formService = new FormService();
