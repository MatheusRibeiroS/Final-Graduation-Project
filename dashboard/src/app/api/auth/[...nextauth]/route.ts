import NextAuth from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";
import GoogleProvider from "next-auth/providers/google";
import jwt from 'next-auth/jwt'

const handler = NextAuth({
  debug: true,
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID || "",
      clientSecret: process.env.AUTH0_CLIENT_SECRET || "",
      issuer: process.env.AUTH0_ISSUER,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          scope: "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/drive.file",
      }
    }
    }),
  ],
  callbacks: {
    jwt: ({token, account })=> {
      if (account?.access_token) {
        token.access_token = account.access_token;
      }
      return token;
    },
  },
  // pages: {
  //   signIn: "/auth/signin",
  //   signOut: "/auth/signout",
  // },
});

export { handler as GET, handler as POST }