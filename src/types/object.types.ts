import type { IPhoto } from './photo.types';
import type { ISeoMetatags } from './seo.types';

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
	time: string;
	area: number;
	description: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	photos: IPhoto[];
	object_categories: IObjectCategory[];
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
	description?: string;
	firstPhoto?: IPhoto;
}
