import { ServiceCard } from './ServiceCard';
import type { IService, IServiceCategory } from '@/types/service.types';

interface Props {
	items: IServiceCategory[] | IService[];
}

export function ServicesList({ items }: Props) {
	if (!items || items.length === 0) return null;

	return (
		<section className='layout-container mb-25'>
			<div className='grid gap-5 grid-cols-4'>
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
