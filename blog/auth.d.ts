import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User extends DefaultUser {
    token: string;
  }

  interface Account {
    token: string;
  }

  interface Session {
    user: User & DefaultSession;
    token: string;
  }

  interface Profile {
    token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    token: string;
  }
}
