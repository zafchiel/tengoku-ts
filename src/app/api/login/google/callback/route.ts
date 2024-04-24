import { lucia, googleOAuth } from "@/lib/server/auth";
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

    const redirectLocation = cookies().get('redirect')?.value ?? "/user";
    cookies().delete('redirect');

    const storedVerifier = cookies().get("google_oauth_code_verifier")?.value ?? null;
    const storedState = cookies().get("google_oauth_state")?.value ?? null;

    if (!code || !storedVerifier || !storedState || !state || state !== storedState) {
        return new Response(null, {
            status: 400,
        });
    }

    try {
        const tokens = await googleOAuth.validateAuthorizationCode(code, storedVerifier);

        const { data: userInfo } = await axios.get<GoogleUserInfo>("https://openidconnect.googleapis.com/v1/userinfo", {
            headers: {
                Authorization: `Bearer ${tokens.accessToken}`
            }
        });

        const existingUser = await db
            .select()
            .from(userTable)
            .where(
                and(
                    eq(userTable.authProviderType, "google"),
                    eq(userTable.authProviderId, userInfo.sub)
                )
            )
            .get();

        if (existingUser) {
            // Create session cookie for exiting user
            const session = await lucia.createSession(existingUser.id, {});
            const sessionCookie = lucia.createSessionCookie(session.id);
            cookies().set(
                sessionCookie.name,
                sessionCookie.value,
                sessionCookie.attributes
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
            username: userInfo.name,
            authProviderType: "google",
            authProviderId: userInfo.sub
        });

        // Create session cookie for new user
        const session = await lucia.createSession(userId, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies().set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes
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
            return new Response(e.message, {
                status: 400,
            });
        }
        return new Response(null, {
            status: 500,
        });
    }
}

interface GoogleUserInfo {
    sub: string;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    email: string;
    email_verified: boolean,
    locale: string;
}
