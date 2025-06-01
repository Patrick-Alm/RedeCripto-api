import { timestamp } from 'drizzle-orm/pg-core';

export const timestamps = {
	updatedAt: timestamp('updated_at'),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	deletedAt: timestamp('deleted_at'),
};
