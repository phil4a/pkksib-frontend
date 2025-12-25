import { axiosClassic } from '@/api/axios';

import type { IDirectorForm, IOrderForm } from '@/types/form.types';

interface IFormResponse {
	data: IOrderForm[] | IDirectorForm[];
}

class FormService {
	constructor() {}
	private _FORM = '/order-forms';
	private _DIRECTOR = '/director-mails'; // Hypothetical endpoint

	async send(data: IOrderForm) {
		return axiosClassic.post<IFormResponse>(`${this._FORM}`, { data });
	}

	async sendDirector(data: IDirectorForm) {
		return axiosClassic.post<IFormResponse>(`${this._DIRECTOR}`, { data });
	}
}

export const formService = new FormService();
