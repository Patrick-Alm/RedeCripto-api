import { user } from '@/entities/user';

export const table = {
	user,
} as const;

export type Table = typeof table;
