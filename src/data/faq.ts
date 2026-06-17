import type { FaqCategory, FaqCategoryGroup, FaqItem, FaqSlugMap } from '@/types/faq.types';

export const FAQ_PAGE_TITLE = 'Помощь';
export const FAQ_PAGE_DESCRIPTION =
	'Ответы на частые вопросы по кровельным, фасадным и строительным работам компании «Первая Кровельная Компания» в Новосибирске и области.';

export const faqCategories: FaqCategory[] = [
	{ key: 'prices-estimates', title: 'Цены и расчёт стоимости' },
	{ key: 'timelines-process', title: 'Сроки и этапы работы' },
	{ key: 'warranty-service', title: 'Гарантия и обслуживание' },
	{ key: 'documents-payments', title: 'Документы, оплата, регион работы' },
	{ key: 'roofing-materials', title: 'Кровля и выбор материала' },
	{ key: 'facades', title: 'Фасадные работы' },
	{ key: 'wooden-housing', title: 'Деревянное домостроение' }
];

export const faqItems: FaqItem[] = [
	{
		id: 'roof-climate-siberia',
		category: 'roofing-materials',
		question: 'Какая кровля лучше всего подходит для климата Новосибирска и Сибири?',
		answer:
			'Для сибирского климата с резкими перепадами температур и высокой снеговой нагрузкой лучше всего подходят металлочерепица, композитная черепица и фальцевая кровля. Они выдерживают циклы заморозки и оттепели, а при правильном устройстве кровельного пирога работают стабильно даже в суровую зиму. Дополнительно нужны снегозадержатели, вентиляционный зазор и пароизоляция, иначе на чердаке будет скапливаться конденсат.'
	},
	{
		id: 'roof-types-diff',
		category: 'roofing-materials',
		question: 'В чём разница между металлочерепицей, композитной и гибкой черепицей?',
		answer:
			'Металлочерепица обычно остаётся самым доступным и быстрым в монтаже вариантом, композитная черепица стоит дороже, но тише и устойчивее к внешним воздействиям, а гибкая черепица удобна для крыш сложной формы. Для выбора важно учитывать не только внешний вид, но и конструкцию крыши, бюджет и сезон монтажа.'
	},
	{
		id: 'flat-vs-pitched',
		category: 'roofing-materials',
		question: 'Чем плоская кровля отличается от скатной и когда какую выбирать?',
		answer:
			'Плоская кровля чаще подходит для гаражей, коммерческих и хозяйственных построек, где важна компактная конструкция и доступная стоимость устройства. Скатная кровля чаще выбирается для жилых домов, потому что естественно отводит снег и воду за счёт уклона и даёт больше вариантов по покрытию и архитектуре.'
	},
	{
		id: 'pvc-vs-built-up',
		category: 'roofing-materials',
		question: 'Что лучше: ПВХ-мембрана или наплавляемая кровля для плоской крыши?',
		answer:
			'ПВХ-мембрана обычно служит дольше, монтируется без открытого огня и проще в локальном ремонте. Наплавляемая кровля дешевле по материалу, но более чувствительна к качеству шва и требует газовой горелки при монтаже. Для эксплуатируемой кровли или объекта с высокими требованиями к долговечности чаще выбирают ПВХ-мембрану.'
	},
	{
		id: 'flexible-shingles-choice',
		category: 'roofing-materials',
		question: 'Когда стоит выбрать гибкую черепицу вместо металлочерепицы?',
		answer:
			'Гибкую черепицу обычно выбирают для крыш со сложной геометрией, большим количеством примыканий и повышенными требованиями к внешнему виду покрытия. Она требует сплошного основания и более внимательно привязана к температурным условиям монтажа, поэтому на простых скатах металлочерепица часто оказывается практичнее и дешевле.'
	},
	{
		id: 'roof-turnkey-cost',
		category: 'prices-estimates',
		question: 'Сколько стоит монтаж кровли под ключ за квадратный метр?',
		answer:
			'Стоимость монтажных работ зависит от типа покрытия, конструкции крыши и количества сложных узлов. Для кровельных работ по сайту ориентир начинается от 250-350 рублей за квадратный метр работ, но точная смета рассчитывается только после замера и подбора материалов.'
	},
	{
		id: 'what-included',
		category: 'prices-estimates',
		question: 'Что входит в стоимость работ, а что оплачивается отдельно?',
		answer:
			'Обычно в стоимость работ входит сам монтаж кровельного пирога, покрытия и доборных элементов, а материалы считаются отдельно. Такой формат позволяет клиенту видеть реальную стоимость труда и закупки без смешения позиций в одной цифре.'
	},
	{
		id: 'fixed-price',
		category: 'prices-estimates',
		question: 'Можно ли зафиксировать итоговую цену, чтобы её не подняли в процессе работ?',
		answer:
			'Да, итоговую стоимость можно зафиксировать в договоре до начала работ после замера и согласования сметы. Изменение цены возможно только при согласованных дополнительных работах или если после вскрытия конструкции выявляются скрытые дефекты, которые нельзя было оценить заранее.'
	},
	{
		id: 'company-vs-brigade',
		category: 'prices-estimates',
		question: 'Почему услуги компании дороже, чем у частной бригады?',
		answer:
			'Цена компании включает договор, гарантийные обязательства, контроль сроков и ответственность за результат. У частной бригады смета может выглядеть ниже на старте, но часто не включает важные технологические этапы, контроль качества и последующее устранение дефектов.'
	},
	{
		id: 'duration-house-roof',
		category: 'timelines-process',
		question: 'Сколько занимает монтаж кровли частного дома площадью 150-200 м²?',
		answer:
			'Монтаж кровли дома площадью 150-200 квадратных метров обычно занимает от 7 до 14 рабочих дней. Точный срок зависит от сложности конструкции, количества примыканий, этапов подготовки основания и погодных условий.'
	},
	{
		id: 'winter-roofing',
		category: 'timelines-process',
		question: 'Можно ли проводить кровельные работы зимой?',
		answer:
			'Да, часть кровельных работ можно выполнять зимой, особенно если речь идёт о металлочерепице, профлисте и других жёстких покрытиях. Ограничения чаще касаются гибкой битумной черепицы и некоторых процессов, где важна плюсовая температура для корректной укладки и склейки материалов.'
	},
	{
		id: 'delay-penalty',
		category: 'timelines-process',
		question: 'Что произойдёт, если компания нарушит сроки по договору?',
		answer:
			'Если сроки зафиксированы в договоре, ответственность за их нарушение также должна быть прописана в договоре. Для заказчика это важнее устных обещаний, потому что даёт понятный механизм урегулирования при сдвиге сроков.'
	},
	{
		id: 'turnkey-stages',
		category: 'timelines-process',
		question: 'Какие этапы включает кровельные работы под ключ от замера до сдачи?',
		answer:
			'Работы под ключ обычно включают замер и расчёт сметы, согласование материалов и цены, демонтаж старого покрытия при необходимости, монтаж кровельного пирога и финишного покрытия, а затем итоговую проверку и сдачу объекта. Такой порядок позволяет контролировать сроки, стоимость и качество на каждом этапе.'
	},
	{
		id: 'warranty-period',
		category: 'warranty-service',
		question: 'Какая гарантия даётся на кровельные и фасадные работы?',
		answer:
			'На выполненные работы компания даёт гарантию 5 лет, и она фиксируется в договоре. Обычно гарантия распространяется на дефекты монтажа, например проблемы со стыками, примыканиями, герметичностью узлов и ошибками крепления.'
	},
	{
		id: 'warranty-exclusions',
		category: 'warranty-service',
		question: 'Что не покрывает гарантия на кровлю?',
		answer:
			'Гарантия не покрывает повреждения из-за внешнего механического воздействия, последствий работы других подрядчиков после сдачи объекта и естественного износа материала за пределами срока службы. Отдельно всегда нужно учитывать условия гарантии производителя на сами материалы.'
	},
	{
		id: 'roof-service-contents',
		category: 'warranty-service',
		question: 'Что входит в сервисное обслуживание кровли?',
		answer:
			'Сервисное обслуживание обычно включает осмотр кровли, проверку примыканий и герметичности узлов, очистку водостоков и снегозадержателей, а также устранение мелких дефектов до появления серьёзной протечки. Оптимально проводить такой осмотр не реже одного раза в год.'
	},
	{
		id: 'roof-leak-action',
		category: 'warranty-service',
		question: 'Кровля потекла в гарантийный период: что делать?',
		answer:
			'Нужно связаться с компанией по контактам, указанным на сайте и в договоре, и зафиксировать обращение. После диагностики причина протечки определяется на объекте, и если проблема относится к качеству монтажа, дефект устраняется за счёт подрядчика.'
	},
	{
		id: 'wood-materials-diff',
		category: 'wooden-housing',
		question:
			'Чем отличается дом из клееного бруса от профилированного бруса и оцилиндрованного бревна?',
		answer:
			'Клееный брус даёт минимальную усадку и более стабильную геометрию, поэтому считается самым технологичным вариантом. Профилированный брус дешевле, но сильнее усаживается и требует больше времени перед чистовой отделкой. Оцилиндрованное бревно выбирают за традиционный внешний вид, но оно также требует учёта усадки и последующей обработки.'
	},
	{
		id: 'house-kit-cost',
		category: 'wooden-housing',
		question: 'Сколько стоит монтаж домокомплекта и что входит в эту цену?',
		answer:
			'Стоимость зависит от материала и объёма работ, а в цену монтажа обычно входит сборка домокомплекта по проекту. Дополнительные позиции, такие как лаги перекрытия, черновые полы, утепление и отделочные работы, чаще выносятся в смету отдельно.'
	},
	{
		id: 'sip-house-why',
		category: 'wooden-housing',
		question: 'Почему выбирают дом из СИП-панелей?',
		answer:
			'Дом из СИП-панелей часто выбирают, когда нужен тёплый дом за сравнительно умеренный бюджет и без тяжёлой долгой стройки. Итоговый результат при этом сильно зависит от точности сборки, герметичности стыков и качества узлов кровли, перекрытий и примыканий.'
	},
	{
		id: 'sip-house-important',
		category: 'wooden-housing',
		question: 'Что особенно важно при монтаже дома из СИП-панелей?',
		answer:
			'Критично соблюдать геометрию сборки, герметично выполнять стыки, защищать конструкцию от влаги и не экономить на узлах сопряжения. Ошибки на этих этапах напрямую влияют на теплопотери, долговечность и последующую отделку дома.'
	},
	{
		id: 'facade-choice',
		category: 'facades',
		question: 'Какой фасад выбрать для частного дома: штукатурный, сайдинг или композитные панели?',
		answer:
			'Штукатурный фасад даёт классический внешний вид, но требует более аккуратного обслуживания. Сайдинг чаще становится самым практичным и бюджетным вариантом. Композитные панели относятся к более дорогому сегменту и выбираются, когда важны долговечность, современный вид и устойчивость к выгоранию.'
	},
	{
		id: 'facade-insulation',
		category: 'facades',
		question: 'Нужно ли утеплять фасад и какой утеплитель подходит для Сибири?',
		answer:
			'Для большинства домов в Сибири утепление фасада действительно необходимо, потому что оно заметно снижает теплопотери и расходы на отопление. Для вентилируемых фасадов обычно используют плотную минеральную теплоизоляцию, устойчивую к продуванию и перепадам температуры.'
	},
	{
		id: 'documents-before-start',
		category: 'documents-payments',
		question: 'Какие документы оформляются перед началом работ?',
		answer:
			'Перед началом работ обычно подписывается договор подряда с фиксированной стоимостью, сроками и гарантийными условиями. После завершения оформляются акт сдачи-приёмки и сопутствующие гарантийные документы.'
	},
	{
		id: 'payment-scheme',
		category: 'documents-payments',
		question: 'Как происходит оплата: предоплата, поэтапно или после сдачи?',
		answer:
			'Обычно оплата делится на этапы: часть идёт на закупку материалов после подписания договора, а финальный расчёт проводится по итогам выполненных работ. Конкретная схема должна быть заранее зафиксирована в договоре по объекту.'
	},
	{
		id: 'work-outside-novosibirsk',
		category: 'documents-payments',
		question: 'Работаете ли вы за пределами Новосибирска?',
		answer:
			'Да, компания работает в Новосибирске, по Новосибирской области и берёт объекты в других регионах России. Условия выезда, логистики и расчёта удалённых объектов согласуются отдельно после первичной оценки задачи.'
	}
];

