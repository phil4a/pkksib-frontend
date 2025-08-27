import { PAGE } from './pages';

export interface IMenuItem {
	label: string;
	href: string;
	icon?: React.ComponentType;
}

export const MAIN_MENU: IMenuItem[] = [
	{
		label: 'О компании',
		href: PAGE.ABOUT
	},
	{
		label: 'Услуги',
		href: PAGE.SERVICES
	},
	{
		label: 'Объекты',
		href: PAGE.OBJECTS
	},
	{
		label: 'Статьи',
		href: PAGE.ARTICLES
	},
	{
		label: 'Контакты',
		href: PAGE.CONTACTS
	}
];
