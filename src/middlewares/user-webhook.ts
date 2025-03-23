import type { Handler } from 'elysia';
import { Webhook } from 'svix';

export const userWebhookMidleware: Handler = async (c) => {
	const CLERK_SIGNING_SECRET = Bun.env['CLERK_SIGNING_SECRET'];

	if (!CLERK_SIGNING_SECRET) {
		throw new Error('CLERK_SIGNING_SECRET is not set');
	}

	const wh = new Webhook(CLERK_SIGNING_SECRET);

	const { headers } = c.request;

	const svix_id = headers.get('svix-id');
	const svix_timestamp = headers.get('svix-timestamp');
	const svix_signature = headers.get('svix-signature');

	if (!svix_id || !svix_timestamp || !svix_signature) {
		throw new Error('Error: Missing svix headers');
	}

	console.log('Headers:', { svix_id, svix_timestamp, svix_signature });

	// Attempt to verify the incoming webhook
	// If successful, the payload will be available from 'evt'
	// If verification fails, error out and return error code
	try {
		const rawBody = JSON.stringify(c.body);
		console.log('Body:', rawBody);

		const clerkEvent = wh.verify(rawBody, {
			'svix-id': svix_id as string,
			'svix-timestamp': svix_timestamp as string,
			'svix-signature': svix_signature as string,
		});

		const store = c.store as { clerkEvent: unknown };
		store.clerkEvent = clerkEvent;
	} catch (err) {
		console.log('Error: Could not verify webhook:', err);

		throw new Error('Error: Could not verify webhook');
	}
};
