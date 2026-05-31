import "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    emailVerified?: string | null;
    isAdmin?: boolean;
    roles?: string[];
    permissions?: string[];
  }
}
