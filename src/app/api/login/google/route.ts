import { generateCodeVerifier, generateState } from "arctic";
import { googleOAuth } from "@/lib/server/auth";
import { cookies } from "next/headers";

export async function GET(): Promise<Response> {
	const state = generateState();
	const codeVerifier = generateCodeVerifier();

	const url = await googleOAuth.createAuthorizationURL(state, codeVerifier, {
		scopes: ["openid", "email", "profile"],
	});

	(await cookies()).set("google_oauth_state", state, {
		path: "/",
		secure: process.env.NODE_ENV === "production",
		httpOnly: true,
		maxAge: 60 * 10,
		sameSite: "lax",
	});

	(await cookies()).set("google_oauth_code_verifier", codeVerifier, {
		path: "/",
		secure: process.env.NODE_ENV === "production",
		httpOnly: true,
		maxAge: 60 * 10,
		sameSite: "lax",
	});

	return Response.redirect(url);
}
