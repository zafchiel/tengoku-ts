import { sqliteTable, text, integer, uniqueIndex } from "drizzle-orm/sqlite-core";

export const userTable = sqliteTable("user", {
	id: text("id").notNull().primaryKey(),
    username: text("username").notNull(),
    githubId: text("github_id").notNull(),
}, (table) => {
	return {
		githubIdIndex: uniqueIndex("github_id_index").on(table.githubId),
	};
});

export const sessionTable = sqliteTable("session", {
	id: text("id").notNull().primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => userTable.id),
	expiresAt: integer("expires_at").notNull()
});

export type DatabaseUser = typeof userTable.$inferSelect;
export type InsertDatabaseUser = typeof userTable.$inferInsert;
