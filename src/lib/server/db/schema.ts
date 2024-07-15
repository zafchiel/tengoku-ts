import { relations } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { z } from "zod";

const PROVIDERS = ["github", "mal", "google", "discord"] as const;
export const WATCHING_STATUSES = [
	"Plan to watch",
	"Watching",
	"Completed",
	"On-hold",
	"Dropped",
] as const;

export const SCORES = [
	[10, "Masterpiece"],
	[9, "Great"],
	[8, "Very Good"],
	[7, "Good"],
	[6, "Fine"],
	[5, "Average"],
	[4, "Bad"],
	[3, "Very Bad"],
	[2, "Horrible"],
	[1, "Appaling"],
	[0, "None"],
] as const;

export const userTable = sqliteTable(
	"users",
	{
		id: text("id").notNull().primaryKey(),
		username: text("username").notNull(),
		authProviderType: text("auth_provider_type", { enum: PROVIDERS }).notNull(),
		authProviderId: text("auth_provider_id").notNull(),
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

export const userRelations = relations(userTable, ({ many }) => ({
	sessions: many(sessionTable),
	progress: many(progressTable),
}));

export const sessionTable = sqliteTable("sessions", {
	id: text("id").notNull().primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => userTable.id),
	expiresAt: integer("expires_at").notNull(),
});

export const sessionRelations = relations(sessionTable, ({ one }) => ({
	user: one(userTable, {
		fields: [sessionTable.userId],
		references: [userTable.id],
	}),
}));

export const progressTable = sqliteTable("progress", {
	id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
	userId: text("user_id")
		.notNull()
		.references(() => userTable.id),
	animeId: integer("anime_id", { mode: "number" }).notNull(),
	animeTitle: text("anime_title").notNull(),
	animePoster: text("anime_poster"),
	score: integer("score", { mode: "number" }).notNull().default(0),
	status: text("status", { enum: WATCHING_STATUSES })
		.notNull()
		.default("Plan to watch"),
	episodesWatched: integer("episodes_watched", { mode: "number" })
		.notNull()
		.default(0),
	maxEpisodes: integer("max_episodes", { mode: "number" }),
});

export const progressRelations = relations(progressTable, ({ one }) => ({
	user: one(userTable, {
		fields: [progressTable.userId],
		references: [userTable.id],
	}),
}));

export type DatabaseUser = typeof userTable.$inferSelect;
export type InsertDatabaseUser = typeof userTable.$inferInsert;
export type ProgressRecordType = typeof progressTable.$inferSelect;
