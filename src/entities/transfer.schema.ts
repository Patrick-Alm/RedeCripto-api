import { relations } from 'drizzle-orm';
import { decimal, integer, pgTable, text } from 'drizzle-orm/pg-core';
import { timestamps } from './columns.helpers';
import { wallets } from './wallet.schema';

export const transfers = pgTable('transfers', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
	blockNum: text('block_num'),
	uniqueId: text('unique_id').unique(),
	hash: text(),
	from: text(),
	to: text(),
	value: decimal({ precision: 78, scale: 30 }),
	tokenId: text(),
	asset: text(),
	category: text(),
	walletId: integer('wallet_id'),
	direction: text(),
	...timestamps,
});

export const transfersRelations = relations(transfers, ({ one }) => ({
	wallet: one(wallets, {
		fields: [transfers.walletId],
		references: [wallets.id],
	}),
}));
