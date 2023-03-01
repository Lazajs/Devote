import NextAuth, { NextAuthOptions } from "next-auth";
import { MongooseAdapter } from "@choutkamartin/mongoose-adapter";
import GithubProvider from 'next-auth/providers/github'

export const authOptions: NextAuthOptions = {
  adapter: MongooseAdapter(process.env.MONGODB_URI as string),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string
    }),
  ],
}

export default NextAuth(authOptions)

