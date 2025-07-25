import { relations } from 'drizzle-orm';
import { integer, pgTable, text } from 'drizzle-orm/pg-core';
import { timestamps } from './columns.helpers';
import { usersToWallets } from './users-to-wallets.schema';

export const users = pgTable('users', {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	clerkId: text('clerk_id').notNull().unique(),
	email: text('email').unique(),
	firstName: text('first_name'),
	lastName: text('last_name'),
	telephone: text('telephone'),
	wallet: text('wallet'),
	username: text('username'),
	imageUrl: text('image_url'),
	lastSignInAt: text('last_sign_in_at'),
	birthday: text('birthday'),
	...timestamps,
});

export const userRelations = relations(users, ({ many }) => ({
	usersToWallets: many(usersToWallets),
}));
