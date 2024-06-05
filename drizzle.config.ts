import type { Config } from "drizzle-kit";

// Wheter inspect local sqlite db or use remote turso db
const dev = true;

const TURSO_DB_URL = process.env.TURSO_DB_URL;
const TURSO_DB_SECRET_TOKEN = process.env.TURSO_DB_SECRET_TOKEN;

if (!TURSO_DB_URL) {
  throw new Error("TURSO_DB_URL is not defined");
}

if (!TURSO_DB_SECRET_TOKEN) {
  throw new Error("TURSO_DB_SECRET_TOKEN is not defined");
}

export default {
  schema: "./src/lib/server/db/schema.ts",
  driver: "turso",
  dialect: "sqlite",
  dbCredentials: {
    url: dev ? "file:sqlite.db" : TURSO_DB_URL,
    authToken: TURSO_DB_SECRET_TOKEN,
  },
} satisfies Config;
