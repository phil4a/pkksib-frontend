import { Object } from '../object/Object';

import type { IObject } from '@/types/object.types';

interface Props {
	objects: IObject[];
	className?: string;
	title?: string;
}

export function RelatedObjects({ objects, className, title = 'Похожие проекты' }: Props) {
	if (!objects?.length) return null;

	return (
		<section className={className}>
			<div className='layout-container'>
				<h2 className='text-2xl font-semibold mb-6'>{title}</h2>
				<div className='grid md:grid-cols-3 gap-6'>
					{objects.map(item => (
						<Object
							key={item.slug}
							item={item}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
