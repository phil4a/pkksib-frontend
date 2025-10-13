'use client';

import { Object as ObjectCard } from '@/components/layout/content/object/Object';

import { SkeletonLoader } from '@/ui/skeleton/SkeletonLoader';

import { useObjects } from '@/hooks/objects/useObjects';

export function ObjectsList() {
	const { objects, objectsLoading } = useObjects();

	if (objectsLoading) {
		return (
			<div className='grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
				<SkeletonLoader
					count={3}
					className='rounded-xl h-[360px]'
				/>
			</div>
		);
	}

	if (!objects.length) {
		return <div>Нет объектов по выбранным фильтрам</div>;
	}

	return (
		<div className='grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
			{objects.map(item => (
				<ObjectCard
					key={item.id}
					item={item}
				/>
			))}
		</div>
	);
}
