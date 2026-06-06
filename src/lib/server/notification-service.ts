import { prisma } from "@/lib/db";

export async function createNotification(input: {
  userId: string;
  type: string;
  title: string;
  message: string;
  linkUrl?: string | null;
}) {
  return prisma.notification.create({
    data: {
      userId: input.userId,
      type: input.type,
      title: input.title,
      message: input.message,
      linkUrl: input.linkUrl ?? null,
    },
  });
}
