import Image from 'next/image';

import { Button } from '@/ui/button/Button';
import { Title } from '@/ui/title/Title';

import type { IObject } from '@/types/object.types';

interface HeroProps {
	object: IObject | null;
}

export function Hero({ object }: HeroProps) {
	if (!object) {
		return (
			<section className='bg-white'>
				<div className='layout-container pt-8 pb-20'>
					<div>Объект не найден</div>
				</div>
			</section>
		);
	}
	return (
		<section>
			<div className='layout-container pt-8 pb-20'>
				<div>Breadcrumbs</div>
				<div className='mt-8'>
					<div className='flex gap-5'>
						<div className='flex-1/2  relative aspect-[4/3] rounded-xl overflow-hidden'>
							<Image
								src={object?.photos?.[0]?.url || ''}
								alt={object?.title || ''}
								fill
								priority={true}
								className='object-cover'
							/>
						</div>
						<div className='p-12 flex-1/2 flex flex-col justify-between gap-25 bg-light-gray rounded-xl'>
							<div>
								<Title
									type='h1'
									className='text-4xl font-semibold mb-6'
								>
									{object?.title}
								</Title>
								<p className='text-dark-gray mb-7'>{object?.description}</p>
								<Button type='accent'>Оставить заявку</Button>
							</div>
							<div className='grid grid-cols-2 gap-5'>
								<div className='flex gap-3 items-center'>
									<svg
										width='40'
										height='40'
										viewBox='0 0 40 40'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<rect
											width='40'
											height='40'
											rx='8'
											transform='matrix(-1 0 0 1 40 0)'
											fill='#21282B'
										/>
										<path
											d='M11 17.8377C11 17.5024 11.1511 17.185 11.4114 16.9736L19.2984 10.5697C19.7072 10.2377 20.2928 10.2377 20.7016 10.5697L28.5886 16.9736C28.8489 17.185 29 17.5024 29 17.8377V27.887C29 28.5017 28.5017 29 27.887 29H12.113C11.4983 29 11 28.5017 11 27.887V17.8377Z'
											fill='#FCD200'
										/>
									</svg>
									<div>
										<p className='text-dark-gray'>Вид работ</p>
										<p>замена кровли</p>
									</div>
								</div>
								<div className='flex gap-3 items-center'>
									<svg
										width='40'
										height='40'
										viewBox='0 0 40 40'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<rect
											width='40'
											height='40'
											rx='8'
											transform='matrix(-1 0 0 1 40 0)'
											fill='#21282B'
										/>
										<path
											d='M20.001 9.56525C14.2381 9.56525 9.56652 14.2369 9.56641 19.9998C9.56641 25.7628 14.238 30.4344 20.001 30.4344C25.7639 30.4344 30.4355 25.7628 30.4355 19.9998C30.4354 14.2369 25.7639 9.56525 20.001 9.56525ZM20.001 19.9998H26.0879V21.7391H18.2627V13.9129H20.001V19.9998Z'
											fill='#FCD200'
										/>
									</svg>

									<div>
										<p className='text-dark-gray'>Срок</p>
										<p>{object?.time}</p>
									</div>
								</div>
								<div className='flex gap-3 items-center'>
									<svg
										width='40'
										height='40'
										viewBox='0 0 40 40'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<rect
											width='40'
											height='40'
											rx='8'
											transform='matrix(-1 0 0 1 40 0)'
											fill='#21282B'
										/>
										<path
											d='M20.0003 28.6956H12.754C11.9536 28.6956 11.3047 28.0468 11.3047 27.2464V12.7536C11.3047 11.9532 11.9536 11.3043 12.754 11.3043H18.5511C19.3515 11.3043 20.0003 11.9532 20.0003 12.7536V28.6956Z'
											fill='#FCD200'
										/>
										<path
											d='M28.696 21.4492C28.696 20.6488 28.0471 20 27.2467 20H20.0003V28.6956H27.2467C28.0471 28.6956 28.696 28.0468 28.696 27.2464V21.4492Z'
											fill='#FCD200'
										/>
									</svg>

									<div>
										<p className='text-dark-gray'>Объем</p>
										<p>{object?.area} м²</p>
									</div>
								</div>
								<div className='flex gap-3 items-center'>
									<svg
										width='40'
										height='40'
										viewBox='0 0 40 40'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<rect
											width='40'
											height='40'
											rx='8'
											transform='matrix(-1 0 0 1 40 0)'
											fill='#21282B'
										/>
										<path
											d='M20 9.56525C15.1976 9.56525 11.3049 13.4582 11.3047 18.2606C11.3047 23.0494 19.9508 30.3927 20 30.4344C20.0492 30.3927 28.6953 23.0494 28.6953 18.2606C28.6951 13.4582 24.8024 9.56525 20 9.56525ZM20 15.6522C21.4406 15.6522 22.6082 16.82 22.6084 18.2606C22.6084 19.7013 21.4407 20.8699 20 20.8699C18.5593 20.8699 17.3916 19.7013 17.3916 18.2606C17.3918 16.82 18.5594 15.6522 20 15.6522Z'
											fill='#FCD200'
										/>
									</svg>

									<div>
										<p className='text-dark-gray'>Локация</p>
										<p>{object?.location?.location}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
