import type { IObjectMarker } from '@/types/object.types';

// Маркеры для страницы контактов (адреса из Contacts.tsx)
// При необходимости обновите координаты на точные для ваших адресов.
export interface IContactMarker
	extends Pick<IObjectMarker, 'id' | 'title' | 'slug' | 'coordinates' | 'isCommercial'> {
	city: string;
	postalCode: string;
	addressLocality: string;
	streetAddress: string;
	telephone: string;
	telephoneLink: string;
	schedule: string;
}

export const CONTACT_MARKERS: IContactMarker[] = [
	{
		id: 1,
		title: 'Красный проспект 218/1',
		slug: '',
		coordinates: { lat: 55.066246, lng: 82.912117 },
		isCommercial: false,
		city: 'Новосибирск',
		postalCode: '630047',
		addressLocality: 'Новосибирск',
		streetAddress: 'ул. Красный проспект 218/1, офис 1',
		telephone: '+7 (383) 286-64-44',
		telephoneLink: '+73832866444',
		schedule: 'Ежедневно 10:00-20:00'
	},
	{
		id: 2,
		title: 'Торговый дом Форум',
		slug: '',
		coordinates: { lat: 54.759794, lng: 83.107262 },
		isCommercial: false,
		city: 'Бердск',
		postalCode: '633010',
		addressLocality: 'Бердск',
		streetAddress: 'ул М.Горького, д. 4А, 4 этаж, офис 410',
		telephone: '+7 (983) 003-65-55',
		telephoneLink: '+79830036555',
		schedule: 'Ежедневно 10:00-20:00'
	}
];
