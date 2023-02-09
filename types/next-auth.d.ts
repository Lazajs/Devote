import type { ProductData } from "types"
import NextAuth from "next-auth/next"

declare module "next-auth" {
  interface Session {
    user: ProductData
  }
}