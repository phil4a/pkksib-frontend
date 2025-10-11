import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Props {
	content?: string;
}

export function ServiceContent({ content }: Props) {
	return (
		<section className='bg-light-gray mt-20'>
			<div className='layout-container py-25'>
				<ReactMarkdown
					remarkPlugins={[remarkGfm]}
					components={{
						h1: ({ children }) => (
							<h1 className='text-3xl font-bold mb-6 text-primary'>{children}</h1>
						),
						h2: ({ children }) => (
							<h2 className='text-2xl font-semibold mb-4 text-primary'>{children}</h2>
						),
						h3: ({ children }) => (
							<h3 className='text-xl font-semibold mb-3 text-primary'>{children}</h3>
						),
						p: ({ children }) => <p className='text-base mb-4 leading-relaxed'>{children}</p>,
						ul: ({ children }) => (
							<ul className='list-disc pl-6 mb-4 space-y-2 marker:text-accent'>{children}</ul>
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
							<table className='w-full border-collapse text-base mb-6'>{children}</table>
						),
						thead: ({ children }) => <thead className='bg-accent'>{children}</thead>,
						tbody: ({ children }) => <tbody className='bg-white'>{children}</tbody>,
						tr: ({ children }) => <tr className='border border-light-gray'>{children}</tr>,
						th: ({ children }) => (
							<th className='text-left px-4 py-3 border border-light-gray font-semibold text-primary'>
								{children}
							</th>
						),
						td: ({ children }) => <td className='px-4 py-3 border border-light-gray'>{children}</td>
					}}
				>
					{content}
				</ReactMarkdown>
			</div>
		</section>
	);
}
