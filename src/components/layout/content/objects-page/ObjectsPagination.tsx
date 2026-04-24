import Link from 'next/link';

interface ObjectsPaginationProps {
	page: number;
	pageCount: number;
	searchParams: Record<string, string | string[] | undefined>;
}

export function ObjectsPagination({ page, pageCount, searchParams }: ObjectsPaginationProps) {
	const buildHref = (p: number) => {
		const params = new URLSearchParams();
		for (const [key, value] of Object.entries(searchParams)) {
			if (value === undefined) continue;
			if (Array.isArray(value)) params.set(key, value.join(','));
			else params.set(key, value);
		}

		if (p > 1) params.set('page', String(p));
		else params.delete('page');

		const query = params.toString();
		return query ? `/objects?${query}` : '/objects';
	};

	const items: Array<number | 'ellipsis'> = (() => {
		if (pageCount <= 7) {
			return Array.from({ length: pageCount }, (_, i) => i + 1);
		}
		if (page <= 3) {
			return [1, 2, 3, 4, 'ellipsis', pageCount];
		}
		if (page >= pageCount - 2) {
			return [1, 'ellipsis', pageCount - 3, pageCount - 2, pageCount - 1, pageCount];
		}
		return [1, 'ellipsis', page - 1, page, page + 1, 'ellipsis', pageCount];
	})();

	if (pageCount <= 1) return null;

	return (
		<div className='flex items-center justify-center mt-8'>
			<nav
				className='flex gap-2'
				aria-label='Пагинация объектов'
			>
				{items.map((item, idx) => {
					if (item === 'ellipsis') {
						return (
							<span
								key={`e-${idx}`}
								className='px-3 py-2 text-gray-500'
							>
								…
							</span>
						);
					}
					const p = item as number;
					const isActive = p === page;
					return (
						<Link
							key={p}
							href={buildHref(p)}
							prefetch
							aria-current={isActive ? 'page' : undefined}
							className={`px-3 py-2 rounded-md border transition ${
								isActive
									? 'bg-accent border-accent text-dark'
									: 'bg-white border-light-gray text-primary hover:bg-[#f7f7f7]'
							}`}
						>
							{p}
						</Link>
					);
				})}
			</nav>
		</div>
	);
}
