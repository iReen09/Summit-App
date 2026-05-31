import NextAuth from "next-auth";
import type { Provider } from "next-auth/providers";
import Apple from "next-auth/providers/apple";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { z } from "zod";

import { prisma } from "@/lib/db";
import { getAdminClaims, getUserSessionClaims } from "@/lib/server/auth-service";
import { hasAppleOAuthEnv, hasGoogleOAuthEnv } from "@/lib/server/env";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const providers: Provider[] = [
  Credentials({
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(rawCredentials) {
      const credentials = credentialsSchema.safeParse(rawCredentials);

      if (!credentials.success) {
        return null;
      }

      const user = await prisma.user.findUnique({
        where: {
          email: credentials.data.email.toLowerCase(),
        },
      });

      if (!user?.passwordHash || !user.emailVerified) {
        return null;
      }

      const validPassword = await bcrypt.compare(credentials.data.password, user.passwordHash);

      if (!validPassword) {
        return null;
      }

      const claims = await getAdminClaims(user.id);

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        emailVerified: user.emailVerified,
        ...claims,
      };
    },
  }),
];

if (hasGoogleOAuthEnv()) {
  providers.push(
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      authorization: { params: { access_type: "offline", prompt: "consent" } },
    }),
  );
} else if (process.env.NODE_ENV !== "production") {
  console.warn("[auth] Google OAuth disabled: AUTH_GOOGLE_ID/AUTH_GOOGLE_SECRET are missing.");
}

if (hasAppleOAuthEnv()) {
  providers.push(
    Apple({
      clientId: process.env.AUTH_APPLE_ID!,
      clientSecret: process.env.AUTH_APPLE_SECRET!,
    }),
  );
} else if (process.env.NODE_ENV !== "production") {
  console.warn("[auth] Apple OAuth disabled: AUTH_APPLE_ID/AUTH_APPLE_SECRET are missing.");
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  trustHost: true,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/masuk",
  },
  providers,
  callbacks: {
    async signIn({ user, account }) {
      if ((account?.provider === "google" || account?.provider === "apple") && user.email) {
        await prisma.user.updateMany({
          where: { email: user.email.toLowerCase() },
          data: {
            emailVerified: new Date(),
            provider: account.provider,
          },
        });
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.emailVerified = user.emailVerified ? user.emailVerified.toISOString() : null;
        token.isAdmin = user.isAdmin ?? false;
        token.roles = user.roles ?? [];
        token.permissions = user.permissions ?? [];
      }

      const userId = typeof token.id === "string" ? token.id : token.sub;

      if (userId) {
        const claims = await getUserSessionClaims(userId);
        token.id = claims.id;
        token.emailVerified = claims.emailVerified ? claims.emailVerified.toISOString() : null;
        token.isAdmin = claims.isAdmin;
        token.roles = claims.roles;
        token.permissions = claims.permissions;
      }

      return token;
    },
    async session({ session, token }) {
      session.user.id = String(token.id);
      session.user.emailVerified = typeof token.emailVerified === "string" ? new Date(token.emailVerified) : null;
      session.user.isAdmin = Boolean(token.isAdmin);
      session.user.roles = Array.isArray(token.roles) ? token.roles.map(String) : [];
      session.user.permissions = Array.isArray(token.permissions) ? token.permissions.map(String) : [];

      return session;
    },
  },
  events: {
    async linkAccount({ user, account }) {
      if ((account.provider === "google" || account.provider === "apple") && user.id) {
        await prisma.user.update({
          where: { id: user.id },
          data: {
            emailVerified: new Date(),
            provider: account.provider,
          },
        });
      }
    },
  },
});
