import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useTransition } from 'react';
import type { SubmitHandler, UseFormReset } from 'react-hook-form';
import toast from 'react-hot-toast';

import { formService } from '@/services/order-form.service';
import type { IOrderForm } from '@/types/form.types';

export function useOrderForm(reset: UseFormReset<IOrderForm>) {
	const [isPending, startTransition] = useTransition();

	const { mutateAsync, isPending: isSubmitting } = useMutation({
		mutationKey: ['order-form'],
		mutationFn: (data: IOrderForm) => formService.send(data)
	});

	const onSubmit: SubmitHandler<IOrderForm> = data => {
		toast.promise(mutateAsync(data), {
			loading: 'Отправка...',
			success: () => {
				startTransition(() => {
					reset();
				});
				return 'Спасибо за обращение!\n Мы свяжемся с Вами в ближайшее время 📞';
			},
			error: error => {
				if (axios.isAxiosError(error)) {
					return error.response?.data.message;
				}
			}
		});
	};

	const isLoading = isPending || isSubmitting;

	return {
		onSubmit,
		isLoading
	};
}
