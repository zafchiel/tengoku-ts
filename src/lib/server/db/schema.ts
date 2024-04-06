import { relations } from "drizzle-orm";
import { sqliteTable, text, integer, uniqueIndex } from "drizzle-orm/sqlite-core";

const providerTypes = ["github", "mal", "google", "discord"] as const;

export const userTable = sqliteTable("users", {
	id: text("id")
		.notNull()
		.primaryKey(),
    username: text("username")
		.notNull(),
	authProviderType: text("auth_provider_type", { enum: providerTypes})
		.notNull(),
	authProviderId: text("auth_provider_id")
		.notNull()
}, 
// (table) => {
// 	return {
// 		githubIdIndex: uniqueIndex("github_id_index").on(table.githubId),
// 		malIdIndex: uniqueIndex("mal_id_index").on(table.malId),
// 		googleIndex: uniqueIndex("google_id_index").on(table.googleId),
// 		discordIndex: uniqueIndex("discord_id_index").on(table.discordId)
// 	};
// }
);

export const userRelations = relations(userTable, ({ many, one }) => ({
	sessions: many(sessionTable)
}))

export const sessionTable = sqliteTable("sessions", {
	id: text("id")
		.notNull()
		.primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => userTable.id),
	expiresAt: integer("expires_at")
		.notNull()
});

export const sessionRelations = relations(sessionTable, ({one}) => ({
	user: one(userTable, {
		fields: [sessionTable.userId],
		references: [userTable.id]
	})
}))

export type DatabaseUser = typeof userTable.$inferSelect;
export type InsertDatabaseUser = typeof userTable.$inferInsert;
