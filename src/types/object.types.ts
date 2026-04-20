import type { IPhoto } from './photo.types';
import type { ISeoMetatags } from './seo.types';
import type { IServiceCategory } from './service.types';
import type { IMeta } from './strapi.types';

export interface IObjectCategory {
	id: number;
	documentId: string;
	title: string;
	slug: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
}

export interface IObjectLocation {
	id: number;
	location: string;
	coordinates: string;
	isCommercial: boolean;
}

export interface IObjectService {
	id: number;
	documentId: string;
	title: string;
	slug: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
}

export interface IObject {
	id: number;
	documentId: string;
	title: string;
	slug: string;
	sortOrder: number;
	time: string;
	area: number;
	short_description: string;
	description: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	photos: IPhoto[];
	object_categories: IObjectCategory[];
	service_categories: IServiceCategory[];
	services: IObjectService[];
	location: IObjectLocation;
	seo: ISeoMetatags | null;
}

export interface IObjectMarker {
	id: number;
	slug: string;
	title: string;
	coordinates: {
		lat: number;
		lng: number;
	};
	isCommercial: boolean;
	area?: number;
	time?: string;
	short_description?: string;
	firstPhoto?: IPhoto;
}

// Response type with pagination meta for objects list
export interface IObjectResponse {
	data: IObject[];
	meta: IMeta;
}

export interface IObjectLocationResponse {
	data: IObjectLocation[];
	meta: IMeta;
}

export interface IObjectCategoryResponse {
	data: IObjectCategory[];
	meta: IMeta;
}
