import { PAGE } from './pages';

export interface IMenuItem {
	label: string;
	href: string;
	icon?: React.ComponentType;
	submenu?: IMenuItem[];
}

export const MAIN_MENU: IMenuItem[] = [
	{
		label: 'О нас',
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
		label: 'Полезное',
		href: PAGE.ARTICLES
	},
	{
		label: 'Контакты',
		href: PAGE.CONTACTS
	}
];
