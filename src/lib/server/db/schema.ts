import { relations } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

const PROVIDERS = ["github", "mal", "google", "discord"] as const;
export type Provider = (typeof PROVIDERS)[number];

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

export const userTable = sqliteTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name").notNull(),
  email: text("email"),
  emailVerified: integer("emailVerified", { mode: "boolean" }),
  image: text("image"),
  createdAt: integer("createdAt", { mode: "timestamp" }),
  updatedAt: integer("updatedAt", { mode: "timestamp" }),
});

export const userRelations = relations(userTable, ({ many }) => ({
  sessions: many(sessionTable),
  progress: many(progressTable),
}));

export const sessionTable = sqliteTable("session", {
  id: text("id").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => userTable.id),
  token: text("token").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  createdAt: integer("createdAt", { mode: "timestamp" }),
  updatedAt: integer("updatedAt", { mode: "timestamp" }),
});

export const sessionRelations = relations(sessionTable, ({ one }) => ({
  user: one(userTable, {
    fields: [sessionTable.userId],
    references: [userTable.id],
  }),
}));

export const accountTable = sqliteTable("account", {
  id: text("id").primaryKey(),
  accountId: text("accountId").notNull(),
  providerId: text("providerId").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => userTable.id),
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  idToken: text("idToken"),
  accessTokenExpiresAt: integer("accessTokenExpiresAt", { mode: "timestamp" }),
  refreshTokenExpiresAt: integer("refreshTokenExpiresAt", {
    mode: "timestamp",
  }),
  scope: text("scope"),
  password: text("password"),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull(),
});

export const accountRelations = relations(accountTable, ({ one }) => ({
  user: one(userTable, {
    fields: [accountTable.userId],
    references: [userTable.id],
  }),
}));

export const verificationTable = sqliteTable("verification", {
  id: text("id").notNull().primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expiresAt", { mode: "timestamp" }),
  createdAt: integer("createdAt", { mode: "timestamp" }),
  updatedAt: integer("updatedAt", { mode: "timestamp" }),
});

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
