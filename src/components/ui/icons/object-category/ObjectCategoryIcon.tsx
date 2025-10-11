import React from 'react';

interface Props {
	slug?: string;
	className?: string;
}

// Базовая иконка (дом) как fallback
function DefaultIcon(_props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			width='18'
			height='16'
			viewBox='0 0 18 16'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M2.7 16H15.3V7.11111H18L9 0L0 7.11111H2.7V16Z'
				fill='#21282B'
			/>
		</svg>
	);
}

function AdministrativeIcon(_props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			width='18'
			height='17'
			viewBox='0 0 18 17'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M0 7H18L9 3L0 7Z'
				fill='#21282B'
			/>
			<rect
				x='2'
				y='7'
				width='2'
				height='10'
				fill='#21282B'
			/>
			<rect
				x='6'
				y='7'
				width='2'
				height='10'
				fill='#21282B'
			/>
			<rect
				x='8.5'
				y='2'
				width='1'
				height='2'
				fill='#21282B'
			/>
			<rect
				x='8.5'
				y='2.38745'
				width='2'
				height='3'
				transform='rotate(-90 8.5 2.38745)'
				fill='#21282B'
			/>
			<rect
				x='10'
				y='7'
				width='2'
				height='10'
				fill='#21282B'
			/>
			<rect
				x='14'
				y='7'
				width='2'
				height='10'
				fill='#21282B'
			/>
			<rect
				x='17'
				y='15'
				width='2'
				height='16'
				transform='rotate(90 17 15)'
				fill='#21282B'
			/>
		</svg>
	);
}

function ProductionIcon(_props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			width='16'
			height='15'
			viewBox='0 0 16 15'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M0 15H16V5L4.68794e-05 6.91919L0 15Z'
				fill='#21282B'
			/>
			<path
				d='M2 2H4L5 10H1L2 2Z'
				fill='#21282B'
			/>
			<path
				d='M7 1H9L10 9H6L7 1Z'
				fill='#21282B'
			/>
			<path
				d='M12 0H14L15 8H11L12 0Z'
				fill='#21282B'
			/>
		</svg>
	);
}

function TurnkeyHouseIcon(_props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			width='18'
			height='16'
			viewBox='0 0 18 16'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M9.98438 1.69238C9.36884 2.46213 9 3.43776 9 4.5C9 6.45912 10.2525 8.12428 12 8.74219V14.5L13.5 16L15 14.5V5.11133L13.3594 3.99219C12.8353 3.94342 12.3906 3.62568 12.1631 3.17773L9.98438 1.69238ZM0 5.11133V16H10.6719L10 15.3281V9.97559C8.19801 8.82214 7 6.80379 7 4.5C7 3.02006 7.49521 1.6561 8.32812 0.563477L7.5 0L0 5.11133Z'
				fill='#21282B'
			/>
			<path
				d='M13.5 0C11.0147 0 9 2.01472 9 4.5C9 6.45912 10.2525 8.12428 12 8.74219V14.5L13.5 16L15 14.5V8.74219C16.7475 8.12428 18 6.45912 18 4.5C18 2.01472 15.9853 0 13.5 0ZM13.5 1C14.3284 1 15 1.67157 15 2.5C15 3.32843 14.3284 4 13.5 4C12.6716 4 12 3.32843 12 2.5C12 1.67157 12.6716 1 13.5 1Z'
				fill='#21282B'
			/>
		</svg>
	);
}

function CottageIcon(_props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			width='18'
			height='16'
			viewBox='0 0 18 16'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M2.7 16H15.3V7.11111H18L9 0L0 7.11111H2.7V16Z'
				fill='#21282B'
			/>
		</svg>
	);
}

// Карта соответствий slug → иконка.

const ICONS: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
	administrativnye: AdministrativeIcon,
	proizvodstvennye: ProductionIcon,
	'doma-pod-kluch': TurnkeyHouseIcon,
	kottedzhi: CottageIcon
};

export function ObjectCategoryIcon({ slug, className }: Props) {
	const Icon = (slug && ICONS[slug]) || DefaultIcon;
	return <Icon className={className} />;
}
