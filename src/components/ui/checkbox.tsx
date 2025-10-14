import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

const Checkbox = React.forwardRef<
	React.ElementRef<typeof CheckboxPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
	<CheckboxPrimitive.Root
		ref={ref}
		className={cn(
			'peer h-5 w-5 shrink-0 rounded-sm border border-dark-gray cursor-pointer',
			'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
			'disabled:cursor-not-allowed disabled:opacity-50',
			'data-[state=checked]:bg-primary data-[state=checked]:border-primary',
			className
		)}
		{...props}
	>
		<CheckboxPrimitive.Indicator className='flex items-center justify-center text-white'>
			<CheckIcon className='size-3.5' />
		</CheckboxPrimitive.Indicator>
	</CheckboxPrimitive.Root>
));

Checkbox.displayName = 'Checkbox';

export { Checkbox };
