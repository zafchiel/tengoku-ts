import { discrodOAuth, lucia } from "@/lib/server/auth";
import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { generateIdFromEntropySize } from "lucia";
import { db } from "@/lib/server/db";
import { userTable } from "@/lib/server/db/schema";
import { and, eq } from "drizzle-orm";
import axios from "axios";

export async function GET(request: Request): Promise<Response> {
	const url = new URL(request.url);
	const code = url.searchParams.get("code");
	const state = url.searchParams.get("state");

	const storedState = (await cookies()).get("discord_oauth_state")?.value ?? null;

	const redirectLocation = (await cookies()).get("redirect")?.value ?? "/user";
	(await cookies()).delete("redirect");

	if (!code || !state || !storedState || state !== storedState) {
		return new Response(null, {
			status: 400,
		});
	}

	try {
		const tokens = await discrodOAuth.validateAuthorizationCode(code);

		const { data: discordUser } = await axios.get<DiscordUser>(
			"https://discord.com/api/users/@me",
			{
				headers: {
					Authorization: `Bearer ${tokens.accessToken}`,
				},
			},
		);

		const existingUser = await db
			.select()
			.from(userTable)
			.where(
				and(
					eq(userTable.authProviderType, "discord"),
					eq(userTable.authProviderId, discordUser.id),
				),
			)
			.get();

		if (existingUser) {
			// Create session cookie for exiting user
			const session = await lucia.createSession(existingUser.id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			(await cookies()).set(
				sessionCookie.name,
				sessionCookie.value,
				sessionCookie.attributes,
			);
			return new Response(null, {
				status: 302,
				headers: {
					Location: redirectLocation,
				},
			});
		}

		// If new user, create a new user in the database

		const userId = generateIdFromEntropySize(10);

		await db.insert(userTable).values({
			id: userId,
			username: discordUser.username,
			authProviderType: "discord",
			authProviderId: discordUser.id,
		});

		// Create session cookie for new user
		const session = await lucia.createSession(userId, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		(await cookies()).set(
			sessionCookie.name,
			sessionCookie.value,
			sessionCookie.attributes,
		);
		return new Response(null, {
			status: 302,
			headers: {
				Location: redirectLocation,
			},
		});
	} catch (e) {
		console.log(e);
		// the specific error message depends on the provider
		if (e instanceof OAuth2RequestError) {
			// invalid code
			return new Response(null, {
				status: 400,
			});
		}
		return new Response(null, {
			status: 500,
		});
	}
}

interface DiscordUser {
	id: string;
	username: string;
	avatar: string;
	discriminator: string;
	public_flags: number;
	premium_type: number;
	flags: number;
	banner: null | string;
	accent_color: null | string;
	global_name: string;
	avatar_decoration_data: null | string;
	banner_color: null | string;
	mfa_enabled: boolean;
	locale: string;
	email: string;
	verified: boolean;
}
