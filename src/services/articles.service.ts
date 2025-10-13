import qs from 'qs';

import { API_PATHS } from '@/config/api.config';

import { axiosClassic } from '@/api/axios';

import type { IArticleResponse, IArticleTag } from '@/types/article.types';

class ArticlesService {
	private _articles = API_PATHS.ARTICLES;

	async getAll(tagId?: number) {
		const query = qs.stringify({
			populate: {
				image: true,
				tags: true
			},
			sort: ['createdAt:desc'],
			...(tagId
				? {
						filters: {
							tags: {
								id: {
									$eq: tagId
								}
							}
						}
					}
				: {})
		});
		return axiosClassic.get<IArticleResponse>(`${this._articles}?${query}`);
	}

	async getBySlug(slug: string) {
		const articleQuery = qs.stringify({
			populate: {
				image: true,
				services: true,
				tags: true,
				seo: true
			},
			filters: {
				slug: {
					$eq: slug
				}
			}
		});

		const response = await axiosClassic.get<IArticleResponse>(`${this._articles}?${articleQuery}`);

		return {
			data: response.data.data[0]
		};
	}

	async getUniqueTags(): Promise<IArticleTag[]> {
		const res = await this.getAll();
		const map = new Map<number, IArticleTag>();
		res.data.data.forEach(article => {
			(article.tags || []).forEach(tag => {
				if (!map.has(tag.id)) map.set(tag.id, tag);
			});
		});
		return Array.from(map.values());
	}

	async getRelated(tagId: number, excludeSlug: string, limit: number = 3) {
		const query = qs.stringify({
			populate: {
				image: true,
				tags: true
			},
			filters: {
				tags: {
					id: {
						$eq: tagId
					}
				},
				slug: {
					$ne: excludeSlug
				}
			},
			pagination: { page: 1, pageSize: limit }
		});
		return axiosClassic.get<IArticleResponse>(`${this._articles}?${query}`).then(res => {
			const shuffled = [...res.data.data];
			shuffled.sort(() => Math.random() - 0.5);
			return { ...res, data: { ...res.data, data: shuffled } };
		});
	}
}

export const articlesService = new ArticlesService();