export const faqSlugMap: FaqSlugMap = {
	'montaj-pvh-membrani': ['pvc-vs-built-up', 'what-included', 'fixed-price', 'turnkey-stages'],
	'montaj-naplavlyaemoi-krovli': [
		'pvc-vs-built-up',
		'what-included',
		'fixed-price',
		'turnkey-stages'
	],
	'montaj-proflista-na-nesyshyu-konstrykciu': [
		'flat-vs-pitched',
		'what-included',
		'fixed-price',
		'turnkey-stages'
	],
	'ystroistvo-styajki': ['flat-vs-pitched', 'what-included', 'fixed-price', 'turnkey-stages'],
	'montaj-metallocherepici': [
		'roof-climate-siberia',
		'roof-types-diff',
		'roof-turnkey-cost',
		'turnkey-stages'
	],
	'montazha-metallocherepitsy': [
		'roof-climate-siberia',
		'roof-types-diff',
		'roof-turnkey-cost',
		'turnkey-stages'
	],
	'montaj-proflista': [
		'roof-climate-siberia',
		'roof-turnkey-cost',
		'what-included',
		'turnkey-stages'
	],
	'montazh-profnastila': [
		'roof-climate-siberia',
		'roof-turnkey-cost',
		'what-included',
		'turnkey-stages'
	],
	'montaj-snegozaderjatelei': [
		'roof-climate-siberia',
		'what-included',
		'fixed-price',
		'roof-service-contents'
	],
	'montazh-mansardnykh-okon': ['turnkey-stages', 'what-included', 'fixed-price', 'warranty-period'],
	'montazh-vodostochnoj-sistemy': [
		'turnkey-stages',
		'what-included',
		'fixed-price',
		'warranty-period'
	],
	'montazh-gibkoy-cherepitsy': [
		'flexible-shingles-choice',
		'winter-roofing',
		'roof-types-diff',
		'roof-turnkey-cost'
	],
	'montaj-gibkoi-cherepici': [
		'flexible-shingles-choice',
		'winter-roofing',
		'roof-types-diff',
		'roof-turnkey-cost'
	],
	'montazh-shtukaturnogo-fasada': [
		'facade-choice',
		'facade-insulation',
		'fixed-price',
		'warranty-period'
	],
	'montaj-saidinga-pvh': ['facade-choice', 'facade-insulation', 'fixed-price', 'warranty-period'],
	'montaj-metallicheskogo-saidinga': [
		'facade-choice',
		'facade-insulation',
		'fixed-price',
		'warranty-period'
	],
	'montaj-kompozitnih-panelei': [
		'facade-choice',
		'facade-insulation',
		'fixed-price',
		'warranty-period'
	],
	'montaj-linearnih-panelei': [
		'facade-choice',
		'facade-insulation',
		'fixed-price',
		'warranty-period'
	],
	'montaj-fibrocementnih-panelei': [
		'facade-choice',
		'facade-insulation',
		'fixed-price',
		'warranty-period'
	],
	'montaj-doma-iz-sip-panelei': [
		'sip-house-why',
		'sip-house-important',
		'house-kit-cost',
		'documents-before-start'
	],
	'montaj-karkasnogo-doma': [
		'sip-house-why',
		'sip-house-important',
		'fixed-price',
		'documents-before-start'
	],
	'montaj-domokomplekta-iz-profilirovannogo-brysa': [
		'wood-materials-diff',
		'house-kit-cost',
		'fixed-price',
		'documents-before-start'
	],
	'montaj-domokomplekta-iz-ocilindrovannogo-brevna': [
		'wood-materials-diff',
		'house-kit-cost',
		'fixed-price',
		'documents-before-start'
	],
	'montazh-domokomplekta-iz-kleenogo-brusa': [
		'wood-materials-diff',
		'house-kit-cost',
		'fixed-price',
		'documents-before-start'
	]
};

