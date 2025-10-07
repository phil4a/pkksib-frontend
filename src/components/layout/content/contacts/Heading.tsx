import { Breadcrumbs } from '@/ui/Breadcrumbs';
import { Title } from '@/ui/title/Title';

export function Heading() {
	return (
		<div>
			<Breadcrumbs
				items={[
					{ label: 'Главная', href: '/' },
					{ label: 'Контакты', href: '/contacts', isCurrent: true }
				]}
				className='mb-3'
			></Breadcrumbs>
			<Title
				type='h1'
				className='mb-0'
			>
				Контакты
			</Title>
		</div>
	);
}
