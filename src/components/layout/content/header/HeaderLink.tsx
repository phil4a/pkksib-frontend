import Link from 'next/link';
import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

type NextLinkProps = ComponentProps<typeof Link>;

interface Props extends Omit<NextLinkProps, 'children'> {
    secondary?: boolean;
    children: React.ReactNode;
}

export function HeaderLink({ href, secondary, children, className, ...rest }: Props) {
    return (
        <Link
            className={cn(
                'flex items-center gap-2 hover:text-primary transition',
                secondary && 'text-dark-gray',
                className
            )}
            href={href}
            {...rest}
        >
            {children}
        </Link>
    );
}
