import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      emailVerified?: Date | null;
      isAdmin: boolean;
      roles: string[];
      permissions: string[];
    };
  }

  interface User {
    emailVerified?: Date | null;
    isAdmin?: boolean;
    roles?: string[];
    permissions?: string[];
  }
}
