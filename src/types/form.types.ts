export interface IOrderForm {
	name: string;
	phone: string;
	message?: string;
	source?: 'consult' | 'estimate' | 'quiz';
	serviceCategory?: string;
	serviceTitle?: string;
	quantity?: number;
	unit?: string;
	estimatedPrice?: number;
	pageUrl?: string;
}

export interface IDirectorForm {
	name: string;
	phone: string;
	email: string;
	message?: string;
}
