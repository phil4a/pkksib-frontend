import type { Metadata } from 'next';

import { ArticlesContent } from '@/components/layout/content/articles/ArticlesContent';
import { ArticlesHeading } from '@/components/layout/content/articles/ArticlesHeading';

export const metadata: Metadata = {
	title: 'Интересные статьи о кровельных и фасадных работах',
	description:
		'В «Первой Кровельной Компании» помимо товаров для кровли европейского качества предоставляется ряд услуг. У нас имеются мастера, которые выполнят монтажные работы в Новосибирске и области.'
};

export default function ArticlesPage() {
	return (
		<section className='layout-container'>
			<ArticlesHeading />
			<ArticlesContent />
		</section>
	);
}
