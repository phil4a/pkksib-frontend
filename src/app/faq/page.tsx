import type { Metadata } from 'next';

import { FaqBlock } from '@/components/layout/content/faq/FaqBlock';
import { FaqSchema } from '@/components/layout/content/faq/FaqSchema';
import { Breadcrumbs } from '@/ui/Breadcrumbs';
import { Title } from '@/ui/title/Title';

import { FAQ_PAGE_DESCRIPTION, FAQ_PAGE_TITLE, getAllFaqItems, getFaqCategoryGroups } from '@/data/faq';

import { PAGE_INFO } from '@/config/pages';

export const metadata: Metadata = {
	title: FAQ_PAGE_TITLE,
	description: FAQ_PAGE_DESCRIPTION
};

export default function FaqPage() {
	const faqItems = getAllFaqItems();
	const faqGroups = getFaqCategoryGroups(faqItems);

	return (
		<>
			<FaqSchema
				items={faqItems}
				id='faq-page-schema'
			/>

			<div className='layout-container py-8'>
				<Breadcrumbs
					items={[
						{ label: PAGE_INFO.HOME.title, href: PAGE_INFO.HOME.href },
						{ label: PAGE_INFO.FAQ.title, isCurrent: true }
					]}
					className='pb-3'
				/>
				<div className='max-w-[900px]'>
					<Title
						type='h1'
						className='mb-4 text-[32px] md:text-[44px]'
					>
						{FAQ_PAGE_TITLE}
					</Title>
					<p className='text-base leading-relaxed text-dark-gray md:text-lg'>
						Собрали частые вопросы по кровельным, фасадным и строительным работам, чтобы на одной
						странице были понятные ответы по стоимости, срокам, материалам, гарантии и документам.
					</p>
				</div>
			</div>

			<FaqBlock
				title='Частые вопросы по услугам компании'
				description='Вопросы сгруппированы по направлениям работ, чтобы быстро перейти к нужной теме и получить прямой ответ без лишней воды.'
				groups={faqGroups}
				className='border-t border-primary/8'
			/>
		</>
	);
}
