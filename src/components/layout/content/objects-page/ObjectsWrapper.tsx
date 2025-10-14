'use client';

import { ObjectsFilters } from './ObjectsFilters';
import { ObjectsList } from './ObjectsList';
import { ObjectsPagination } from './ObjectsPagination';

export function ObjectsWrapper() {
	return (
		<section className='mb-25'>
			<div className='flex gap-5'>
				<div className='flex-1/4'>
					<ObjectsFilters />
				</div>
				<div className='flex-3/4'>
					<ObjectsList />
				</div>
			</div>
			<div>
				<ObjectsPagination />
			</div>
		</section>
	);
}
