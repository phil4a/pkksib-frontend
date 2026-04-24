'use client';

import { useQuery } from '@tanstack/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';

import { objectService } from '@/services/object.service';
import type { IObjectCategory, IObjectLocation } from '@/types/object.types';

interface FiltersState {
	categorySlugs: string[];
	locations: string[];
}

export function useObjects() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();

	// Read filters from URL: categories (slugs) and locations (names)
	const filters = useMemo<FiltersState>(() => {
		const categoriesParam = searchParams.get('categories');
		const locationsParam = searchParams.get('locations');
		return {
			categorySlugs: categoriesParam ? categoriesParam.split(',').filter(Boolean) : [],
			locations: locationsParam ? locationsParam.split(',').filter(Boolean) : []
		};
	}, [searchParams]);

	// Setter to update URL query params when filters change
	const setFilters = useCallback(
		(next: Partial<FiltersState>) => {
			const params = new URLSearchParams(searchParams.toString());
			const nextCategories = next.categorySlugs ?? filters.categorySlugs;
			const nextLocations = next.locations ?? filters.locations;

			if (nextCategories.length) {
				params.set('categories', nextCategories.join(','));
			} else {
				params.delete('categories');
			}

			if (nextLocations.length) {
				params.set('locations', nextLocations.join(','));
			} else {
				params.delete('locations');
			}

			// Reset page to 1 on filter change
			params.delete('page');

			const query = params.toString();
			router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
		},
		[searchParams, router, pathname, filters]
	);

	// Load filter lists
	const { data: categoriesRes, isLoading: categoriesLoading } = useQuery({
		queryKey: ['object-categories'],
		queryFn: () => objectService.getCategories()
	});
	const categories: IObjectCategory[] = categoriesRes?.data?.data ?? [];

	// Try dedicated locations endpoint first; if it fails (404 or network), fallback to unique locations derived from objects
	const { data: locationsRaw = [], isLoading: locationsLoading } = useQuery<IObjectLocation[]>({
		queryKey: ['object-locations'],
		queryFn: () => objectService.getUniqueLocations()
	});
	// Deduplicate locations by name to avoid repeated checkboxes when multiple objects share the same location
	const locations: IObjectLocation[] = useMemo(() => {
		const byName = new Map<string, IObjectLocation>();
		for (const l of locationsRaw) {
			const key = (l.location || '').trim().toLowerCase();
			if (!key) continue;
			if (!byName.has(key)) byName.set(key, l);
		}
		return Array.from(byName.values()).sort((a, b) => a.location.localeCompare(b.location));
	}, [locationsRaw]);

	return {
		filters,
		setFilters,
		categories,
		categoriesLoading,
		locations,
		locationsLoading
	} as const;
}
