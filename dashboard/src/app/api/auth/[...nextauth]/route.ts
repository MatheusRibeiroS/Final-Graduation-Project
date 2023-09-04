import NextAuth from "next-auth";
// import Auth0Provider from "next-auth/providers/auth0";
import GoogleProvider from "next-auth/providers/google";
import jwt from "next-auth/jwt";
import fs from "fs";

const handler = NextAuth({
  debug: true,
  providers: [
    // Auth0Provider({
    //   clientId: process.env.AUTH0_CLIENT_ID || "",
    //   clientSecret: process.env.AUTH0_CLIENT_SECRET || "",
    //   issuer: process.env.AUTH0_ISSUER,
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          scope:
            "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.metadata https://www.googleapis.com/auth/drive.appdata https://www.googleapis.com/auth/drive.readonly",
        },
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, account }) => {
      if (account?.access_token) {
        token.access_token = account.access_token;
      }
      const userCredentials = {
        token,
        account,
      };
      fs.writeFile(
        "credentials.json",
        JSON.stringify(userCredentials),
        (err) => {
          if (err) throw err;
          console.log("Data written to file");
        }
      );

      console.log("token", token);
      return token;
    },

    async session({ session, token, user }) {
      session.user = user;
      session.token = token;
      return session;
    }
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
  },
});

export { handler as GET, handler as POST };
