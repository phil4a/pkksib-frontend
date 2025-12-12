import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/constants/constants';

export default function robots(): MetadataRoute.Robots {
	const base = SITE_URL || 'http://localhost:3000';
	return {
		rules: [
			{
				userAgent: '*',
				allow: '/'
			}
		],
		sitemap: `${base}/sitemap.xml`,
		host: base
	};
}

