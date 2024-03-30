import { relations } from "drizzle-orm";
import { sqliteTable, text, integer, uniqueIndex } from "drizzle-orm/sqlite-core";

export const userTable = sqliteTable("user", {
	id: text("id").notNull().primaryKey(),
    username: text("username").notNull(),
    githubId: text("github_id"),
	malId: text("mal_id"),
	googleId: text("google_id"),
	discordId: text("discord_id")
}, (table) => {
	return {
		githubIdIndex: uniqueIndex("github_id_index").on(table.githubId),
		malIdIndex: uniqueIndex("mal_id_index").on(table.malId),
		googleIndex: uniqueIndex("google_id_index").on(table.googleId),
		discordIndex: uniqueIndex("discord_id_index").on(table.discordId)
	};
});

export const userRelations = relations(userTable, ({many}) => ({
	sessions: many(sessionTable)
}))

export const sessionTable = sqliteTable("session", {
	id: text("id").notNull().primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => userTable.id),
	expiresAt: integer("expires_at").notNull()
});

export const sessionRelations = relations(sessionTable, ({one}) => ({
	user: one(userTable, {
		fields: [sessionTable.userId],
		references: [userTable.id]
	})
}))

export type DatabaseUser = typeof userTable.$inferSelect;
export type InsertDatabaseUser = typeof userTable.$inferInsert;
