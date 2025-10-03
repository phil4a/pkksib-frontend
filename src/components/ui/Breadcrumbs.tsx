import Link from 'next/link';
import Script from 'next/script';

import type { CrumbItem } from '@/types/breadcrumbs';

interface Props {
	items: CrumbItem[];
	className?: string;
	showJsonLd?: boolean;
}

export function Breadcrumbs({ items, className, showJsonLd = true }: Props) {
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
			className={className}
		>
			<ol className='flex flex-wrap items-center gap-2 text-sm font-light text-dark-gray'>
				{items.map((item, idx) => (
					<li
						key={idx}
						className='flex items-center gap-2'
					>
						{item.href && !item.isCurrent ? (
							<Link
								href={item.href}
								className='hover:text-primary transition'
							>
								{item.label}
							</Link>
						) : (
							<span
								aria-current={item.isCurrent ? 'page' : undefined}
								className={item.isCurrent ? 'text-primary' : ''}
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
