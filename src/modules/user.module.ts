import UserController from '@controllers/user.controller';
import type { Elysia } from 'elysia';

export class UserModule {
	static setup(app: Elysia): void {
		const userController = new UserController();

		app.use(userController.setup());
	}
}
