import { cn } from '@/lib/utils'

export type ContactsViewMode = 'list' | 'map'

interface ContactsSwitchProps {
	active: ContactsViewMode
	onChange: (mode: ContactsViewMode) => void
}

export function ContactsSwitch({ active, onChange }: ContactsSwitchProps) {
	return (
		<div className='flex md:hidden gap-10 py-4 pt-8'>
			<button
				type='button'
				className={cn('flex items-center gap-2', active === 'list' ? 'text-primary font-semibold' : 'text-dark-gray')}
				onClick={() => onChange('list')}
				aria-pressed={active === 'list'}
			>
				<svg
					width='24'
					height='24'
					viewBox='0 0 24 24'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path d='M8 18L21 18' stroke='currentColor' strokeWidth='2' strokeLinejoin='round' />
					<path d='M4 18H4.002V18.002H4V18Z' stroke='currentColor' strokeWidth='2' />
					<path d='M8 12L21 12' stroke='currentColor' strokeWidth='2' strokeLinejoin='round' />
					<path d='M4 12H4.002V12.002H4V12Z' stroke='currentColor' strokeWidth='2' />
					<path d='M8 6L21 6' stroke='currentColor' strokeWidth='2' strokeLinejoin='round' />
					<path d='M4 6H4.002V6.002H4V6Z' stroke='currentColor' strokeWidth='2' />
				</svg>
				Список
			</button>
			<button
				type='button'
				className={cn('flex items-center gap-2', active === 'map' ? 'text-primary font-semibold' : 'text-dark-gray')}
				onClick={() => onChange('map')}
				aria-pressed={active === 'map'}
			>
				<svg
					width='24'
					height='24'
					viewBox='0 0 24 24'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M15 6L21 3V18L15 21V6Z'
						stroke='currentColor'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
					<path
						d='M9 18L15 21V6L9 3V18Z'
						stroke='currentColor'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
					<path
						d='M3 6L9 3V18L3 21V6Z'
						stroke='currentColor'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</svg>
				Карта
			</button>
		</div>
	)
}
