import { PAGE } from '@/config/pages';

import type { CrumbItem } from '@/types/breadcrumbs';

export async function buildServiceCrumbs(_slug: string): Promise<CrumbItem[]> {
	// Пример: получаем услугу и её категорию
	// const service = await serviceService.getBySlug(slug);
	// const category = service.category;
	return [
		{ label: 'Услуги', href: PAGE.SERVICES },
		// { label: category.title, href: `${PAGE.SERVICES}/${category.slug}` },
		{ label: 'Название услуги', isCurrent: true } // замените на реальное поле
	];
}

export function buildStaticCrumbs(pathKey: keyof typeof PAGE): CrumbItem[] {
	return [
		{ label: 'Главная', href: '/' },
		{ label: getLabelByPageKey(pathKey), isCurrent: true }
	];
}

function getLabelByPageKey(key: keyof typeof PAGE): string {
	switch (key) {
		case 'ABOUT':
			return 'О нас';
		case 'SERVICES':
			return 'Услуги';
		case 'OBJECTS':
			return 'Объекты';
		case 'ARTICLES':
			return 'Статьи';
		case 'CONTACTS':
			return 'Контакты';
		default:
			return '';
	}
}
