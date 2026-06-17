import { PAGE } from '@/config/pages';
import { SITE_CONFIG } from '@/config/site.config';

import { SITE_URL } from '@/constants/constants';

const companyLinks = [
	{ label: 'Главная', href: PAGE.HOME },
	{ label: 'Помощь', href: PAGE.FAQ },
	{ label: 'Услуги', href: PAGE.SERVICES },
	{ label: 'Кровельные работы', href: PAGE.SERVICE('krovelnye-raboty') },
	{ label: 'Скатная кровля', href: PAGE.SERVICE('skatnaya-krovlya') },
	{ label: 'Плоская кровля', href: PAGE.SERVICE('ploskaya-krovlya') },
	{ label: 'Фасадные работы', href: PAGE.SERVICE('fasadnie-raboti') },
	{ label: 'Деревянное домостроение', href: PAGE.SERVICE('derevyannoe-domostroenie') },
	{ label: 'Цены', href: PAGE.PRICES },
	{ label: 'О компании', href: PAGE.ABOUT },
	{ label: 'Контакты', href: PAGE.CONTACTS }
];

function toAbsoluteUrl(path: string) {
	return new URL(path, SITE_URL).toString();
}

export async function GET() {
	const lines = [
		'# PKKSib.ru',
		'',
		`Компания: Первая Кровельная Компания`,
		`Описание: ${SITE_CONFIG.description}`,
		'Регион: Новосибирск, Новосибирская область, Россия',
		'Специализация: кровельные работы, плоская и скатная кровля, фасадные работы, деревянное домостроение, сервисное обслуживание кровли.',
		'FAQ: раздел помощи содержит ответы по материалам, срокам, стоимости, гарантии, фасадам и деревянному домостроению.',
		'',
		'## Основные разделы',
		...companyLinks.map(link => `- ${link.label}: ${toAbsoluteUrl(link.href)}`),
		'',
		'## Контакты',
		`- Телефон: ${SITE_CONFIG.phoneNumber}`,
		`- Email: ${SITE_CONFIG.email}`,
		`- WhatsApp: ${SITE_CONFIG.whatsappLink}`,
		`- Telegram: ${SITE_CONFIG.telegramLink}`
	];

	return new Response(lines.join('\n'), {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8'
		}
	});
}

export const revalidate = 86400;
