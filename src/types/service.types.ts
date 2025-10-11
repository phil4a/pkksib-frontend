import type { IObject } from './object.types';
import type { IPhoto } from './photo.types';
import type { ISeoMetatags } from './seo.types';
import type { IMeta } from './strapi.types';

export interface IService {
	id: number;
	documentId: string;
	title: string;
	image: IPhoto;
	slug: string;
	price: number;
	units: unitsEnum | null;
	description: string;
	shortDescription: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	isShowedInFooter?: boolean;
	service_category?: IServiceCategory | null;
	objects: IObject[];
	seo: ISeoMetatags | null;
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
	shortDescription: string;
	price?: number;
	units: unitsEnum | null;
	services: IService[];
	image: IPhoto;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	seo: ISeoMetatags | null;
}

export enum unitsEnum {
	SQUARE_METERS = 'м2',
	QUBIC_METERS = 'м3'
}

export interface IServiceCategoryResponse {
	data: IServiceCategory[];
	meta: IMeta;
}
