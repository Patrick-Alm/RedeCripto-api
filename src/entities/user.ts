import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	clerkId: text('clerk_id').notNull().unique(),
	email: text('email').unique(),
	firstName: text('first_name'),
	lastName: text('last_name'),
	telephone: text('telephone'),
	wallet: text('wallet'),
	username: text('username'),
	imageUrl: text('image_url'),
	lastSignInAt: text('last_sign_in_at'),
	birthday: text('birthday'),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
