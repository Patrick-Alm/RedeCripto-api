import { BaseController } from '@/core/abstracts/base-controller';
import TransferService from '@services/transfer.service';

export class TransferController extends BaseController {
	private _transferService: TransferService;

	constructor() {
		super({
			prefix: '/transfers',
			tags: ['Transfer'],
		});

		this._transferService = new TransferService();
	}

	routes() {
		this.router.get('/wallet/:walletId', async (ctx) => {
			try {
				const { userId } = ctx.store as { userId: number };
				const { walletId } = ctx.params;

				const response = await this._transferService.getTransfersByWallet(
					Number(walletId),
					userId,
				);

				ctx.set.status = 'OK';

				return response;
			} catch (error) {
				console.log(error);

				ctx.set.status = 500;
				return { error };
			}
		});
		this.router.get('/user', async (ctx) => {
			try {
				const { userId } = ctx.store as { userId: number };

				const response =
					await this._transferService.getAllUserTransfers(userId);

				ctx.set.status = 'OK';

				return response;
			} catch (error) {
				console.log(error);

				ctx.set.status = 500;
				return { error };
			}
		});
	}

	setup() {
		this.routes();

		return this.router;
	}
}
