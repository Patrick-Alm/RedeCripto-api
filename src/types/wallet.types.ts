import { t } from 'elysia';

export const walletSchema = t.Object({
	name: t.String(),
	network: t.String(),
	address: t.String(),
});

export type Wallet = typeof walletSchema.static;
