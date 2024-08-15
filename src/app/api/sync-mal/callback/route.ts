import { lucia } from "@/lib/server/auth";
import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { generateIdFromEntropySize } from "lucia";
import { db } from "@/lib/server/db";
import { userTable } from "@/lib/server/db/schema";
import { and, eq } from "drizzle-orm";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request, response: Response): Promise<Response> {
	const url = new URL(request.url);
	const code = url.searchParams.get("code");
	const state = url.searchParams.get("state");

	const MAL_CLIENT_ID = process.env.MAL_CLIENT_ID;
	const MAL_CLIENT_SECRET = process.env.MAL_CLIENT_SECRET;

	const redirectLocation = "/user";

	if (!MAL_CLIENT_ID || !MAL_CLIENT_SECRET) {
		throw new Error("Missing MAL_CLIENT_ID or MAL_CLIENT_SECRET");
	}

	const storedVerifier =
		cookies().get("mal_oauth_code_verifier")?.value ?? null;
	const storedState = cookies().get("mal_oauth_state")?.value ?? null;

	if (
		!code ||
		!storedVerifier ||
		!storedState ||
		!state ||
		state !== storedState
	) {
		return new Response(JSON.stringify({
			error: "Invalid code or state"
		}), {
			status: 400,
		});
	}

	try {
		const response = await axios.post<MalResponse>(
			"https://myanimelist.net/v1/oauth2/token",
			{
				client_id: MAL_CLIENT_ID,
				client_secret: MAL_CLIENT_SECRET,
				code: code,
				code_verifier: storedVerifier,
				grant_type: "authorization_code",
				redirect_uri: "http://localhost:3000/api/sync-mal/callback",
			},
			{
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			},
		);

		const { data: userInfo } = await axios.get<MalUser>(
			"https://api.myanimelist.net/v2/users/@me",
			{
				headers: {
					Authorization: `Bearer ${response.data.access_token}`,
				},
			},
		);


		cookies().set("mal_access_token", response.data.access_token);
		cookies().set("mal_refresh_token", response.data.refresh_token);

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

interface MalResponse {
	token_type: string;
	expires_in: number;
	access_token: string;
	refresh_token: string;
}

interface MalUser {
	id: string;
	name: string;
	location: string;
	joined_at: string;
}
