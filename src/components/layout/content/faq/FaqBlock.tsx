import { FaqAccordion } from '@/components/layout/content/faq/FaqAccordion';

import { Title } from '@/ui/title/Title';

import { cn } from '@/lib/utils';
import type { FaqCategoryGroup, FaqItem } from '@/types/faq.types';

interface FaqBlockProps {
	title: string;
	description?: string;
	items?: readonly FaqItem[];
	groups?: readonly FaqCategoryGroup[];
	className?: string;
	containerClassName?: string;
}

export function FaqBlock({
	title,
	description,
	items,
	groups,
	className,
	containerClassName
}: FaqBlockProps) {
	const hasItems = Boolean(items?.length);
	const hasGroups = Boolean(groups?.length);

	if (!hasItems && !hasGroups) {
		return null;
	}

	return (
		<section className={cn('bg-light-gray', className)}>
			<div className={cn('layout-container py-12 lg:py-20', containerClassName)}>
				<div className='max-w-[860px]'>
					<Title
						type='h2'
						className='mb-4 text-[26px] md:text-[40px]'
					>
						{title}
					</Title>
					{description ? (
						<p className='mb-8 text-base leading-relaxed text-dark-gray md:text-lg'>
							{description}
						</p>
					) : null}
				</div>

				{hasGroups ? (
					<div className='space-y-10'>
						{groups?.map(group => (
							<section
								key={group.category.key}
								className='space-y-4'
							>
								<div className='max-w-[820px]'>
									<Title
										type='h3'
										className='mb-0 text-[22px] md:text-[30px]'
									>
										{group.category.title}
									</Title>
								</div>
								<FaqAccordion
									items={group.items}
									questionHeading='h4'
								/>
							</section>
						))}
					</div>
				) : (
					<FaqAccordion items={items ?? []} />
				)}
			</div>
		</section>
	);
}
