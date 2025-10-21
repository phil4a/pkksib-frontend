'use client';

import React from 'react';

export const ContactsMarker: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
	return (
		<div
			className='transform -translate-x-1/2 -translate-y-full cursor-pointer select-none'
			role='button'
			aria-label='Метка контакта'
			onClick={onClick}
		>
			<svg
				width='30'
				height='40'
				viewBox='0 0 30 40'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<g clipPath='url(#clip0_26_8311)'>
					<path
						d='M15 40C15 40 30 29.2308 30 15.3846C30 11.3044 28.4196 7.39123 25.6066 4.50605C22.7936 1.62087 18.9782 0 15 0C11.0218 0 7.20644 1.62087 4.3934 4.50605C1.58035 7.39123 0 11.3044 0 15.3846C0 29.2308 15 40 15 40Z'
						fill='#21282B'
					/>
					<path
						d='M15 20C17.7614 20 20 17.7614 20 15C20 12.2386 17.7614 10 15 10C12.2386 10 10 12.2386 10 15C10 17.7614 12.2386 20 15 20Z'
						fill='#FCD200'
					/>
				</g>
				<defs>
					<clipPath id='clip0_26_8311'>
						<rect
							width='30'
							height='40'
							fill='white'
						/>
					</clipPath>
				</defs>
			</svg>
		</div>
	);
};
