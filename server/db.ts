import * as schema from "@shared/schema";

if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = "sqlite.db";
}

const useMemStorage = process.env.VERCEL === "1" || process.env.USE_MEM_STORAGE === "true";

export let sqlite: any = undefined;
export let db: any = undefined;

if (!useMemStorage) {
  try {
    const { default: Database } = await import('better-sqlite3');
    const { drizzle } = await import('drizzle-orm/better-sqlite3');
    sqlite = new Database(process.env.DATABASE_URL);
    db = drizzle(sqlite, { schema });
  } catch (e) {
    console.warn("Failed to initialize SQLite, falling back to memory handling in storage layer likely.", e);
  }
}
