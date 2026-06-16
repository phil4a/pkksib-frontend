import { getObjectsInitialPagesData } from '@/utils/objects';

import { ObjectsFilters } from './ObjectsFilters';
import { ObjectsInfiniteList } from './ObjectsInfiniteList';
import { ObjectsMobileFilters } from './ObjectsMobileFilters';

interface ObjectsWrapperProps {
	searchParams: Record<string, string | string[] | undefined>;
}

export async function ObjectsWrapper({ searchParams }: ObjectsWrapperProps) {
	const { initialPages, pageCount, pageSize, requestedPage } = await getObjectsInitialPagesData(
		searchParams,
		{
			pageSize: 6,
			revalidate: 300,
			maxInitialPages: 10
		}
	);

	const categoriesRaw = Array.isArray(searchParams.categories)
		? searchParams.categories.join(',')
		: searchParams.categories;
	const locationsRaw = Array.isArray(searchParams.locations)
		? searchParams.locations.join(',')
		: searchParams.locations;

	const categorySlugs = (categoriesRaw || '').split(',').filter(Boolean);
	const locations = (locationsRaw || '').split(',').filter(Boolean);

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
					<ObjectsInfiniteList
						initialPages={initialPages}
						pageCount={pageCount}
						pageSize={pageSize}
						requestedPage={requestedPage}
						categorySlugs={categorySlugs}
						locations={locations}
					/>
				</div>
			</div>
		</section>
	);
}
