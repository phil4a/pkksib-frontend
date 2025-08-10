import type { IObject } from './object.types';

export interface IService {
	id: number;
	documentId: string;
	title: string;
	slug: string;
	price: number;
	description: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	objects: IObject[];
}

export interface IServiceResponse {
	data: IService[];
	meta: {
		pagination: {
			page: number;
			pageSize: number;
			pageCount: number;
			total: number;
		};
	};
}
