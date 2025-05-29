import { Database } from '@/core/database';
import { users } from '@/entities/user.schema';
import { createClerkClient, verifyToken } from '@clerk/backend';
import { eq } from 'drizzle-orm';
import type { Handler } from 'elysia';

const clerk = createClerkClient({
	secretKey: Bun.env['CLERK_SECRET_KEY'],
	publishableKey: Bun.env['CLERK_PUBLISHABLE_KEY'],
});

export const clerkMiddleware: Handler = async (ctx) => {
	try {
		const { isSignedIn, token } = await clerk.authenticateRequest(ctx.request, {
			jwtKey: Bun.env['CLERK_JWT_KEY'],
		});

		if (!token) {
			return ctx.status('Unauthorized', 'Authentication failed');
		}

		const verifiedToken = await verifyToken(token, {
			jwtKey: process.env.CLERK_JWT_KEY,
		});

		if (!isSignedIn) {
			return ctx.status('Unauthorized', 'Authentication failed');
		}

		const store = ctx.store as {
			userId: number;
		};

		const db = Database.getInstance().connection;

		const [user] = await db
			.select({ id: users.id })
			.from(users)
			.where(eq(users.clerkId, verifiedToken.sub))
			.limit(1);

		store.userId = user.id;
	} catch (error) {
		return ctx.status('Unauthorized', 'Authentication failed');
	}
};
