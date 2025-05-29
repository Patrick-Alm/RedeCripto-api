import { Database } from '@/core/database';
import { usersToWallets } from '@/entities/users-to-wallets.schema';
import { wallets } from '@/entities/wallet.schema';
import type { Wallet } from '@/types/wallet.types';
import { and, eq } from 'drizzle-orm';

export default class WalletService {
	private _repository;

	constructor() {
		this._repository = Database.getInstance().connection;
	}

	async create(payload: Wallet, userId: number) {
		const existingWallet = await this._repository
			.select()
			.from(wallets)
			.where(eq(wallets.address, payload.address))
			.limit(1);

		let walletId: number;

		if (!existingWallet.length) {
			const [newWallet] = await this._repository
				.insert(wallets)
				.values(payload)
				.returning({ id: wallets.id });
			walletId = newWallet.id;
		} else {
			walletId = existingWallet[0].id;
		}

		const existingRelation = await this._repository
			.select()
			.from(usersToWallets)
			.where(
				and(
					eq(usersToWallets.userId, userId),
					eq(usersToWallets.walletId, walletId),
				),
			)
			.limit(1);

		if (!existingRelation.length) {
			await this._repository.insert(usersToWallets).values({
				userId,
				walletId,
			});
		}

		return { id: walletId, ...payload };
	}

	async getUserWallets(userId: number) {
		const userWallets = await this._repository
			.select({
				id: wallets.id,
				name: wallets.name,
				network: wallets.network,
				address: wallets.address,
			})
			.from(usersToWallets)
			.where(eq(usersToWallets.userId, userId))
			.leftJoin(wallets, eq(usersToWallets.walletId, wallets.id));

		console.log(userWallets);

		return userWallets;
	}
}
