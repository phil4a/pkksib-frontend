'use client';

import dynamic from 'next/dynamic';

import { SkeletonLoader } from '@/ui/skeleton/SkeletonLoader';

const ObjectsMapDynamic = dynamic(() => import('./ObjectsMap').then(m => m.ObjectsMap), {
	ssr: false,
	loading: () => (
		<div className='layout-container mt-16'>
			<SkeletonLoader className='h-90 sm:h-140 md:h-150 w-full rounded-xl' />
		</div>
	)
});

export function LazyObjectsMap() {
	return <ObjectsMapDynamic />;
}
