export type FaqCategoryKey =
	| 'roofing-materials'
	| 'prices-estimates'
	| 'timelines-process'
	| 'warranty-service'
	| 'wooden-housing'
	| 'facades'
	| 'documents-payments';

export interface FaqCategory {
	key: FaqCategoryKey;
	title: string;
}

export interface FaqItem {
	id: string;
	question: string;
	answer: string;
	category: FaqCategoryKey;
}

export interface FaqCategoryGroup {
	category: FaqCategory;
	items: FaqItem[];
}

export type FaqSlugMap = Record<string, readonly string[]>;
