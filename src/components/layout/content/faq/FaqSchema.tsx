import Script from 'next/script';

import type { FaqItem } from '@/types/faq.types';

interface FaqSchemaProps {
	items: readonly FaqItem[];
	id?: string;
}

export function FaqSchema({ items, id = 'faq-schema' }: FaqSchemaProps) {
	if (!items.length) {
		return null;
	}

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: items.map(item => ({
			'@type': 'Question',
			name: item.question,
			acceptedAnswer: {
				'@type': 'Answer',
				text: item.answer
			}
		}))
	};

	return (
		<Script
			id={id}
			type='application/ld+json'
			dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
		/>
	);
}
