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
		href: PAGE.SERVICES,
		submenu: [
			{
				label: 'Деревянное домостроение',
				href: '#' // временная ссылка
			},
			{
				label: 'Плоская кровля',
				href: '#' // временная ссылка
			},
			{
				label: 'Скатная кровля',
				href: '#' // временная ссылка
			},
			{
				label: 'Фасадные работы под ключ в Новосибирске',
				href: '#' // временная ссылка
			},
			{
				label: 'Кровельные работы под ключ в Новосибирске',
				href: '#' // временная ссылка
			}
		]
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
