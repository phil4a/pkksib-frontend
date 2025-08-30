import axios, { type CreateAxiosDefaults } from 'axios';

import { API_INTERNAL_URL, API_URL, IS_CLIENT } from '@/constants/constants';

// Базовые опции для всех инстансов
const baseOptions: CreateAxiosDefaults = {
	headers: {
		'Content-Type': 'application/json'
	},
	withCredentials: true
};

// Внешний API (для клиентских запросов)
const externalOptions: CreateAxiosDefaults = {
	...baseOptions,
	baseURL: API_URL
};

// Внутренний API (для серверных запросов)
const internalOptions: CreateAxiosDefaults = {
	...baseOptions,
	baseURL: API_INTERNAL_URL || API_URL
};

// Основной инстанс для клиентских запросов
export const axiosClassic = axios.create(externalOptions);

// Инстанс для внутренних серверных запросов
export const axiosInternal = axios.create(internalOptions);

// Универсальная функция, которая выбирает нужный инстанс
export const axiosInstance = IS_CLIENT ? axiosClassic : axiosInternal;
