import Link from 'next/link';

import { Title } from '@/ui/title/Title';

export function AboutCertificates() {
	return (
		<section className='py-25'>
			<div className='layout-container'>
				<div className='flex gap-5 justify-between'>
					<Title
						type='h2'
						className='flex-1/3'
					>
						Сертификаты
					</Title>
					<ul className='flex-2/3 flex flex-col gap-2'>
						<li>
							<Link
								href={'123'}
								className='flex gap-4 items-center py-4 px-5 bg-light-gray rounded-lg group hover:bg-primary hover:text-white transition-colors'
							>
								<div className='flex items-center justify-center text-center bg-primary w-10 h-10 text-white rounded-lg group-hover:bg-accent group-hover:text-primary transition-colors'>
									<span className='font-semibold'>pdf</span>
								</div>
								<div className='flex flex-col'>
									<Title
										type='h3'
										className='text-base font-semibold mb-0.5'
									>
										Название сертификата
									</Title>
									<p className='text-sm text-text'>
										Описание сертификата. Что подтверждает/удостоверят данный сертификат
									</p>
								</div>
							</Link>
						</li>
						<li>
							<Link
								href={'123'}
								className='flex gap-4 items-center py-4 px-5 bg-light-gray rounded-lg group hover:bg-primary hover:text-white transition-colors'
							>
								<div className='flex items-center justify-center text-center bg-primary w-10 h-10 text-white rounded-lg group-hover:bg-accent group-hover:text-primary transition-colors'>
									<span className='font-semibold'>pdf</span>
								</div>
								<div className='flex flex-col'>
									<Title
										type='h3'
										className='text-base font-semibold mb-0.5'
									>
										Название сертификата
									</Title>
									<p className='text-sm text-text'>
										Описание сертификата. Что подтверждает/удостоверят данный сертификат
									</p>
								</div>
							</Link>
						</li>
						<li>
							<Link
								href={'123'}
								className='flex gap-4 items-center py-4 px-5 bg-light-gray rounded-lg group hover:bg-primary hover:text-white transition-colors'
							>
								<div className='flex items-center justify-center text-center bg-primary w-10 h-10 text-white rounded-lg group-hover:bg-accent group-hover:text-primary transition-colors'>
									<span className='font-semibold'>pdf</span>
								</div>
								<div className='flex flex-col'>
									<Title
										type='h3'
										className='text-base font-semibold mb-0.5'
									>
										Название сертификата
									</Title>
									<p className='text-sm text-text'>
										Описание сертификата. Что подтверждает/удостоверят данный сертификат
									</p>
								</div>
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</section>
	);
}
