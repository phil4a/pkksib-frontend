import type { FaqItem } from '@/types/faq.types';

interface FaqAccordionProps {
	items: readonly FaqItem[];
	questionHeading?: 'h3' | 'h4';
}

function renderAnswer(answer: string) {
	return answer
		.split(/\n{2,}/)
		.map(part => part.trim())
		.filter(Boolean)
		.map(part => (
			<p
				key={part}
				className='text-base leading-relaxed text-dark-gray'
			>
				{part}
			</p>
		));
}

export function FaqAccordion({ items, questionHeading = 'h3' }: FaqAccordionProps) {
	const QuestionHeading = questionHeading;

	return (
		<div className='space-y-3'>
			{items.map(item => (
				<details
					key={item.id}
					className='group rounded-md border border-primary/8 bg-white px-5 py-4 shadow-sm'
				>
					<summary className='flex cursor-pointer list-none items-start justify-between gap-4'>
						<QuestionHeading className='text-lg font-semibold leading-snug text-primary'>
							{item.question}
						</QuestionHeading>
						<span
							aria-hidden='true'
							className='mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border border-accent bg-accent/20 text-xl leading-none text-primary transition-transform duration-200 group-open:rotate-45'
						>
							+
						</span>
					</summary>
					<div className='mt-4 space-y-3 border-t border-primary/8 pt-4'>
						{renderAnswer(item.answer)}
					</div>
				</details>
			))}
		</div>
	);
}
