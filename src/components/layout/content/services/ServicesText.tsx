import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { Title } from '@/ui/title/Title';

interface Props {
	text?: string;
}

export function ServicesText({ text }: Props) {
	return (
		<section className='bg-light-gray'>
			<div className='layout-container py-12 lg:py-20'>
				{text ? (
					<ReactMarkdown
						remarkPlugins={[remarkGfm]}
						components={{
							h1: ({ children }) => (
								<h1 className='text-[22px] lg:text-[28px] font-bold mb-6 text-primary'>
									{children}
								</h1>
							),
							h2: ({ children }) => (
								<h2 className='text-2xl font-semibold mb-4 mt-6 text-primary'>{children}</h2>
							),
							h3: ({ children }) => (
								<h3 className='text-xl font-semibold mb-3 mt-6 text-primary'>{children}</h3>
							),
							p: ({ children }) => (
								<p className='text-base space-y-4 leading-relaxed'>{children}</p>
							),
							ul: ({ children }) => (
								<ul className='list-disc pl-6 mb-4 mt-2 space-y-2 marker:text-accent'>
									{children}
								</ul>
							),
							ol: ({ children }) => (
								<ol className='list-decimal pl-6 mb-4 space-y-2 marker:text-accent'>{children}</ol>
							),
							li: ({ children }) => <li className='text-base leading-relaxed'>{children}</li>,
							strong: ({ children }) => (
								<strong className='font-semibold text-primary'>{children}</strong>
							),
							em: ({ children }) => <em className='italic text-dark-gray'>{children}</em>,
							blockquote: ({ children }) => (
								<blockquote className='border-l-4 border-accent pl-4 py-2 my-4 bg-white/50 italic'>
									{children}
								</blockquote>
							),
							table: ({ children }) => (
								<div
									className='w-full overflow-x-auto'
									style={{ WebkitOverflowScrolling: 'touch' }}
								>
									<table className='border-collapse text-base mb-6 mt-2'>{children}</table>
								</div>
							),
							thead: ({ children }) => <thead className='bg-accent'>{children}</thead>,
							tbody: ({ children }) => <tbody className='bg-white'>{children}</tbody>,
							tr: ({ children }) => <tr className='border border-light-gray'>{children}</tr>,
							th: ({ children }) => (
								<th className='text-left px-4 py-3 border border-light-gray font-semibold text-primary'>
									{children}
								</th>
							),
							td: ({ children }) => (
								<td className='px-4 py-3 border border-light-gray'>{children}</td>
							),
							// Embed video player for .mp4 links
							a: ({ href, children }) => {
								const raw = String(href || '').trim();
								const url = raw.replace(/^['"`]+|['"`]+$/g, '');
								if (url.toLowerCase().endsWith('.mp4')) {
									return (
										<span className='block my-4'>
											<video
												src={url}
												controls
												preload='metadata'
												playsInline
												className='rounded-lg bg-black'
											>
												Sorry, your browser does not support embedded videos.
											</video>
										</span>
									);
								}
								return (
									<a
										href={url}
										target='_blank'
										rel='noopener noreferrer'
										className='text-primary underline underline-offset-4 hover:text-accent transition-colors'
									>
										{children}
									</a>
								);
							}
						}}
					>
						{text}
					</ReactMarkdown>
				) : (
					<>
						<Title
							type='h2'
							className='text-[22px] lg:text-[28px] mb-4 lg:mb-6'
						>
							Первая Кровельная Компания предоставляет следующие услуги
						</Title>
						<div className='text-dark-gray mb-8'>
							<ul className='list-disc pl-6 mb-4 space-y-1'>
								<li>Монтаж и ремонт кровли любой сложности и конфигурации</li>
								<li>
									Монтаж кровли, как частного домостроения, так и промышленного (склады, амбары,
									цеха и прочее)
								</li>
								<li>Фасадные работы</li>
								<li>Строительство домов под ключ</li>
								<li>Монтаж водосточных систем</li>
								<li>Монтаж мансардных окон</li>
							</ul>
							<p className='mb-2'>
								Наши специалисты имеют многолетний профессиональный опыт в строительстве и каждый
								год проходят повышение квалификации в данном направлении.
							</p>
							<p>
								В процессе оказания услуг, мы используем материалы только от авторитетных и
								проверенных поставщиков.
							</p>
						</div>
						<Title
							type='h2'
							className='text-[22px] lg:text-[28px] mb-4 lg:mb-6'
						>
							Мы предлагаем нашим клиентам
						</Title>
						<div className='text-dark-gray mb-8'>
							<p className='mb-2'>
								Наши услуги по кровле и монтажу в Новосибирске и области, помимо указанных выше,
								включают еще ряд полезных и востребованных направлений, которые вам могут предложить
								далеко не все компании:
							</p>
							<ul className='list-disc pl-6 mb-4 space-y-1'>
								<li>тепловизионное обследование кровли и фасада на предмет утечки тепла</li>
								<li>обследование крыш на предмет обнаружения дефектов</li>
								<li>сервисное обслуживание кровли</li>
							</ul>
							<p className='mb-2'>
								Если вы столкнулись с некачественным монтажом или у вас наступил срок ремонта
								кровли, наши специалисты проведут профессиональную экспертизу на предмет обнаружения
								дефектов, предложат варианты решения вашей проблемы и рассчитают стоимость.
							</p>
							<p className='mb-2'>
								Наша компания предоставляет услуги по кровельным и фасадным работам в Новосибирске и
								области уже на протяжении долгого времени, что дает нам право гарантировать высокое
								качество выполнения работ.
							</p>
							<p>
								Для заказа наших услуг позвоните нам, либо оставьте заявку на нашем сайте и мы
								поможем решить все ваши вопросы, подберем необходимые материалы, и рассчитаем
								стоимость работ.
							</p>
						</div>
					</>
				)}
			</div>
		</section>
	);
}
