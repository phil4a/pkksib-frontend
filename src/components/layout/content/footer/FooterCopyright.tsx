'use client';

import { DphilSignature } from './DphilSignature';

export function FooterCopyright() {
	const currentYear = new Date().getFullYear();

	return (
		<div className='pt-6 mb-4 flex flex-col gap-6 justify-between 2xl:flex-row 2xl:items-center 2xl:mb-0'>
			<div className='text-dark-gray text-sm'>«Первая Кровельная Компания», {currentYear}</div>
			<DphilSignature className='shrink-0' />
		</div>
	);
}
