import { Unbounded } from 'next/font/google';
import type { CSSProperties } from 'react';

const unbounded = Unbounded({ subsets: ['cyrillic', 'latin'], weight: '700', display: 'swap' });

export interface DphilSignatureProps {
	variant?: 'developed-by' | 'made-at';
	className?: string;
	style?: CSSProperties;
}

const IDLE_TEXT: Record<NonNullable<DphilSignatureProps['variant']>, string> = {
	'developed-by': 'Разработка — ',
	'made-at': 'Сделано в '
};

export function DphilSignature({
	variant = 'developed-by',
	className,
	style
}: DphilSignatureProps) {
	const href = `https://dphil.ru`;

	return (
		<>
			<a
				href={href}
				target='_blank'
				rel='noopener'
				className={`dphil-sig ${className ?? ''}`}
				style={style}
			>
				<span
					className='dphil-dot'
					aria-hidden
				/>
				<span className='dphil-swap'>
					<span className='dphil-a'>
						{IDLE_TEXT[variant]}
						<b className={`dphil-mark ${unbounded.className}`}>
							dphil<i className='dphil-accent'>.</i>ru
						</b>
					</span>
					<span
						className='dphil-b'
						aria-hidden
					>
						Нужен такой же? →
					</span>
				</span>
			</a>

			<style>{`
				.dphil-sig{
					display:inline-flex;align-items:center;gap:.5em;
					font:500 13px/1 ui-monospace,"SF Mono",Menlo,Consolas,monospace;
					color:currentColor;text-decoration:none;letter-spacing:.02em;
					opacity:.72;transition:opacity .3s ease;
				}
				.dphil-sig:hover{opacity:1}
				.dphil-mark{font-weight:700;letter-spacing:-.01em}
				.dphil-accent{font-style:normal;color:#facc15}
				.dphil-dot{position:relative;width:7px;height:7px;flex:0 0 auto;border-radius:50%;background:#2dd4bf}
				.dphil-dot::after{content:"";position:absolute;inset:0;border-radius:50%;background:#2dd4bf;
					animation:dphil-ping 1.8s cubic-bezier(0,0,.2,1) infinite}
				.dphil-swap{display:grid}
				.dphil-swap>span{grid-area:1/1;transition:opacity .35s ease,transform .35s ease}
				.dphil-b{opacity:0;transform:translateY(6px);color:#2dd4bf;white-space:nowrap}
				.dphil-a{opacity:1;transform:translateY(0)}
				.dphil-sig:hover .dphil-a{opacity:0;transform:translateY(-6px)}
				.dphil-sig:hover .dphil-b{opacity:1;transform:translateY(0)}
				@keyframes dphil-ping{75%,100%{transform:scale(2.4);opacity:0}}
				@media (prefers-reduced-motion:reduce){
					.dphil-dot::after{animation:none}
					.dphil-swap>span{transition:opacity .2s ease}
					.dphil-sig:hover .dphil-a,.dphil-sig:hover .dphil-b{transform:none}
				}
			`}</style>
		</>
	);
}
