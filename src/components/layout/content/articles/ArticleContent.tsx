import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import type { IArticle } from '@/types/article.types';

export function ArticleContent({ article }: { article: IArticle }) {
	return (
		<div className='mt-12 lg:mt-16 mb-16 lg:mb-25'>
			<ReactMarkdown
				remarkPlugins={[remarkGfm]}
				components={{
					h1: ({ children }) => (
						<h1 className='text-3xl font-bold mt-10 mb-6 text-primary max-w-[860px]'>{children}</h1>
					),
					h2: ({ children }) => (
						<h2 className='text-2xl font-semibold mt-12 mb-4 text-primary max-w-[860px]'>
							{children}
						</h2>
					),
					h3: ({ children }) => (
						<h3 className='text-xl font-semibold mt-10 mb-3 text-primary max-w-[860px]'>
							{children}
						</h3>
					),
					p: ({ children }) => (
						<p className='text-base leading-relaxed mb-4 max-w-[860px]'>{children}</p>
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
					em: ({ children }) => <em className='italic text-dark-gray max-w-[860px]'>{children}</em>,
					blockquote: ({ children }) => (
						<blockquote className='relative bg-primary text-white p-10 pb-6 mb-10 font-semibold rounded-md'>
							{children}
							<svg
								className='absolute -bottom-8 -right-8'
								width='286'
								height='122'
								viewBox='0 0 286 122'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M195.55 18.1468C199.396 13.7271 206.12 13.7271 209.966 18.1468L347.514 176.23C353.094 182.644 348.671 192.83 340.306 192.83H65.2098C56.8448 192.83 52.4218 182.644 58.0021 176.23L195.55 18.1468Z'
									fill='white'
									fillOpacity='0.1'
								/>
								<path
									d='M130.324 3.16219C134.193 -1.05406 140.981 -1.05406 144.849 3.16219L177.566 38.8159L73.6752 158.22H9.74699C1.34741 158.22 -3.10386 148.577 2.48436 142.486L130.324 3.16219Z'
									fill='white'
									fillOpacity='0.05'
								/>
							</svg>
						</blockquote>
					),
					table: ({ children }) => (
						<table className='w-full border-collapse text-base mb-6 max-w-[860px]'>
							{children}
						</table>
					),
					thead: ({ children }) => <thead className='bg-accent max-w-[860px]'>{children}</thead>,
					tbody: ({ children }) => <tbody className='bg-white max-w-[860px]'>{children}</tbody>,
					tr: ({ children }) => (
						<tr className='border border-light-gray max-w-[860px]'>{children}</tr>
					),
					th: ({ children }) => (
						<th className='text-left px-4 py-3 border border-light-gray font-semibold text-primary max-w-[860px]'>
							{children}
						</th>
					),
					td: ({ children }) => (
						<td className='px-4 py-3 border border-light-gray max-w-[860px]'>{children}</td>
					),
					img: props => {
						const { src, alt } = props as { src?: unknown; alt?: string };
						const url = typeof src === 'string' ? src : undefined;
						if (!url) return null;
						return (
							<Image
								src={url}
								alt={alt || ''}
								width={1300}
								height={700}
								className='rounded-xl my-6 object-cover'
								sizes='(max-width: 860px) 100vw, 860px'
							/>
						);
					}
				}}
			>
				{article.full_description}
			</ReactMarkdown>
		</div>
	);
}
