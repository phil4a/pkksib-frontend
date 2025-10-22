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
								<li>Монтаж фасада</li>
								<li>Изготовление и монтаж металлических конструкций</li>
								<li>Устройство мягких и жестких кровель</li>
								<li>Шумо- и теплоизоляционные работы</li>
								<li>Ремонт и реконструкция кровельных систем</li>
							</ul>
						</div>
					</>
				)}
			</div>
		</section>
	);
}
