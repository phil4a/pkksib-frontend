'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { ModalProvider } from '@/components/ui/modal/ModalProvider';

const client = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<QueryClientProvider client={client}>
			<ModalProvider>
				{children}
				<Toaster />
			</ModalProvider>
		</QueryClientProvider>
	);
}
