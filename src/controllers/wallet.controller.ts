import { BaseController } from '@/core/abstracts/base-controller';
import { clerkMiddleware } from '@/middlewares/clerk';
import { walletSchema } from '@/types/wallet.types';
import WalletService from '@services/wallet.service';

export class Walletcontroller extends BaseController {
	private _walletService: WalletService;

	constructor() {
		super({
			prefix: '/wallets',
			tags: ['Wallet'],
		});

		this._walletService = new WalletService();
	}

	routes() {
		this.router.post(
			'/',
			async (ctx) => {
				try {
					const { userId } = ctx.store as { userId: number };

					const response = await this._walletService.create(ctx.body, userId);

					ctx.set.status = 'Created';

					return response;
				} catch (error) {
					console.log(error);

					ctx.set.status = 500;
					return { error };
				}
			},
			{
				beforeHandle: clerkMiddleware,
				body: walletSchema,
			},
		);

		this.router.get(
			'/',
			async (ctx) => {
				try {
					const { userId } = ctx.store as { userId: number };

					const response = await this._walletService.getUserWallets(userId);

					ctx.set.status = 'OK';
					return response;
				} catch (error) {
					console.log(error);

					ctx.set.status = 500;
					return { error };
				}
			},
			{
				beforeHandle: clerkMiddleware,
			},
		);
	}

	setup() {
		this.routes();
		return this.router;
	}
}

export default Walletcontroller;
