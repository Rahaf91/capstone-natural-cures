import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  useSecureCookies: false,
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
          credentials.password === "FWrC^5%fr&gSj7"
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
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.name = user.name;
        token.initial = user.name?.charAt(0);
      }
      return token;
    },
    async session({ session, token }) {
      session.user.email = token.email;
      session.user.name = token.name;
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

export default NextAuth(authOptions);
