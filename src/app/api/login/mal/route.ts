import { generateCodeVerifier, generateState } from "arctic";
import { cookies } from "next/headers";

export async function GET(): Promise<Response> {
	const MAL_CLIENT_ID = process.env.MAL_CLIENT_ID;

	if (!MAL_CLIENT_ID) {
		return Response.error();
	}

	// const malAccessToken = cookies().get("mal_access_token");
	// const malRefreshToken = cookies().get("mal_refresh_token");

	// if (malAccessToken && malRefreshToken) {
	// 	return Response.redirect("/api/login/mal/callback");
	// }

	const state = generateState();
	const codeChallange = generateCodeVerifier();

	const url = new URL("https://myanimelist.net/v1/oauth2/authorize");

	url.searchParams.append("response_type", "code");
	url.searchParams.append("client_id", MAL_CLIENT_ID);
	url.searchParams.append("state", state);
	url.searchParams.append("code_challenge", codeChallange);
	url.searchParams.append("code_challenge_method", "plain");
  url.searchParams.append("redirect_uri", "http://localhost:3000/api/login/mal/callback");


	cookies().set("mal_oauth_code_verifier", codeChallange, {
		path: "/",
		secure: process.env.NODE_ENV === "production",
		httpOnly: true,
		maxAge: 60 * 10,
		sameSite: "lax",
	});

	cookies().set("mal_oauth_state", state, {
		path: "/",
		secure: process.env.NODE_ENV === "production",
		httpOnly: true,
		maxAge: 60 * 10,
		sameSite: "lax",
	});

	return Response.redirect(url);
}
