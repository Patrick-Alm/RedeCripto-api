import { Database } from '@/core/database';
import { transfers } from '@/entities/transfer.schema';
import { usersToWallets } from '@/entities/users-to-wallets.schema';
import { wallets } from '@/entities/wallet.schema';
import { AlchemyPort } from '@/ports/alchemy';
import { AlchemyTransfer } from '@/ports/alchemy/transfer';
import type { SupportedNetwork } from '@/ports/alchemy/utils';
import { TransferDirection } from '@/types/transfer.types';
import type { Wallet } from '@/types/wallet.types';
import { and, eq } from 'drizzle-orm';

export default class WalletService {
	private _repository;
	private _alchemyPort: AlchemyPort;

	constructor() {
		this._repository = Database.getInstance().connection;

		this._alchemyPort = new AlchemyPort();
	}

	async create(payload: Wallet, userId: number) {
		const [existingWallet] = await this._repository
			.select()
			.from(wallets)
			.where(eq(wallets.address, payload.address))
			.limit(1);

		if (existingWallet) {
			const [existingRelation] = await this._repository
				.select()
				.from(usersToWallets)
				.where(
					and(
						eq(usersToWallets.userId, userId),
						eq(usersToWallets.walletId, existingWallet.id),
					),
				)
				.limit(1);

			if (!existingRelation) {
				await this._repository
					.insert(usersToWallets)
					.values({ userId, walletId: existingWallet.id });
			}

			return existingWallet;
		}

		const [newWallet] = await this._repository
			.insert(wallets)
			.values(payload)
			.returning();

		await this._repository.insert(usersToWallets).values({
			userId,
			walletId: newWallet.id,
		});

		const transfersList = await this.getWalletTransfers(
			payload.address,
			payload.network,
			newWallet.id,
		);

		await this._repository
			.insert(transfers)
			.values(transfersList)
			.onConflictDoNothing();

		return newWallet;
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

	private async getWalletTransfers(
		address: string,
		network: SupportedNetwork,
		walletId: number,
	) {
		try {
			const alchemy = this._alchemyPort.getAlchemy(network);
			const transferPort = new AlchemyTransfer(alchemy);

			const [transfersTo, transfersFrom] = await Promise.all([
				transferPort.getAssetTransfersTo(address),
				transferPort.getAssetTransfersFrom(address),
			]);

			const mappedTransfers = [];

			if (transfersTo.transfers) {
				for (const transfer of transfersTo.transfers) {
					mappedTransfers.push({
						...transfer,
						value: transfer.value?.toString(),
						walletId,
						direction: TransferDirection.SENT,
					});
				}
			}

			if (transfersFrom.transfers) {
				for (const transfer of transfersFrom.transfers) {
					mappedTransfers.push({
						...transfer,
						value: transfer.value?.toString(),
						walletId,
						direction: TransferDirection.RECEIVED,
					});
				}
			}

			return mappedTransfers;
		} catch (error) {
			console.error(
				`Error fetching transfers for wallet ${address} on ${network}:`,
				error,
			);
			throw new Error(
				`Failed to get transfers for wallet: ${(error as Error).message}`,
			);
		}
	}
}
