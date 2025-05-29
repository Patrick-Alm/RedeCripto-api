import Walletcontroller from '@controllers/wallet.controller';
import type { Elysia } from 'elysia';

export class WalletModule {
	static setup(app: Elysia): void {
		const walletController = new Walletcontroller();

		app.use(walletController.setup());
	}
}
