import { relations } from 'drizzle-orm';
import { integer, pgTable, primaryKey } from 'drizzle-orm/pg-core';
import { users } from './user.schema';
import { wallets } from './wallet.schema';

export const usersToWallets = pgTable(
	'users_to_wallets',
	{
		userId: integer('user_id')
			.notNull()
			.references(() => users.id),
		walletId: integer('wallet_id')
			.notNull()
			.references(() => wallets.id),
	},
	(t) => [primaryKey({ columns: [t.userId, t.walletId] })],
);

export const usersToWalletsRelations = relations(usersToWallets, ({ one }) => ({
	wallet: one(wallets, {
		fields: [usersToWallets.walletId],
		references: [wallets.id],
	}),
	user: one(users, {
		fields: [usersToWallets.userId],
		references: [users.id],
	}),
}));
