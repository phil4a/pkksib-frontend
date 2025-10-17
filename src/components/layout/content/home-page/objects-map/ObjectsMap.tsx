import { Title } from '@/ui/title/Title';

import MapComponent from './MapComponent';

export function ObjectsMap() {
	return (
		<section>
			<div className='layout-container my-16 lg:my-25'>
				<Title type='h2'>Наши объекты</Title>
				<p className='text-dark-gray mb-8'>
					Мы завершили более 300 строительных объектов по всей Сибири.
				</p>
				<MapComponent />
			</div>
		</section>
	);
}
