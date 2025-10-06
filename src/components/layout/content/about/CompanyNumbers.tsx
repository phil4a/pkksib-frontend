import { Title } from '@/ui/title/Title';

export function CompanyNumbers() {
	return (
		<section className='bg-dark-gray pt-20 pb-10'>
			<div className='layout-container text-white'>
				<div className='mb-16'>
					<Title
						type='h2'
						className='max-w-94 mb-8'
					>
						Компания в цифрах за 2025 год
					</Title>

					<div className='max-w-160'>
						<p className='mb-4'>
							Мы уже более 11 лет осуществляет кровельные и фасадные работы в Новосибирске и
							области. Наши мастера- это опытные специалисты с высокой квалификацией.
						</p>
						<p className='mb-4'>
							Они проходят сертификацию для работы с материалами европейского качества, что
							позволяет им качественно и быстро осуществлять установку кровельных и фасадных
							материалов.
						</p>
						<p>
							Наши специалисты подберут материал с учетом вашего бюджета, у нас найдется все — от
							флюгера до самореза!
						</p>
					</div>
				</div>
				<ul className='grid grid-cols-4 gap-5'>
					<li className='p-6 pt-5 bg-white/20 border-1 border-white/20 rounded-xl backdrop-blur-sm'>
						<p className='text-4xl font-semibold mb-2'>10000 м²</p>
						<p className='text-light-gray'>
							кровельных работ, из них по реконструкции более 5000 м²
						</p>
					</li>
					<li className='p-6 pt-5 bg-white/20 border-1 border-white/20 rounded-xl backdrop-blur-sm'>
						<p className='text-4xl font-semibold mb-2'>5000 м³</p>
						<p className='text-light-gray'>смонтированных домов из клееного и профильного бруса</p>
					</li>
					<li className='p-6 pt-5 bg-white/20 border-1 border-white/20 rounded-xl backdrop-blur-sm'>
						<p className='text-4xl font-semibold mb-2'>25000 м²</p>
						<p className='text-light-gray'>выполненных различных фасадных работ</p>
					</li>
					<li className='p-6 pt-5 bg-white/20 border-1 border-white/20 rounded-xl backdrop-blur-sm'>
						<p className='text-4xl font-semibold mb-2'>300</p>
						<p className='text-light-gray'>выполненных различных фасадных работ</p>
					</li>
				</ul>
			</div>
		</section>
	);
}
