import { AuthOptions } from "next-auth"
import NextAuth from "next-auth/next"

import RedditProvider from "next-auth/providers/reddit"
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google"

import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/mongodb/client"
import { Adapter } from "next-auth/adapters"

export const authConfig: AuthOptions = {
  providers: [
    RedditProvider({
      clientId: process.env.REDDIT_CLIENT_ID as string,
      clientSecret: process.env.REDDIT_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      // @ts-ignore
      profile(profile: GoogleProfile) {
        return {
          name: profile.name,
          email: profile.email,
          currentlyWatching: null,
        }
      },
    }),
  ],
  callbacks: {
    session({ session, user }) {
      // @ts-ignore
      session.user.currentlyWatching = user.currentlyWatching
      return session
    },
  },
  adapter: MongoDBAdapter(clientPromise) as Adapter,
}

const handler = NextAuth(authConfig)

export { handler as GET, handler as POST }
