import NextAuth, { NextAuthOptions } from "next-auth";
import { MongooseAdapter } from "@choutkamartin/mongoose-adapter";
import Credentials from "next-auth/providers/credentials";
import type {SignData, User} from 'types'

interface WithPath extends SignData {
  from: 'signin' | 'signup'
}

export const authOptions: NextAuthOptions = {
  adapter: MongooseAdapter(process.env.MONGODB_URI as string),
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder:'John Smith'},
        password: {label: 'Password', type: 'password', placeholder:'mYpaSSword2@f'}
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

        const user = await res.json()
        console.log(user)
        if (user) return user
        else return null
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: '/auth/signin'
  },
   callbacks: {
    async session({ session, token }) {
      session.user = token.user as User;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  }
}

export default NextAuth(authOptions)

