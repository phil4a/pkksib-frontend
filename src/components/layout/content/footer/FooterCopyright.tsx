'use client';

export function FooterCopyright() {
	const currentYear = new Date().getFullYear();

	return (
		<div className='pt-6 text-dark-gray text-sm'>«Первая Кровельная Компания», {currentYear}</div>
	);
}
