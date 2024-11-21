import { PrismaClient } from "@prisma/client";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
   providers: [
      GoogleProvider({
         clientId: process.env.GOOGLE_CLIENT_ID || "",
         clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      }),
      CredentialsProvider({
         name: "Credentials",
         credentials: {
            email: { label: "Email", type: "text" },
            password: { label: "Password", type: "password" },
         },
         async authorize(credentials) {
            const { email, password } = credentials!;
            if (!email || !password) {
               throw new Error("Email and password are required");
            }

            const user = await prisma.user.findUnique({
               where: { email },
               select: {
                  id: true,
                  email: true,
                  displayName: true,
                  password: true,
               },
            });

            if (!user || user.password !== password) {
               throw new Error("Invalid credentials");
            }

            return { id: user.id, email: user.email, name: user.displayName }; // Include `id` in return
         },
      }),
   ],
   callbacks: {
      async jwt({ token, user }) {
         if (user) {
            token.uid = user.id; // Add `id` to the token
         }
         return token;
      },
      async session({ session, token }) {
         session.user = session.user || {};
         session.user.id = token.uid; // Add `id` to the session
         return session;
      },
   },
   session: {
      strategy: "jwt",
   },
   secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
