import type { IObject } from './object.types';
import type { IPhoto } from './photo.types';
import type { ISeoMetatags } from './seo.types';
import type { IService } from './service.types';
import type { IMeta } from './strapi.types';

export interface IArticleTag {
	id: number;
	name: string;
}

export interface IArticle {
	id: number;
	documentId: string;
	title: string;
	slug: string;
	short_description: string;
	full_description: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	image: IPhoto | null;
	services?: Array<IService>;
	objects?: Array<IObject>;
	tags?: IArticleTag[];
	seo: ISeoMetatags | null;
}

export interface IArticleResponse {
	data: IArticle[];
	meta: IMeta;
}
