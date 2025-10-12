import type { InputHTMLAttributes } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

import { cn } from '@/lib/utils';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	error?: string;
	registration: UseFormRegisterReturn;
}

export function Field({ error, registration, ...props }: Props) {
    return (
        <div className='w-full'>
            <input
                className={cn(
                    'w-full py-3 px-4 rounded-sm bg-white border border-light-gray focus:outline-none focus:border-accent transition-colors',
                    {
                        'border-red-500': error
                    }
                )}
                {...registration}
                {...props}
            />
            <p
                aria-live='polite'
                className={cn('text-sm mt-1 min-h-[20px]', {
                    'text-red-600': !!error,
                    'opacity-0': !error
                })}
            >
                {error || ''}
            </p>
        </div>
    );
}
