import ReactMarkdown from 'react-markdown';

interface Props {
	description: string;
}

export function PageContent({ description }: Props) {
	return (
		<section className='bg-light-gray py-20'>
			<div className='layout-container'>
				{description && (
					<div className='prose prose-lg max-w-none'>
						<ReactMarkdown
							components={{
								h1: ({ children }) => (
									<h1 className='text-3xl font-bold mb-6 text-primary max-w-[860px]'>{children}</h1>
								),
								h2: ({ children }) => (
									<h2 className='text-2xl font-semibold mb-4 text-primary max-w-[860px]'>
										{children}
									</h2>
								),
								h3: ({ children }) => (
									<h3 className='text-xl font-semibold mb-3 text-primary max-w-[860px]'>
										{children}
									</h3>
								),
								p: ({ children }) => (
									<p className='text-base mb-4 leading-relaxed max-w-[860px]'>{children}</p>
								),
								ul: ({ children }) => (
									<ul className='list-disc pl-6 mb-4 space-y-2 marker:text-accent max-w-[860px]'>
										{children}
									</ul>
								),
								ol: ({ children }) => (
									<ol className='list-decimal pl-6 mb-4 space-y-2 marker:text-accent max-w-[860px]'>
										{children}
									</ol>
								),
								li: ({ children }) => (
									<li className='text-base leading-relaxed max-w-[860px]'>{children}</li>
								),
								strong: ({ children }) => (
									<strong className='font-semibold text-primary max-w-[860px]'>{children}</strong>
								),
								em: ({ children }) => <em className='italic text-dark-gray'>{children}</em>,
								blockquote: ({ children }) => (
									<blockquote className='border-l-4 border-accent pl-4 py-2 my-4 bg-white/50 italic'>
										{children}
									</blockquote>
								)
							}}
						>
							{description}
						</ReactMarkdown>
					</div>
				)}
			</div>
		</section>
	);
}
