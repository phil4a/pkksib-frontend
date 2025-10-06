'use client';

import { Button } from '@/ui/button/Button';
import { Title } from '@/ui/title/Title';

interface Props {
	onPrev: () => void;
	onNext: () => void;
	canPrev?: boolean;
	canNext?: boolean;
}

export function TeamHeading({ onPrev, onNext, canPrev = true, canNext = true }: Props) {
	return (
		<div className='mb-8 flex gap-5 items-center justify-between'>
			<Title
				type='h2'
				className='mb-0'
			>
				Наша команда
			</Title>
			<div className='flex gap-2'>
				<Button
					onClick={onPrev}
					type='accent'
					disabled={!canPrev}
					className={`flex items-center justify-center w-10 h-10 p-0`}
				>
					<svg
						width='10'
						height='16'
						viewBox='0 0 10 16'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M9 15L2 8L9 1'
							stroke='#21282B'
							strokeWidth='2'
						/>
					</svg>
				</Button>
				<Button
					onClick={onNext}
					type='accent'
					disabled={!canNext}
					className='flex items-center justify-center w-10 h-10 p-0'
				>
					<svg
						width='10'
						height='16'
						viewBox='0 0 10 16'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M1 15L8 8L1 1'
							stroke='#21282B'
							strokeWidth='2'
						/>
					</svg>
				</Button>
			</div>
		</div>
	);
}
