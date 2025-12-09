'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { useEffect } from 'react';

type YmInitOptions = {
	clickmap?: boolean;
	trackLinks?: boolean;
	accurateTrackBounce?: boolean;
	webvisor?: boolean;
};

type YmFunction = {
	(counterId: number, method: 'init', options: YmInitOptions): void;
	(counterId: number, method: 'hit', url: string, params?: Record<string, unknown>): void;
};

declare global {
	interface Window {
		ym?: YmFunction;
	}
}

const YM_ID = process.env.NEXT_PUBLIC_YM_ID;

export function YandexMetrica() {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const isProd = process.env.NODE_ENV === 'production';
	const shouldRender = isProd && !!YM_ID;

	// Send SPA hits on route changes
	useEffect(() => {
		if (!shouldRender || typeof window === 'undefined' || !window.ym) return;
		const url =
			pathname + (searchParams && searchParams.toString() ? `?${searchParams.toString()}` : '');
		try {
			window.ym(Number(YM_ID), 'hit', url);
		} catch {}
	}, [pathname, searchParams, shouldRender]);

	return shouldRender ? (
		<>
			<Script
				id='ym-tag'
				strategy='afterInteractive'
				dangerouslySetInnerHTML={{
					__html: `
              (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0];
              k.async=1;k.src=r;a.parentNode.insertBefore(k,a)})(window,document,'script','https://mc.yandex.ru/metrika/tag.js','ym');
              ym(${YM_ID}, 'init', {
                clickmap: true,
                trackLinks: true,
                accurateTrackBounce: true,
                webvisor: true
              });
            `
				}}
			/>
			<noscript>
				<div>
					<img
						src={`https://mc.yandex.ru/watch/${YM_ID}`}
						style={{ position: 'absolute', left: '-9999px' }}
						alt=''
					/>
				</div>
			</noscript>
		</>
	) : null;
}
