import type { MetadataRoute } from 'next';
import qs from 'qs';

import { SITE_URL } from '@/constants/constants';

import { API_PATHS } from '@/config/api.config';
import { PAGE_INFO } from '@/config/pages';

import { axiosClassic } from '@/api/axios';

type SlugItem = { slug: string; updatedAt?: string };

async function collectSlugs(path: string): Promise<SlugItem[]> {
	const pageSize = 200;
	let page = 1;
	let out: SlugItem[] = [];
	while (true) {
		const query = qs.stringify(
			{
				fields: ['slug', 'updatedAt'],
				pagination: { page, pageSize },
				sort: ['updatedAt:desc']
			},
			{ encodeValuesOnly: true }
		);
		const res = await axiosClassic.get(`${path}?${query}`);
		const data = (res.data?.data ?? []) as Array<{ slug: string; updatedAt?: string }>;
		out = out.concat(data.map(d => ({ slug: d.slug, updatedAt: d.updatedAt })));
		const pageCount = res.data?.meta?.pagination?.pageCount ?? 1;
		if (page >= pageCount) break;
		page += 1;
	}
	return out;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const base = SITE_URL || 'http://localhost:3000';
	const hasApi =
		typeof axiosClassic.defaults.baseURL === 'string' && axiosClassic.defaults.baseURL.length > 0;

	const priorityMap: Partial<Record<keyof typeof PAGE_INFO, number>> = {
		HOME: 1,
		ABOUT: 0.8,
		CONTACTS: 0.6,
		OBJECTS: 0.8,
		SERVICES: 0.8,
		PRICES: 0.9,
		ARTICLES: 0.6
	};
	const staticRoutes: MetadataRoute.Sitemap = Object.entries(PAGE_INFO).map(([key, info]) => ({
		url: `${base}${info.href}`,
		priority: priorityMap[key as keyof typeof PAGE_INFO] ?? 0.7
	}));

	const [articles, services, objects] = hasApi
		? await Promise.all([
				collectSlugs(API_PATHS.ARTICLES),
				collectSlugs(API_PATHS.SERVICES),
				collectSlugs(API_PATHS.OBJECTS)
			])
		: [[], [], []];

	const toEntries = (items: SlugItem[], prefix: string): MetadataRoute.Sitemap =>
		items.map(i => ({
			url: `${base}${prefix}/${i.slug}`,
			lastModified: i.updatedAt ? new Date(i.updatedAt) : undefined,
			changeFrequency: 'weekly',
			priority: 0.7
		}));

	return [
		...staticRoutes,
		...toEntries(articles, '/articles'),
		...toEntries(services, '/services'),
		...toEntries(objects, '/objects')
	];
}
