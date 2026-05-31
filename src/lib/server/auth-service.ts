import bcrypt from "bcryptjs";
import { z } from "zod";

import { prisma } from "@/lib/db";
import { getAppUrl } from "@/lib/server/env";
import { sendPasswordResetEmail, sendVerificationEmail } from "@/lib/server/email-service";
import { addHours, generatePublicToken, hashToken } from "@/lib/server/token-service";

export const registerSchema = z
  .object({
    name: z.string().trim().min(2, "Nama minimal 2 karakter").max(120),
    email: z.string().trim().email("Email tidak valid").max(180),
    phone: z.string().trim().min(8).max(24).optional().or(z.literal("")),
    password: z.string().min(8, "Password minimal 8 karakter").max(100),
    confirmPassword: z.string().min(8).max(100),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: "Konfirmasi password tidak sama",
    path: ["confirmPassword"],
  });

export const verifyEmailSchema = z.object({
  token: z.string().trim().min(32),
});

export const forgotPasswordSchema = z.object({
  email: z.string().trim().email().max(180),
});

export const resetPasswordSchema = z
  .object({
    token: z.string().trim().min(32),
    password: z.string().min(8, "Password minimal 8 karakter").max(100),
    confirmPassword: z.string().min(8).max(100),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: "Konfirmasi password tidak sama",
    path: ["confirmPassword"],
  });

export const resendVerificationSchema = z.object({
  email: z.string().trim().email().max(180),
});

function verificationUrl(token: string) {
  return `${getAppUrl()}/verifikasi-email?token=${encodeURIComponent(token)}`;
}

function resetPasswordUrl(token: string) {
  return `${getAppUrl()}/reset-password?token=${encodeURIComponent(token)}`;
}

async function createEmailVerificationToken(userId: string) {
  const token = generatePublicToken();

  await prisma.emailVerificationToken.create({
    data: {
      userId,
      tokenHash: hashToken(token),
      expiresAt: addHours(24),
    },
  });

  return token;
}

async function createPasswordResetToken(userId: string) {
  const token = generatePublicToken();

  await prisma.passwordResetToken.create({
    data: {
      userId,
      tokenHash: hashToken(token),
      expiresAt: addHours(1),
    },
  });

  return token;
}

export async function registerCustomer(input: z.infer<typeof registerSchema>) {
  const email = input.email.toLowerCase();
  const existingUser = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });

  if (existingUser) {
    return {
      ok: false as const,
      code: "EMAIL_ALREADY_REGISTERED",
      message: "Email sudah terdaftar.",
    };
  }

  const passwordHash = await bcrypt.hash(input.password, 12);
  const user = await prisma.user.create({
    data: {
      name: input.name,
      email,
      phone: input.phone || null,
      passwordHash,
      provider: "credentials",
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      emailVerified: true,
      createdAt: true,
    },
  });

  const token = await createEmailVerificationToken(user.id);

  await sendVerificationEmail({
    email: user.email,
    name: user.name,
    verificationUrl: verificationUrl(token),
  });

  return {
    ok: true as const,
    user,
  };
}

export async function verifyEmail(input: z.infer<typeof verifyEmailSchema>) {
  const tokenHash = hashToken(input.token);
  const token = await prisma.emailVerificationToken.findUnique({
    where: { tokenHash },
  });

  if (!token || token.consumedAt || token.expiresAt < new Date()) {
    return {
      ok: false as const,
      code: "INVALID_OR_EXPIRED_TOKEN",
      message: "Token verifikasi tidak valid atau sudah kedaluwarsa.",
    };
  }

  const now = new Date();

  const user = await prisma.$transaction(async (tx) => {
    const updatedUser = await tx.user.update({
      where: { id: token.userId },
      data: { emailVerified: now },
      select: {
        id: true,
        email: true,
        emailVerified: true,
      },
    });

    await tx.emailVerificationToken.update({
      where: { id: token.id },
      data: { consumedAt: now },
    });

    await tx.emailVerificationToken.updateMany({
      where: {
        userId: token.userId,
        consumedAt: null,
        id: { not: token.id },
      },
      data: { consumedAt: now },
    });

    return updatedUser;
  });

  return {
    ok: true as const,
    user,
  };
}

export async function requestPasswordReset(input: z.infer<typeof forgotPasswordSchema>) {
  const email = input.email.toLowerCase();
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  if (!user) {
    return { ok: true as const };
  }

  await prisma.passwordResetToken.updateMany({
    where: {
      userId: user.id,
      consumedAt: null,
    },
    data: {
      consumedAt: new Date(),
    },
  });

  const token = await createPasswordResetToken(user.id);

  await sendPasswordResetEmail({
    email: user.email,
    name: user.name,
    resetUrl: resetPasswordUrl(token),
  });

  return { ok: true as const };
}

export async function resetPassword(input: z.infer<typeof resetPasswordSchema>) {
  const tokenHash = hashToken(input.token);
  const token = await prisma.passwordResetToken.findUnique({
    where: { tokenHash },
  });

  if (!token || token.consumedAt || token.expiresAt < new Date()) {
    return {
      ok: false as const,
      code: "INVALID_OR_EXPIRED_TOKEN",
      message: "Token reset password tidak valid atau sudah kedaluwarsa.",
    };
  }

  const now = new Date();
  const passwordHash = await bcrypt.hash(input.password, 12);

  await prisma.$transaction([
    prisma.user.update({
      where: { id: token.userId },
      data: { passwordHash },
    }),
    prisma.passwordResetToken.update({
      where: { id: token.id },
      data: { consumedAt: now },
    }),
    prisma.passwordResetToken.updateMany({
      where: {
        userId: token.userId,
        consumedAt: null,
        id: { not: token.id },
      },
      data: { consumedAt: now },
    }),
  ]);

  return { ok: true as const };
}

export async function resendVerification(input: z.infer<typeof resendVerificationSchema>) {
  const email = input.email.toLowerCase();
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      name: true,
      email: true,
      emailVerified: true,
    },
  });

  if (!user || user.emailVerified) {
    return { ok: true as const };
  }

  await prisma.emailVerificationToken.updateMany({
    where: {
      userId: user.id,
      consumedAt: null,
    },
    data: {
      consumedAt: new Date(),
    },
  });

  const token = await createEmailVerificationToken(user.id);

  await sendVerificationEmail({
    email: user.email,
    name: user.name,
    verificationUrl: verificationUrl(token),
  });

  return { ok: true as const };
}

export async function getAdminClaims(userId: string) {
  const admin = await prisma.adminUser.findUnique({
    where: { userId },
    include: {
      role: {
        include: {
          permissions: {
            include: {
              permission: true,
            },
          },
        },
      },
    },
  });

  if (!admin || admin.status !== "ACTIVE") {
    return {
      isAdmin: false,
      roles: [],
      permissions: [],
    };
  }

  return {
    isAdmin: true,
    roles: [admin.role.code],
    permissions: admin.role.permissions.map((item) => item.permission.code),
  };
}

export async function getUserSessionClaims(userId: string) {
  const [user, adminClaims] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        emailVerified: true,
      },
    }),
    getAdminClaims(userId),
  ]);

  return {
    id: user?.id ?? userId,
    emailVerified: user?.emailVerified ?? null,
    ...adminClaims,
  };
}
