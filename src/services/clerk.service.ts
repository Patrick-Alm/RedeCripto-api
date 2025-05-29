import { Database } from '@/core/database';
import { users } from '@/entities/user.schema';
import { eq } from 'drizzle-orm';

export default class ClerkService {
	private _repository;

	constructor() {
		this._repository = Database.getInstance().connection;
	}

	async handleWebhook(
		body: UserCreatedWebhook | UserUpdatedWebhook | UserDeletedWebhook,
	) {
		const { type } = body;

		switch (type) {
			case 'user.created':
				return await this.userCreated(body as UserCreatedWebhook);
			case 'user.updated':
				return await this.userUpdated(body as UserUpdatedWebhook);
			case 'user.deleted':
				return await this.userDeleted(body as UserDeletedWebhook);
			default:
				throw new Error('Invalid type');
		}
	}

	async userCreated(body: UserCreatedWebhook) {
		const { data } = body;

		await this._repository.insert(users).values({
			clerkId: data.id,
			birthday: data.birthday,
			email: data.email_addresses?.length
				? data.email_addresses[0].email_address
				: undefined,
			firstName: data.first_name,
			lastName: data.last_name,
			username: data.username,
			imageUrl: data.image_url,
		} as typeof users.$inferInsert);
	}

	async userUpdated(body: UserUpdatedWebhook) {
		const { data } = body;

		await this._repository
			.update(users)
			.set({
				birthday: data.birthday,
				email: data.email_addresses?.length
					? data.email_addresses[0].email_address
					: undefined,
				firstName: data.first_name,
				lastName: data.last_name,
				username: data.username,
				imageUrl: data.image_url,
			})
			.where(eq(users.clerkId, data.id));

		// return await this.userUpdate(data);
	}

	async userDeleted(body: UserDeletedWebhook) {
		const { data } = body;

		console.log(data);

		await this._repository.delete(users).where(eq(users.clerkId, data.id));

		// return await this.userDelete(data);
	}
}