const faqItemsById = new Map(faqItems.map(item => [item.id, item]));

function getDefaultFaqItemIdsForSlug(slug: string): readonly string[] {
	const normalized = slug.toLowerCase();

	const isFacade =
		normalized.includes('fasad') ||
		normalized.includes('saiding') ||
		normalized.includes('shtukaturn') ||
		normalized.includes('panelei') ||
		normalized.includes('plitki') ||
		normalized.includes('podsistemi-dlya-ventfasada') ||
		normalized.includes('otkosov');

	if (isFacade) {
		return ['facade-choice', 'facade-insulation', 'fixed-price', 'warranty-period'];
	}

	const isWood =
		normalized.includes('sip') ||
		normalized.includes('domokomplekta') ||
		normalized.includes('karkasnogo-doma') ||
		normalized.includes('lag-perekritiya') ||
		normalized.includes('plankena') ||
		normalized.includes('vagonki') ||
		normalized.includes('okraska-sten') ||
		normalized.includes('shlifovka-sten') ||
		normalized.includes('derevyannih-otkosov') ||
		normalized.includes('chernovih-polov');

	if (isWood) {
		return ['wood-materials-diff', 'house-kit-cost', 'fixed-price', 'documents-before-start'];
	}

	const isFlatRoof =
		normalized.includes('pvh-membrani') ||
		normalized.includes('naplavlyaemoi-krovli') ||
		normalized.includes('styajki') ||
		normalized.includes('vodostochnih-voronok') ||
		normalized.includes('gidroizolyaciya') ||
		normalized.includes('proflista-na-nesyshyu-konstrykciu') ||
		normalized.includes('razdelitelnogo-sloya');

	if (isFlatRoof) {
		return ['pvc-vs-built-up', 'roof-turnkey-cost', 'what-included', 'turnkey-stages'];
	}

	const isRoof =
		normalized.includes('krovl') ||
		normalized.includes('krovel') ||
		normalized.includes('metallocherep') ||
		normalized.includes('proflist') ||
		normalized.includes('profnastil') ||
		normalized.includes('ondulin') ||
		normalized.includes('shifer') ||
		normalized.includes('gibk') ||
		normalized.includes('snegozaderj') ||
		normalized.includes('mansard') ||
		normalized.includes('vodostoch') ||
		normalized.includes('stropil') ||
		normalized.includes('obreshetk') ||
		normalized.includes('ventilyacionnogo-zazora') ||
		normalized.includes('paroizolyacionn');

	if (isRoof) {
		return ['roof-climate-siberia', 'roof-turnkey-cost', 'what-included', 'turnkey-stages'];
	}

	return ['what-included', 'fixed-price', 'warranty-period', 'documents-before-start'];
}

export function getAllFaqItems() {
	return faqItems;
}

export function getFaqCategoryGroups(items: readonly FaqItem[] = faqItems): FaqCategoryGroup[] {
	return faqCategories
		.map(category => ({
			category,
			items: items.filter(item => item.category === category.key)
		}))
		.filter(group => group.items.length > 0);
}

export function getFaqItemsForSlugs(
	slugs: readonly (string | null | undefined)[],
	limit = 4
): FaqItem[] {
	const seen = new Set<string>();
	const resolved: FaqItem[] = [];

	for (const slug of slugs) {
		if (!slug) continue;

		const itemIds = faqSlugMap[slug] ?? getDefaultFaqItemIdsForSlug(slug);

		for (const itemId of itemIds) {
			if (seen.has(itemId)) continue;

			const item = faqItemsById.get(itemId);
			if (!item) continue;

			seen.add(itemId);
			resolved.push(item);

			if (resolved.length >= limit) {
				return resolved;
			}
		}
	}

	return resolved;
}
