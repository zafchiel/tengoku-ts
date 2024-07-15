import { generateState } from "arctic";
import { discrodOAuth } from "@/lib/server/auth";
import { cookies } from "next/headers";

export async function GET(): Promise<Response> {
	const state = generateState();
	const url = await discrodOAuth.createAuthorizationURL(state, {
		scopes: ["identify"],
	});

	cookies().set("discord_oauth_state", state, {
		path: "/",
		secure: process.env.NODE_ENV === "production",
		httpOnly: true,
		maxAge: 60 * 10,
		sameSite: "lax",
	});

	return Response.redirect(url);
}
