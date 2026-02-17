import { NextResponse } from 'next/server';
import qs from 'qs';

import { API_PATHS } from '@/config/api.config';
import { PAGE } from '@/config/pages';

import { axiosClassic } from '@/api/axios';

import type { IService, IServiceCategory } from '@/types/service.types';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

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
					service_category: true
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
			.filter(s => typeof s.price === 'number' && s.price > 0 && s.service_category?.id)
			.filter(s => categoryIds.has(s.service_category!.id))
			.map(service => {
				const id = service.id;
				const url = `${SITE_URL}${PAGE.SERVICE(service.slug)}`;
				const price = service.price;
				const name = escapeXml(service.title);
				const categoryId = service.service_category!.id;

				return [
					`    <offer id="${id}">`,
					`      <url>${url}</url>`,
					`      <price>${price}</price>`,
					`      <name>${name}</name>`,
					`      <categoryId>${categoryId}</categoryId>`,
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
			'    <name>Услуги первой кровельной компании</name>',
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
