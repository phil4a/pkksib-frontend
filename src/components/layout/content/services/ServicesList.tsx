import { ServiceCard } from './ServiceCard';
import type { IServiceCategory } from '@/types/service.types';

interface Props {
	categories: IServiceCategory[];
}

export function ServicesList({ categories }: Props) {
	if (!categories || categories.length === 0) return null;

	return (
		<section className='layout-container mb-25'>
			<div className='grid gap-5 grid-cols-4'>
				{categories.map(category => (
					<ServiceCard
						key={category.id}
						category={category}
					/>
				))}
			</div>
		</section>
	);
}
