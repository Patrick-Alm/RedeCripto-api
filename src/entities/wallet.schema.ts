import { relations } from 'drizzle-orm';
import { integer, pgTable, text } from 'drizzle-orm/pg-core';
import { timestamps } from './columns.helpers';
import { transfers } from './transfer.schema';
import { usersToWallets } from './users-to-wallets.schema';

export const wallets = pgTable('wallets', {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	name: text('name').notNull(),
	network: text('network').notNull(),
	address: text('address').notNull(),
	...timestamps,
});

export const walletRelations = relations(wallets, ({ many }) => ({
	usersToWallets: many(usersToWallets),
	transfers: many(transfers),
}));
