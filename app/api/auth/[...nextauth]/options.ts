import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith@gmail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {

        const baseUrl =
          process.env.NODE_ENV === "production"
            ? "https://cook-mate-mohamed-abouelnasrs-projects.vercel.app/"
            : "http://localhost:3000";
        const res = await fetch(`${baseUrl}/api/login`, {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();

        // If no error and we have user data, return it
        if (res.ok && user) {
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  pages:{
    signIn: '/auth/signIn',
    newUser: '/auth/newUser'
  },
  session:{
    strategy: "jwt",
    maxAge: 60 * 60,
  },
  callbacks:{
    async jwt({token, user}){
      return {...token, ...user}
    },

    async session({session, token}){
      session.user = token as any;
      return session;
    },
    
  },
  secret: process.env.NEXTAUTH_SECRET
};
