import { Database } from '@/core/database';
import { transfers } from '@/entities/transfer.schema';
import { usersToWallets } from '@/entities/users-to-wallets.schema';
import { and, eq, inArray } from 'drizzle-orm';

export default class TransferService {
	private _repository;

	constructor() {
		this._repository = Database.getInstance().connection;
	}

	async getTransfersByWallet(walletId: number, userId: number) {
		const userWalletRelation = await this._repository
			.select({ wallet: usersToWallets.walletId })
			.from(usersToWallets)
			.where(
				and(
					eq(usersToWallets.userId, userId),
					eq(usersToWallets.walletId, walletId),
				),
			);

		if (!userWalletRelation.length) {
			return {
				error: 'User does not have access to this wallet',
				transfers: [],
			};
		}

		const walletTransfers = await this._repository
			.select()
			.from(transfers)
			.where(eq(transfers.walletId, walletId));

		return walletTransfers;
	}

	async getAllUserTransfers(userId: number) {
		const userWalletRelation = await this._repository
			.select({ wallet: usersToWallets.walletId })
			.from(usersToWallets)
			.where(eq(usersToWallets.userId, userId));

		if (!userWalletRelation.length) {
			return {
				error: 'User does not have access to this wallet',
				transfers: [],
			};
		}

		const walletsIds = userWalletRelation.map((relation) => relation.wallet);

		const walletsTransfers = await this._repository
			.select()
			.from(transfers)
			.where(inArray(transfers.walletId, walletsIds));

		return walletsTransfers;
	}
}
