class Page {
	HOME = '/';
	ABOUT = '/about';
	FAQ = '/faq';
	SERVICES = '/services';
	SERVICE(path: string) {
		return `${this.SERVICES}/${path}`;
	}
	OBJECTS = '/objects';
	OBJECT(path: string) {
		return `${this.OBJECTS}/${path}`;
	}
	ARTICLES = '/articles';
	ARTICLE(path: string) {
		return `${this.ARTICLES}/${path}`;
	}
	CONTACTS = '/contacts';
	PRICES = '/prices';
}
export const PAGE = new Page();

export interface PageInfo {
	href: string;
	title: string;
}

export const PAGE_INFO = {
	HOME: { href: PAGE.HOME, title: 'Главная' },
	ABOUT: { href: PAGE.ABOUT, title: 'О нас' },
	FAQ: { href: PAGE.FAQ, title: 'Помощь' },
	SERVICES: { href: PAGE.SERVICES, title: 'Услуги' },
	OBJECTS: { href: PAGE.OBJECTS, title: 'Объекты' },
	ARTICLES: { href: PAGE.ARTICLES, title: 'Полезное' },
	CONTACTS: { href: PAGE.CONTACTS, title: 'Контакты' },
	PRICES: { href: PAGE.PRICES, title: 'Цены' }
} as const;
