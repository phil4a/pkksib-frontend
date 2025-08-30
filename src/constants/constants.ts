export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || '';
export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const API_INTERNAL_URL = process.env.API_INTERNAL_URL;

export const IS_CLIENT = typeof window !== 'undefined';
