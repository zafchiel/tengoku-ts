import { type InsertDatabaseUser, type Provider } from "../db/schema";
import { db } from "@/lib/server/db";
import { userTable } from "@/lib/server/db/schema";
import { and, eq } from "drizzle-orm";
import { lucia } from "@/lib/server/auth";
import { cookies } from "next/headers";
import { generateIdFromEntropySize } from "lucia";
import axios from "axios";

interface AuthConstructorParams {
  storedCodeVerifier: string;
  storedCode: string;
}

export class Auth {
  private MAL_CLIENT_ID = process.env.MAL_CLIENT_ID;
  private MAL_CLIENT_SECRET = process.env.MAL_CLIENT_SECRET;

  private _storedCodeVerifier: string;
  private _storedCode: string;

  provider: Provider;

  constructor(
    provider: Provider,
    { storedCodeVerifier, storedCode }: AuthConstructorParams
  ) {
    if (!this.MAL_CLIENT_ID || !this.MAL_CLIENT_SECRET) {
      throw new Error("MAL_CLIENT_ID or MAL_CLIENT_SECRET is not set");
    }

    this._storedCodeVerifier = storedCodeVerifier;
    this._storedCode = storedCode;

    this.provider = provider;
  }

  async createNewUserDatabaseEntry({
    username,
    authProviderId,
  }: InsertDatabaseUser) {
    const userId = generateIdFromEntropySize(10);

    try {
      return await db.insert(userTable).values({
        id: userId,
        username: username,
        authProviderType: this.provider,
        authProviderId: authProviderId,
      });
    } catch (error) {
      console.error("Error creating new user:", error);
      throw error;
    }
  }

  async getUserDatabaseEntry(authProviderId: string) {
    try {
      return await db
        .select()
        .from(userTable)
        .where(
          and(
            eq(userTable.authProviderType, this.provider),
            eq(userTable.authProviderId, authProviderId)
          )
        )
        .get();
    } catch (error) {
      console.error("Error getting user:", error);
      throw error;
    }
  }

  // Create session cookie for user
  async createSessionCookie(userId: string): Promise<void> {
    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  }

  private async _getMalToken({
    code,
    storedVerifier,
  }: {
    code: string;
    storedVerifier: string;
  }) {
    try {
      const response = await axios
        .post<MalResponse>(
          "https://myanimelist.net/v1/oauth2/token",
          {
            client_id: this.MAL_CLIENT_ID,
            client_secret: this.MAL_CLIENT_SECRET,
            code: code,
            code_verifier: storedVerifier,
            grant_type: "authorization_code",
            redirect_uri: "http://localhost:3000/api/login/mal/callback",
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then((res) => res.data);
    } catch (error) {
      console.error("Error getting MAL token:", error);
      throw error;
    }
  }

  private async _refreshMalToken(refreshToken: string) {
    try {
      return axios
        .post<MalResponse>(
          "https://myanimelist.net/v1/oauth2/token",
          {
            client_id: this.MAL_CLIENT_ID,
            client_secret: this.MAL_CLIENT_SECRET,
            grant_type: "refresh_token",
            refresh_token: refreshToken,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then((res) => res.data);
    } catch (error) {
      console.error("Error refreshing MAL token:", error);
      throw error;
    }
  }

  private async _getMalUserInfo(accessToken: string) {
    try {
      return await axios
        .get<MalUser>("https://api.myanimelist.net/v2/users/@me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => res.data);
    } catch (error) {
      console.error("Error getting MAL user info:", error);
      throw error;
    }
  }

  async redirect(location: string) {
    return new Response(null, {
      status: 302,
      headers: {
        Location: location,
      },
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
