import { relations } from 'drizzle-orm';
import { integer, pgTable, text } from 'drizzle-orm/pg-core';
import { usersToWallets } from './users-to-wallets.schema';

export const wallets = pgTable('wallets', {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	name: text('name').notNull(),
	network: text('network').notNull(),
	address: text('address').notNull(),
});

export const walletRelations = relations(wallets, ({ many }) => ({
	usersToWallets: many(usersToWallets),
}));
