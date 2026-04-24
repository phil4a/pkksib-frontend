import { getObjectsPageData } from '@/utils/objects';

import { ObjectsFilters } from './ObjectsFilters';
import { ObjectsList } from './ObjectsList';
import { ObjectsMobileFilters } from './ObjectsMobileFilters';
import { ObjectsPagination } from './ObjectsPagination';

interface ObjectsWrapperProps {
	searchParams: Record<string, string | string[] | undefined>;
}

export async function ObjectsWrapper({ searchParams }: ObjectsWrapperProps) {
	const { objects, page, pageCount } = await getObjectsPageData(searchParams, {
		pageSize: 9,
		revalidate: 300
	});

	return (
		<section className='mb-25'>
			<ObjectsMobileFilters />

			{/* Десктопные фильтры */}
			<div className='relative flex gap-5 items-start'>
				<div className='hidden md:block md:sticky md:top-[calc(var(--header-height)+60px)] md:self-start flex-1/4'>
					<div className='md:max-h-[calc(100dvh-var(--header-height))] md:overflow-y-auto'>
						<ObjectsFilters />
					</div>
				</div>
				<div className='flex-3/4'>
					<ObjectsList objects={objects} />
				</div>
			</div>
			<div>
				<ObjectsPagination
					page={page}
					pageCount={pageCount}
					searchParams={searchParams}
				/>
			</div>
		</section>
	);
}
