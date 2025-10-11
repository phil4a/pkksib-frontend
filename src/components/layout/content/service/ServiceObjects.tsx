import { Object } from '@/components/layout/content/object/Object';

import { Title } from '@/ui/title/Title';

import type { IObject } from '@/types/object.types';

interface Props {
	objects?: IObject[];
}

export function ServiceObjects({ objects }: Props) {
	return (
		<section>
			<div className='layout-container py-25'>
				<Title
					type='h2'
					className='mb-8'
				>
					Недавние реализованные объекты
				</Title>
				<div className='grid grid-cols-4 gap-5'>
					{objects?.slice(0, 4).map(object => (
						<Object
							key={object.id}
							item={object}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
