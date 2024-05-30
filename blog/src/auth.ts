import NextAuth, { CredentialsSignin, User } from "next-auth";
import credentials from "next-auth/providers/credentials";

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid identifier or password";
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user: User | null = null;

        const { email, password } = credentials;

        const raw = JSON.stringify({ email, password });

        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: raw,
        };
        const apiurl = process.env.API_URL || "http://127.0.0.1:8000/api/";

        const response = await fetch(apiurl + "login", requestOptions);

        if (response.ok) {
          const res = await response.json();
          user = {
            name: (credentials.email as string) || "",
            email: (credentials.email as string) || "",
            token: res.access_token,
          };
          return user;
        } else {
          throw new InvalidLoginError();
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token = { ...token, token: user.token };
      }
      return token;
    },
    async session({ session, token }) {
      session.token = token.token;
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/error",
  },
});
