import { TransferController } from '@controllers/transfer.controller';
import type { Elysia } from 'elysia';

export class TransferModule {
	static setup(app: Elysia): void {
		const transferController = new TransferController();

		app.use(transferController.setup());
	}
}
