import Link from 'next/link';
import type { ButtonHTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

interface Props extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
    href?: string;
    children: React.ReactNode;
    type: 'accent' | 'black';
    className?: string;
    isLoading?: boolean;
}

export function Button({ children, className, type, href, isLoading, disabled: disabledProp, ...props }: Props) {
    const isDisabled = !!isLoading || !!disabledProp;

    const styles = cn(
        'inline-flex items-center font-semibold h-12 px-6 rounded-lg transition',
        type === 'black' ? 'bg-primary text-white' : 'bg-accent',
        isDisabled ? 'cursor-not-allowed' : 'cursor-pointer hover:brightness-95',
        'disabled:bg-gray-300',
        className
    );

	if (href) {
		return (
			<Link
				href={href}
				className={styles}
			>
				{children}
			</Link>
		);
	}

    return (
        <button
            className={styles}
            disabled={isDisabled}
            {...props}
        >
            {isLoading ? 'Отправка...' : children}
        </button>
    );
}
