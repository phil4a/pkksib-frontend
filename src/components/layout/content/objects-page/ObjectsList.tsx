import { Object as ObjectCard } from '@/components/layout/content/object/Object';

import type { IObject } from '@/types/object.types';

interface ObjectsListProps {
	objects: IObject[];
}

export function ObjectsList({ objects }: ObjectsListProps) {
	if (!objects.length) {
		return <div className='mt-8'>Нет объектов по выбранным фильтрам</div>;
	}

	return (
		<div className='mt-8 grid gap-x-5 gap-y-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
			{objects.map(item => (
				<ObjectCard
					key={item.id}
					item={item}
				/>
			))}
		</div>
	);
}
