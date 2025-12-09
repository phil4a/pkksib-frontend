'use client';

import Script from 'next/script';
import React, { useEffect, useRef } from 'react';

type SmartWidgetProps = {
	appId: string;
	className?: string;
	style?: React.CSSProperties;
	hideBranding?: boolean;
};

export default function SmartWidget({
	appId,
	className,
	style,
	hideBranding = true
}: SmartWidgetProps) {
	const containerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!hideBranding) return;

		const root = containerRef.current;
		if (!root) return;

		const removeBranding = () => {
			const selectors = [
				'.sw-app a[href*="utm_medium=createdby"]',
				'.sw-app a[href*="smartwidgets.ru"]',
				'.sw-app a:has(img[src*="sw_logo_grey.svg"])',
				'.sw-review-bottom a'
			];
			const elements = root.querySelectorAll(selectors.join(','));
			elements.forEach(el => {
				try {
					// Предпочтительно полностью удалить узел
					el.remove();
				} catch (_) {
					// В крайнем случае скрыть через инлайн-стили с !important
					const htmlEl = el as HTMLElement;
					htmlEl.style.setProperty('display', 'none', 'important');
					htmlEl.style.setProperty('opacity', '0', 'important');
					htmlEl.style.setProperty('visibility', 'hidden', 'important');
					htmlEl.style.setProperty('pointer-events', 'none', 'important');
					htmlEl.setAttribute('aria-hidden', 'true');
					(htmlEl as HTMLElement).tabIndex = -1;
				}
			});
		};

		// Первичная попытка скрытия
		removeBranding();

		// Наблюдаем мутации, т.к. виджет рендерится асинхронно
		const observer = new MutationObserver(() => removeBranding());
		observer.observe(root, { childList: true, subtree: true });

		return () => observer.disconnect();
	}, [hideBranding]);

	return (
		<div
			ref={containerRef}
			className={className}
			style={style}
		>
			{/* Загружаем скрипт SmartWidgets на клиенте */}
			<Script
				src='https://res.smartwidgets.ru/app.js'
				strategy='afterInteractive'
			/>

			{/* Контейнер виджета (инициализируется внешним скриптом) */}
			<div
				id={`sw-app-${appId}`}
				className='sw-app'
				data-app={appId}
			/>
		</div>
	);
}
