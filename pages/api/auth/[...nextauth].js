import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "../../../lib/prismadb"

export const authOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
	GoogleProvider({
		clientId: process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET
	  }),
	//   GitHubProvider({
	// 	clientId: process.env.GITHUB_CLIENT_ID,
	// 	clientSecret: process.env.GITHUB_CLIENT_SECRET
	//   })
    // ...add more providers here
  ],
}
export default NextAuth(authOptions)