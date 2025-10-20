import { Object } from '@/components/layout/content/object/Object';

import { Title } from '@/ui/title/Title';

import type { IObject } from '@/types/object.types';

interface Props {
	objects?: IObject[];
}

export function ServiceObjects({ objects }: Props) {
	return (
		<section>
			<div className='layout-container pt-16 md:pt-20'>
				<Title
					type='h2'
					className='mb-6 md:mb-8'
				>
					Свежие проекты
				</Title>
				<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
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
