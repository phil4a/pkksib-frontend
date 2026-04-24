import type { IObject } from '@/types/object.types';

export function getObjectsHeadingTitle(categoriesRaw: string | undefined): string | undefined {
	const slugs = (categoriesRaw || '')
		.split(',')
		.map(s => s.trim())
		.filter(Boolean);

	if (slugs.length !== 1) return undefined;

	const slug = slugs[0]!.toLowerCase();

	if (slug.includes('administr')) return 'Административные объекты';
	if (slug.includes('prom')) return 'Промышленные объекты';
	if (slug.includes('kotted')) return 'Коттеджи';
	if (slug.includes('pod-klyuch') || slug.includes('pod-kluch')) return 'Объекты: дома под ключ';

	return undefined;
}

interface ObjectsPageSearchParams {
	categories?: string | string[];
	locations?: string | string[];
	page?: string | string[];
}

interface ObjectsPageData {
	objects: IObject[];
	page: number;
	pageCount: number;
	pageSize: number;
}

function toList(param: string | string[] | undefined): string[] {
	if (!param) return [];
	if (Array.isArray(param)) return param.join(',').split(',').filter(Boolean);
	return param.split(',').filter(Boolean);
}

function toPositiveInt(param: string | string[] | undefined, fallback: number): number {
	const raw = Array.isArray(param) ? param[0] : param;
	const value = Number(raw ?? fallback);
	return Number.isFinite(value) && value > 0 ? value : fallback;
}

export async function getObjectsPageData(
	searchParams: ObjectsPageSearchParams,
	options?: { pageSize?: number; revalidate?: number }
): Promise<ObjectsPageData> {
	const pageSize = options?.pageSize ?? 9;
	const page = toPositiveInt(searchParams.page, 1);
	const categorySlugs = toList(searchParams.categories);
	const locations = toList(searchParams.locations);

	const { objectService } = await import('@/services/object.service');
	const res = await objectService.getAllServer({
		page,
		pageSize,
		categorySlugs,
		locations,
		revalidate: options?.revalidate ?? 300
	});

	const objects = res?.data ?? [];
	const pageCount = res?.meta?.pagination?.pageCount ?? 1;

	return { objects, page, pageCount, pageSize };
}
