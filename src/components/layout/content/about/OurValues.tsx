import { Title } from '@/ui/title/Title';

export function OurValues() {
	return (
		<div className='relative overflow-hidden mt-16 lg:mt-20 bg-accent p-12 rounded-xl'>
			<Title
				type='h2'
				className='mb-6 md:mb-10'
			>
				Наши ценности
			</Title>
			<div className='relative z-1'>
				<ul className='flex flex-col md:flex-row gap-4 md:gap-10'>
					<li className='flex gap-3 items-center'>
						<div className='shrink-0 flex items-center justify-center bg-primary h-9 w-9 rounded-lg'>
							<svg
								width='22'
								height='20'
								viewBox='0 0 22 20'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M5.71289 19.9998H2.71484C1.61027 19.9998 0.714844 19.1043 0.714844 17.9998V10.5125C0.714844 9.40788 1.61027 8.51245 2.71484 8.51245H5.71289V19.9998ZM13.6572 0.0300293C14.809 0.366086 15.5066 1.55407 15.1328 2.69409C13.9137 6.41063 12.4675 7.63605 12.4414 7.65796H18.2842C20.2179 7.65796 21.6466 9.46094 21.2051 11.3435L19.7178 17.6843C19.3996 19.0403 18.1897 19.9987 16.7969 19.9988H6.77734V8.53784C9.06853 4.75192 10.9745 4.39342 12.7402 0.4646C12.8979 0.114126 13.2883 -0.0775602 13.6572 0.0300293Z'
									fill='#FCD200'
								/>
							</svg>
						</div>
						<p className='font-semibold'>экологичность</p>
					</li>
					<li className='flex gap-3 items-center'>
						<div className='shrink-0 flex items-center justify-center bg-primary h-9 w-9 rounded-lg'>
							<svg
								width='22'
								height='20'
								viewBox='0 0 22 20'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M5.71289 19.9998H2.71484C1.61027 19.9998 0.714844 19.1043 0.714844 17.9998V10.5125C0.714844 9.40788 1.61027 8.51245 2.71484 8.51245H5.71289V19.9998ZM13.6572 0.0300293C14.809 0.366086 15.5066 1.55407 15.1328 2.69409C13.9137 6.41063 12.4675 7.63605 12.4414 7.65796H18.2842C20.2179 7.65796 21.6466 9.46094 21.2051 11.3435L19.7178 17.6843C19.3996 19.0403 18.1897 19.9987 16.7969 19.9988H6.77734V8.53784C9.06853 4.75192 10.9745 4.39342 12.7402 0.4646C12.8979 0.114126 13.2883 -0.0775602 13.6572 0.0300293Z'
									fill='#FCD200'
								/>
							</svg>
						</div>
						<p className='font-semibold'>безопасность труда</p>
					</li>
					<li className='flex gap-3 items-center'>
						<div className='shrink-0 flex items-center justify-center bg-primary h-9 w-9 rounded-lg'>
							<svg
								width='22'
								height='20'
								viewBox='0 0 22 20'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M5.71289 19.9998H2.71484C1.61027 19.9998 0.714844 19.1043 0.714844 17.9998V10.5125C0.714844 9.40788 1.61027 8.51245 2.71484 8.51245H5.71289V19.9998ZM13.6572 0.0300293C14.809 0.366086 15.5066 1.55407 15.1328 2.69409C13.9137 6.41063 12.4675 7.63605 12.4414 7.65796H18.2842C20.2179 7.65796 21.6466 9.46094 21.2051 11.3435L19.7178 17.6843C19.3996 19.0403 18.1897 19.9987 16.7969 19.9988H6.77734V8.53784C9.06853 4.75192 10.9745 4.39342 12.7402 0.4646C12.8979 0.114126 13.2883 -0.0775602 13.6572 0.0300293Z'
									fill='#FCD200'
								/>
							</svg>
						</div>
						<p className='font-semibold'>инновационные материалы</p>
					</li>
				</ul>
			</div>
			<svg
				width='350'
				height='192'
				viewBox='0 0 350 192'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
				className='absolute -bottom-9 right-0'
			>
				<path
					d='M296.119 27.4795C301.942 20.7868 312.124 20.7868 317.948 27.4795L526.235 266.863C534.685 276.575 527.987 292 515.32 292H98.7461C86.0791 292 79.3814 276.575 87.8316 266.863L296.119 27.4795Z'
					fill='white'
					fillOpacity='0.15'
				/>
				<path
					d='M197.348 4.78846C203.206 -1.59615 213.485 -1.59615 219.343 4.78846L268.885 58.7784L111.565 239.59H14.7597C2.04037 239.59 -4.70013 224.987 3.76203 215.765L197.348 4.78846Z'
					fill='white'
					fillOpacity='0.1'
				/>
			</svg>
		</div>
	);
}
