import Link from 'next/link';
import Script from 'next/script';

import type { CrumbItem } from '@/types/breadcrumbs';

interface Props {
	items: CrumbItem[];
	color?: 'white' | 'default';
	className?: string;
	showJsonLd?: boolean;
}

export function Breadcrumbs({ items, color = 'default', className, showJsonLd = true }: Props) {
	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, idx) => ({
			'@type': 'ListItem',
			position: idx + 1,
			name: item.label,
			item: item.href || ''
		}))
	};

	return (
		<nav
			aria-label='Хлебные крошки'
			className={`overflow-y-auto ${className}`}
		>
			<ol
				className={`flex items-center gap-2 text-sm font-light ${color === 'white' ? 'text-white/60' : 'text-dark-gray'}`}
			>
				{items.map((item, idx) => (
					<li
						key={idx}
						className='flex items-center gap-2 whitespace-nowrap'
					>
						{item.href && !item.isCurrent ? (
							<Link
								href={item.href}
								className={`hover:text-primary transition-colors ${color === 'white' ? 'hover:text-white' : ''}`}
							>
								{item.label}
							</Link>
						) : (
							<span
								aria-current={item.isCurrent ? 'page' : undefined}
								className={`${item.isCurrent ? 'text-primary' : ''} ${color === 'white' ? 'text-white' : ''}`}
							>
								{item.label}
							</span>
						)}
						{idx < items.length - 1 && <span aria-hidden='true'>/</span>}
					</li>
				))}
			</ol>

			{showJsonLd && (
				<Script
					id='breadcrumb-jsonld'
					type='application/ld+json'
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
			)}
		</nav>
	);
}
