'use client';

import { useMemo } from 'react';

import { Checkbox } from '@/components/ui/checkbox';

import { useObjects } from '@/hooks/objects/useObjects';

import type { IObjectCategory, IObjectLocation } from '@/types/object.types';

export function ObjectsFilters() {
	const { filters, setFilters, categories, categoriesLoading, locations, locationsLoading } =
		useObjects();

	const categoryMap = useMemo<Record<string, boolean>>(
		() => Object.fromEntries(categories.map(c => [c.slug, filters.categorySlugs.includes(c.slug)])),
		[categories, filters.categorySlugs]
	);
	const locationMap = useMemo<Record<string, boolean>>(
		() =>
			Object.fromEntries(locations.map(l => [l.location, filters.locations.includes(l.location)])),
		[locations, filters.locations]
	);

	const onToggleCategory = (slug: string) => {
		const next = new Set(filters.categorySlugs);
		if (next.has(slug)) next.delete(slug);
		else next.add(slug);
		setFilters({ categorySlugs: Array.from(next) });
	};
	const onToggleLocation = (location: string) => {
		const next = new Set(filters.locations);
		if (next.has(location)) next.delete(location);
		else next.add(location);
		setFilters({ locations: Array.from(next) });
	};

	return (
		<div className='pr-6'>
			<div className='mb-7'>
				<p className='font-semibold mb-3'>Тип объектов</p>
				{categoriesLoading ? (
					<div className='space-y-2'>
						<div className='bg-light-gray h-6 rounded-sm animate-pulse' />
						<div className='bg-light-gray h-6 rounded-sm animate-pulse' />
					</div>
				) : (
					<ul className='space-y-2'>
						{categories.map((c: IObjectCategory) => (
							<li key={c.id}>
								<label className='flex items-center gap-2 lowercase cursor-pointer'>
									<Checkbox
										checked={!!categoryMap[c.slug]}
										onCheckedChange={() => onToggleCategory(c.slug)}
										aria-label={c.title}
									/>
									<span>{c.title}</span>
								</label>
							</li>
						))}
					</ul>
				)}
			</div>
			<div>
				<p className='font-semibold mb-3'>Регион</p>
				{locationsLoading ? (
					<div className='space-y-2'>
						<div className='bg-light-gray h-6 rounded-sm animate-pulse' />
						<div className='bg-light-gray h-6 rounded-sm animate-pulse' />
					</div>
				) : (
					<ul className='space-y-2'>
						{locations.map((l: IObjectLocation) => (
							<li key={l.id}>
								<label className='flex items-center gap-2 cursor-pointer'>
									<Checkbox
										checked={!!locationMap[l.location]}
										onCheckedChange={() => onToggleLocation(l.location)}
										aria-label={l.location}
									/>
									<span>{l.location}</span>
								</label>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
}
