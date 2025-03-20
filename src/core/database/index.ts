import { type BunSQLDatabase, drizzle } from 'drizzle-orm/bun-sql';

export class Database {
  private static instance: Database;
  private _connection: BunSQLDatabase;

  private constructor() {
    const { DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT } = Bun.env;

    if (!DB_USER || !DB_PASSWORD || !DB_NAME || !DB_HOST || !DB_PORT) {
      throw new Error(
        'DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT environment variables are not set',
      );
    }

    const connectionString = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
    this._connection = drizzle(connectionString);
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  get connection() {
    return this._connection;
  }
}
