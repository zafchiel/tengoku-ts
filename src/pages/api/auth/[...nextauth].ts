import { AuthOptions } from "next-auth"
import NextAuth from "next-auth/next"

import RedditProvider from "next-auth/providers/reddit"
import GoogleProvider from "next-auth/providers/google"
import DiscordProvider from "next-auth/providers/discord"

import { XataAdapter } from "@auth/xata-adapter"
import { XataClient } from "@/xata/xata"
import { Adapter } from "next-auth/adapters"

const client = new XataClient()

export const authConfig: AuthOptions = {
  adapter: XataAdapter(client) as Adapter,
  providers: [
    RedditProvider({
      clientId: process.env.REDDIT_CLIENT_ID as string,
      clientSecret: process.env.REDDIT_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      if (session.user) session.user.id = user.id

      return session
    },
  },
}

export default NextAuth(authConfig)
