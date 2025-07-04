import cors from '@elysiajs/cors';
import swagger from '@elysiajs/swagger';
import { ExampleModule } from '@modules/example.module';
import { TransferModule } from '@modules/transfer.module';
import { UserModule } from '@modules/user.module';
import { WalletModule } from '@modules/wallet.module';
import Elysia from 'elysia';
import { Database } from '../database';

export class Application {
	private _port: number;
	private _db: Database;

	_app: Elysia;

	constructor() {
		this._port = Number(Bun.env['PORT'] || 3001);
		this._db = Database.getInstance();

		this._app = new Elysia();
	}

	async start() {
		await this.setupMiddleware();
		await this.setupSwagger();
		await this.setupRoutes();

		this._app.listen(this._port);

		console.log(
			`Server is running at ${this._app.server?.hostname}:${this._port}`,
		);
	}

	private async setupRoutes() {
		this._app.get('/health-check', () => ({
			status: 'healthy',
			timestamp: new Date().toISOString(),
		}));

		ExampleModule.setup(this._app);
		UserModule.setup(this._app);
		WalletModule.setup(this._app);
		TransferModule.setup(this._app);
	}

	private async setupMiddleware() {
		this._app.use(cors());
	}

	private async setupSwagger() {
		this._app.use(
			swagger({
				path: '/docs',
				documentation: {
					info: {
						title: 'Rede Cripto',
						version: '1.0.0',
						description: 'API documentation for Rede Cripto.',
					},
					tags: [
						{
							name: 'Example',
							description: 'Operations related to example',
						},
						{
							name: 'User',
							description: 'Operations related to user',
						},
					],
				},
			}),
		);
	}
}
