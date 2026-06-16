import type { IObject } from '@/types/object.types';

export interface ObjectsInitialPage {
	page: number;
	objects: IObject[];
}

export interface ObjectsInfiniteListProps {
	initialPages: ObjectsInitialPage[];
	pageCount: number;
	pageSize: number;
	requestedPage: number;
	categorySlugs: string[];
	locations: string[];
}

