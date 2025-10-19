import { ServiceCard } from './ServiceCard';
import type { IService, IServiceCategory } from '@/types/service.types';

interface Props {
	items: IServiceCategory[] | IService[];
}

export function ServicesList({ items }: Props) {
	if (!items || items.length === 0) return null;

	return (
		<section className='layout-container mb-16 md:mb-20 lg:mb-25'>
			<div className='grid gap-4 md:gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 '>
				{items.map(item => (
					<ServiceCard
						key={item.id}
						item={item}
					/>
				))}
			</div>
		</section>
	);
}
