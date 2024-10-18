import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          credentials.email === "testing@gmail.com" &&
          credentials.password === "hummer123"
        ) {
          return {
            name: "Test User",
            email: credentials.email,
            id: "12345",
          };
        } else {
          return null;
        }
      },
    }),
    process.env.VERCEL_ENV !== "preview" &&
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
    process.env.VERCEL_ENV !== "preview" &&
      GitHubProvider({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.email = token.email;
      session.user.name = token.name;
      session.user.id = token.sub;
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

export default NextAuth(authOptions);
