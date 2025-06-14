import { defineConfig } from 'drizzle-kit';

const { DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT } = Bun.env;

if (!DB_USER || !DB_PASSWORD || !DB_NAME || !DB_HOST || !DB_PORT) {
	throw new Error(
		'DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT environment variables are not set',
	);
}

export default defineConfig({
	out: './src/core/database/drizzle',
	schema: './src/entities/*.schema.ts',
	dialect: 'postgresql',
	dbCredentials: {
		host: DB_HOST,
		port: Number(DB_PORT),
		user: DB_USER,
		password: DB_PASSWORD,
		database: DB_NAME,
		ssl: false,
	},
});
