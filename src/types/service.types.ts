import type { IObject } from './object.types';
import type { IPhoto } from './photo.types';
import type { IMeta } from './strapi.types';

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
	meta: IMeta;
}

export interface IServiceCategory {
	id: number;
	documentId: string;
	title: string;
	slug: string;
	description: string;
	services: IService[];
	image: IPhoto;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
}

export interface IServiceCategoryResponse {
	data: IServiceCategory[];
	meta: IMeta;
}
