import { AuthOptions } from "next-auth"
import NextAuth from "next-auth/next"
import RedditProvider from "next-auth/providers/reddit"
import GoogleProvider from "next-auth/providers/google"

const authConfig: AuthOptions = {
  providers: [
    RedditProvider({
      clientId: process.env.REDDIT_CLIENT_ID as string,
      clientSecret: process.env.REDDIT_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
}

const handler = NextAuth(authConfig)

export { handler as GET, handler as POST }
