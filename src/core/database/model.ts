import { table } from './tables';
import { spreads } from './utils';

export const db = {
	insert: spreads(
		{
			user: table.user,
		},
		'insert',
	),
	select: spreads(
		{
			user: table.user,
		},
		'select',
	),
} as const;
