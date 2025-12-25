import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useTransition } from 'react';
import type { SubmitHandler, UseFormReset } from 'react-hook-form';
import toast from 'react-hot-toast';

import { formService } from '@/services/order-form.service';
import type { IDirectorForm } from '@/types/form.types';

export function useDirectorForm(reset: UseFormReset<IDirectorForm>) {
	const [isPending, startTransition] = useTransition();

	const { mutateAsync, isPending: isSubmitting } = useMutation({
		mutationKey: ['director-form'],
		mutationFn: (data: IDirectorForm) => formService.sendDirector(data)
	});

	const onSubmit: SubmitHandler<IDirectorForm> = data => {
		toast.promise(mutateAsync(data), {
			loading: 'Отправка директору...',
			success: () => {
				startTransition(() => {
					reset();
				});
				return 'Сообщение отправлено! Директор рассмотрит его лично.';
			},
			error: error => {
				if (axios.isAxiosError(error)) {
					return error.response?.data.message || 'Ошибка отправки';
				}
				return 'Произошла ошибка';
			}
		});
	};

	const isLoading = isPending || isSubmitting;

	return {
		onSubmit,
		isLoading
	};
}
