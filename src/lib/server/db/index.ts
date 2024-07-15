import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

// Use local db for development
const dev = process.env.NODE_ENV === "development";

const TURSO_DB_URL = process.env.TURSO_DB_URL;
const TURSO_DB_SECRET_TOKEN = process.env.TURSO_DB_SECRET_TOKEN;

if (!TURSO_DB_URL && !dev) {
	throw new Error("TURSO_DB_URL is not defined");
}

if (!TURSO_DB_SECRET_TOKEN && !dev) {
	throw new Error("TURSO_DB_SECRET_TOKEN is not defined");
}

const sqlite = createClient({
	url: dev ? "file:sqlite.db" : TURSO_DB_URL!,
	authToken: TURSO_DB_SECRET_TOKEN,
});
export const db = drizzle(sqlite);
