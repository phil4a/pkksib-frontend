class Page {
	HOME = '/';
	ABOUT = '/about';
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
}
export const PAGE = new Page();
