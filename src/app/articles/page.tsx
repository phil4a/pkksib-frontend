import type { Metadata } from 'next';

import { ArticlesHeading } from '@/components/layout/content/articles/ArticlesHeading';
import { ArticlesWrapper } from '@/components/layout/content/articles/ArticlesWrapper';

export const metadata: Metadata = {
	title: 'Интересные статьи о кровельных и фасадных работах',
	description:
		'В «Первой Кровельной Компании» помимо товаров для кровли европейского качества предоставляется ряд услуг. У нас имеются мастера, которые выполнят монтажные работы в Новосибирске и области.'
};

export default function ArticlesPage() {
	return (
		<section className='layout-container'>
			<ArticlesHeading />
			<ArticlesWrapper />
		</section>
	);
}
