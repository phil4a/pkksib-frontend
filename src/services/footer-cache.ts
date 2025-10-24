import { unstable_cache } from 'next/cache';
import { serviceService } from '@/services/service.service';
import type { IService } from '@/types/service.types';

export const getFooterServicesCached = unstable_cache(
	async (): Promise<IService[]> => {
		try {
			const res = await serviceService.getFooterServices();
			return res?.data?.data ?? [];
		} catch {
			return [];
		}
	},
	['footer-services'],
	{ revalidate: 300, tags: ['footer-services'] }
);