import { githubOAuth, lucia } from "@/lib/server/auth";
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
    const storedState = cookies().get("github_oauth_state")?.value ?? null;

    const redirectLocation = cookies().get('redirect')?.value ?? "/user";
    cookies().delete('redirect');

    if (!code || !state || !storedState || state !== storedState) {
        return new Response(null, {
            status: 400,
        });
    }

    try {
        const tokens = await githubOAuth.validateAuthorizationCode(code);
        const { data: githubUser } = await axios.get<GitHubUser>("https://api.github.com/user", {
            headers: {
                Authorization: `Bearer ${tokens.accessToken}`,
            },
        });

        const existingUser = await db
            .select()
            .from(userTable)
            .where(
                and(
                    eq(userTable.authProviderType, "github"),
                    eq(userTable.authProviderId, githubUser.id)
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
            username: githubUser.login,
            authProviderType: "github",
            authProviderId: githubUser.id
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
            return new Response(null, {
                status: 400,
            });
        }
        return new Response(null, {
            status: 500,
        });
    }
}

interface GitHubUser {
    // Not all fields are included here
    id: string;
    login: string;
}
