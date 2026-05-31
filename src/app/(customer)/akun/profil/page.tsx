import { redirect } from "next/navigation";

import { AccountShell } from "@/components/sections/account-shell";
import { ProfilePageClient } from "@/components/sections/profile-page-client";
import { auth } from "@/lib/auth";
import { getProfile } from "@/lib/server/account-service";

export const metadata = {
  title: "Profil Akun",
};

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/masuk?callbackUrl=/akun/profil");
  }

  const profile = await getProfile(session.user.id);

  return (
    <AccountShell
      title="Profil Akun"
      description="Kelola data identitas customer untuk checkout, notifikasi transaksi, dan proteksi session web."
    >
      <ProfilePageClient
        initialProfile={{
          ...profile,
          emailVerified: profile.emailVerified?.toISOString() ?? null,
          createdAt: profile.createdAt?.toISOString(),
          updatedAt: profile.updatedAt?.toISOString(),
        }}
      />
    </AccountShell>
  );
}
