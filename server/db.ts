import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from "@shared/schema";

if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = "sqlite.db";
}

export const sqlite = new Database("sqlite.db");
export const db = drizzle(sqlite, { schema });
