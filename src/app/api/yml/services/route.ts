import { NextResponse } from 'next/server';
import qs from 'qs';

import { API_PATHS } from '@/config/api.config';
import { PAGE } from '@/config/pages';

import { axiosClassic } from '@/api/axios';

import type { IService, IServiceCategory } from '@/types/service.types';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const EXECUTOR_NAME = 'ООО "Первая Кровельная Компания"';

interface ServiceResponse {
	data: IService[];
}

interface ServiceCategoryResponse {
	data: IServiceCategory[];
}

function escapeXml(value: string): string {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

export async function GET() {
	try {
		const query = qs.stringify(
			{
				populate: {
					service_category: true,
					image: true
				},
				pagination: {
					pageSize: 500
				},
				sort: ['id:asc']
			},
			{ encodeValuesOnly: true }
		);

		const [servicesRes, categoriesRes] = await Promise.all([
			axiosClassic.get<ServiceResponse>(`${API_PATHS.SERVICES}?${query}`),
			axiosClassic.get<ServiceCategoryResponse>(`${API_PATHS.SERVICE_CATEGORIES}`)
		]);

		const services = servicesRes.data?.data ?? [];
		const categories = categoriesRes.data?.data ?? [];

		const categoryIds = new Set(categories.map(c => c.id));

		const offersXml = services
			.filter(
				s => typeof s.price === 'number' && s.price > 0 && s.service_category?.id && !!s.image?.url
			)
			.filter(s => categoryIds.has(s.service_category!.id))
			.map(service => {
				const id = service.id;
				const url = `${SITE_URL}${PAGE.SERVICE(service.slug)}`;
				const price = service.price;
				const name = escapeXml(EXECUTOR_NAME);
				const categoryId = service.service_category!.id;
				const currencyId = 'RUR';

				const pictureRaw = service.image?.url ?? '';
				const picture =
					pictureRaw.startsWith('http://') || pictureRaw.startsWith('https://')
						? pictureRaw
						: `${SITE_URL}${pictureRaw}`;

				const description = escapeXml(service.title);

				const rating = 0;
				const reviewsCount = 0;
				const yearsOfExperience = 11;
				const region = 'Новосибирск';
				const conversion = 1;

				const setIds = 'pkksib_general';

				return [
					`    <offer id="${id}">`,
					`      <url>${url}</url>`,
					`      <price from="true">${price}</price>`,
					`      <currencyId>${currencyId}</currencyId>`,
					`      <name>${name}</name>`,
					`      <categoryId>${categoryId}</categoryId>`,
					`      <set-ids>${setIds}</set-ids>`,
					`      <picture>${picture}</picture>`,
					`      <description>${description}</description>`,
					`      <param name="Рейтинг">${rating}</param>`,
					`      <param name="Число отзывов">${reviewsCount}</param>`,
					`      <param name="Годы опыта">${yearsOfExperience}</param>`,
					`      <param name="Регион">${escapeXml(region)}</param>`,
					`      <param name="Конверсия">${conversion}</param>`,
					`    </offer>`
				].join('\n');
			})
			.join('\n');

		const categoriesXml = categories
			.map(category => {
				const id = category.id;
				const name = escapeXml(category.title);
				return `    <category id="${id}">${name}</category>`;
			})
			.join('\n');

		const xml = [
			'<?xml version="1.0" encoding="utf-8"?>',
			'<yml_catalog date="' + new Date().toISOString() + '">',
			'  <shop>',
			'    <name>Первая кровельная</name>',
			'    <company>Первая Кровельная Компания</company>',
			`    <url>${SITE_URL}</url>`,
			'    <currencies>',
			'      <currency id="RUR" rate="1"/>',
			'    </currencies>',
			'    <categories>',
			categoriesXml,
			'    </categories>',
			'    <offers>',
			offersXml,
			'    </offers>',
			'  </shop>',
			'</yml_catalog>'
		].join('\n');

		return new NextResponse(xml, {
			status: 200,
			headers: {
				'Content-Type': 'application/xml; charset=utf-8',
				'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400'
			}
		});
	} catch (error) {
		return new NextResponse('Failed to generate YML feed', { status: 500 });
	}
}
