import * as schema from "@shared/schema";

if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = "sqlite.db";
}

const useMemStorage = process.env.VERCEL === "1" || process.env.USE_MEM_STORAGE === "true";

export let sqlite: any = undefined;
export let db: any = undefined;

// Lazy initialization function
let dbInitialized = false;

export async function initializeDb() {
  if (dbInitialized || useMemStorage) {
    return;
  }

  try {
    const { default: Database } = await import('better-sqlite3');
    const { drizzle } = await import('drizzle-orm/better-sqlite3');
    sqlite = new Database(process.env.DATABASE_URL);
    db = drizzle(sqlite, { schema });
    dbInitialized = true;
  } catch (e) {
    console.warn("Failed to initialize SQLite, falling back to memory handling in storage layer.", e);
  }
}

// For non-Vercel environments, initialize synchronously if possible
if (!useMemStorage) {
  try {
    // Use require for synchronous loading in non-ESM context
    const Database = require('better-sqlite3');
    const { drizzle } = require('drizzle-orm/better-sqlite3');
    sqlite = new Database(process.env.DATABASE_URL);
    db = drizzle(sqlite, { schema });
    dbInitialized = true;
  } catch (e) {
    // Will fall back to async initialization
    console.log("Synchronous DB init failed, will use async initialization");
  }
}
