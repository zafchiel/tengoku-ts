import { Lucia, type User, type Session } from "lucia";
import { db } from "../db";
import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { DatabaseUser, sessionTable, userTable } from "../db/schema";
import { GitHub, Google, Discord } from "arctic";
import { cache } from "react";
import { cookies } from "next/headers";

const DEPLOYMENT_URL = process.env.DEPLOYMENT_URL || "http://localhost:3000";

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;

if(!DISCORD_CLIENT_ID || !DISCORD_CLIENT_SECRET) {
	throw new Error("Discord client ID and secret are required");
}

if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET  ) {
    throw new Error("GitHub client ID and secret are required");
};

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
	throw new Error("Google client ID and secret are required");
}

export const githubOAuth = new GitHub(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET);
export const googleOAuth = new Google(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, `${DEPLOYMENT_URL}/api/login/google/callback`);
export const discrodOAuth = new Discord(DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, `${DEPLOYMENT_URL}/api/login/discord/callback`);

const adapter = new DrizzleSQLiteAdapter(db, sessionTable, userTable);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		// this sets cookies with super long expiration
		// since Next.js doesn't allow Lucia to extend cookie expiration when rendering pages
		expires: false,
		attributes: {
			// set to `true` when using HTTPS
			secure: process.env.NODE_ENV === "production"
		}
	},
    getUserAttributes: (attributes) => {
        return {
            githubId: attributes.githubId,
            username: attributes.username
        }
    }
});

// IMPORTANT!
declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
        DatabaseUserAttributes: DatabaseUser;
	}
}


export const validateRequest = cache(
	async (): Promise<{ user: User; session: Session } | { user: null; session: null }> => {
		const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
		if (!sessionId) {
			return {
				user: null,
				session: null
			};
		}

		const result = await lucia.validateSession(sessionId);
		// next.js throws when you attempt to set cookie when rendering page
		try {
			if (result.session && result.session.fresh) {
				const sessionCookie = lucia.createSessionCookie(result.session.id);
				cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
			}
			if (!result.session) {
				const sessionCookie = lucia.createBlankSessionCookie();
				cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
			}
		} catch {}
		return result;
	}
);
