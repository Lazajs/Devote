import NextAuth, { NextAuthOptions } from "next-auth";
import { MongooseAdapter } from "@choutkamartin/mongoose-adapter";
import Credentials from "next-auth/providers/credentials";
import type {SignData, ProductData} from 'types'
import GithubProvider from 'next-auth/providers/github'
import dbConnect from "@/db/mongoose";
import Product from "@/db/models/product";
import User from "@/db/models/user";
import { signIn } from "next-auth/react";

interface WithPath extends SignData {
  from: 'signin' | 'signup'
}


export const authOptions: NextAuthOptions = {
  adapter: MongooseAdapter(process.env.MONGODB_URI as string),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string
    }),
    Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder:'John Smith'},
        password: {label: 'Password', type: 'password', placeholder:'mYpaSSword2@f'},
      },

      async authorize(credentials, _req) {
        const {from} = credentials as WithPath

        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/${from}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({...credentials})
        })

        if (res.ok) {
          const user = await res.json()
          if (user) return user
        }
        return null
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: '/auth/signin',
  },
   callbacks: {
    async session({ session, token }) {
      session.user = token.user as ProductData;
      // console.log(token.user) work here
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        console.log(user)
        token.user = user;
      }
      return token;
    },
  }
}

export default NextAuth(authOptions)

