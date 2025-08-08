import qs from 'qs';

import { PAGE } from '@/config/pages';

import { axiosClassic } from '@/api/axios';

import type { IObject } from '@/types/object.types';

interface IObjectResponse {
	objects: IObject[];
}

class ObjectService {
	constructor() {}
	private _objects = PAGE.OBJECTS;
	getAll() {
		const objectsQuery = qs.stringify({
			populate: {
				photos: true
			}
		});
		return axiosClassic.get<IObjectResponse>(`${this._objects}?${objectsQuery}`);
	}
}

export const objectService = new ObjectService();
