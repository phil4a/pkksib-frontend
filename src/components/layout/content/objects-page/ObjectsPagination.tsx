"use client";

import { Button } from '@/ui/button/Button';
import { useObjects } from '@/hooks/objects/useObjects';

export function ObjectsPagination() {
	const { page, pageCount, setPage, total } = useObjects();

	if (pageCount <= 1) return null;

	const canPrev = page > 1;
	const canNext = page < pageCount;

	return (
		<div className='flex items-center justify-between mt-8'>
			<div className='text-sm text-gray-500'>Всего: {total}</div>
			<div className='flex gap-2'>
				<Button type='accent' disabled={!canPrev} onClick={() => canPrev && setPage(page - 1)}>
					Назад
				</Button>
				<div className='px-3 py-2 rounded bg-light-gray text-black'>
					Страница {page} из {pageCount}
				</div>
				<Button type='accent' disabled={!canNext} onClick={() => canNext && setPage(page + 1)}>
					Вперёд
				</Button>
			</div>
		</div>
	);
}
