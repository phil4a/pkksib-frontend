import type { IPhoto } from './photo.types';

export interface IObject {
	id: number;
	documentId: string;
	title: string;
	slug: string;
	time: string;
	area: number;
	location: string;
	description: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	photos: IPhoto[];
}
