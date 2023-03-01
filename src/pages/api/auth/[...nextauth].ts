import NextAuth, { NextAuthOptions } from "next-auth";
import { MongooseAdapter } from "@choutkamartin/mongoose-adapter";
import GithubProvider from 'next-auth/providers/github'
import LinkedInProvider from 'next-auth/providers/linkedin'

export const authOptions: NextAuthOptions = {
  adapter: MongooseAdapter(process.env.MONGODB_URI as string),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_ID as string,
      clientSecret: process.env.LINKEDIN_SECRET as string
    })
  ],
  pages: {
    signIn: '/',
    error:'/'
  }
}

export default NextAuth(authOptions)

