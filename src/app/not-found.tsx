import { ServiceCard } from '@/components/layout/content/services/ServiceCard';

import { Button } from '@/ui/button/Button';
import { Title } from '@/ui/title/Title';

import { PAGE } from '@/config/pages';

import { serviceService } from '@/services/service.service';
import type { IServiceCategory } from '@/types/service.types';

export default async function NotFoundPage() {
	let categories: IServiceCategory[] = [];

	try {
		const cats = await serviceService.getCategories();
		categories = cats?.data?.data ?? [];
	} catch {
		categories = [];
	}

	const topCategories = categories.slice(0, 6);

	return (
		<section className='layout-container'>
			<div className='mt-[30vh] flex flex-col items-center justify-center translate-y-[-5%] text-center'>
				<Title
					type='h1'
					position='center'
					className='mb-6'
				>
					Упс! Кажется, этой страницы нет. Но крыша у нас в порядке 🏠
				</Title>

				<Button
					type='black'
					href={PAGE.HOME}
				>
					На главную
				</Button>
			</div>

			{topCategories.length > 0 && (
				<div className='mt-12'>
					<p className='text-dark-gray text-center mb-6'>
						У нас много категорий услуг. Посмотрите, что может пригодиться:
					</p>
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
						{topCategories.map(cat => (
							<ServiceCard
								key={cat.id}
								item={cat}
							/>
						))}
					</div>
				</div>
			)}
		</section>
	);
}
