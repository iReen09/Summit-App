import Link from "next/link";
import { KeyRound, MapPin, Mountain, PackageCheck, ShieldCheck } from "lucide-react";

import { AuthPageShell } from "@/components/sections/auth-page-shell";
import { LoginForm } from "@/components/sections/login-form";
import { hasAppleOAuthEnv, hasGoogleOAuthEnv } from "@/lib/server/env";

export const metadata = {
  title: "Masuk",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const params = await searchParams;
  const callbackUrl = params.callbackUrl?.startsWith("/") ? params.callbackUrl : "/akun/profil";

  return (
    <AuthPageShell
      badge="Login Customer"
      title="Masuk ke Summit Gear"
      description="Lanjutkan belanja, kelola alamat, dan pantau pesanan pendakian dari satu akun."
      footer={
        <>
          Belum punya akun?{" "}
          <Link href="/daftar" className="font-medium text-primary hover:underline">
            Daftar sekarang
          </Link>
        </>
      }
    >
      <div className="mb-6 rounded-[1.5rem] bg-primary p-4 text-primary-foreground">
        <div className="flex flex-wrap gap-2 text-sm">
          {["Pantau pesanan", "Alamat tersimpan", "Checkout cepat"].map((item) => (
            <span key={item} className="rounded-full bg-white/12 px-3 py-1.5">
              {item}
            </span>
          ))}
        </div>
        <p className="mt-4 text-sm leading-6 text-primary-foreground/78">
          Masuk untuk melanjutkan belanja gear, memakai alamat utama, dan melihat status order saat modul payment/fulfillment aktif.
        </p>
      </div>

      <LoginForm callbackUrl={callbackUrl} googleEnabled={hasGoogleOAuthEnv()} appleEnabled={hasAppleOAuthEnv()} />

      <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
        {[
          { icon: ShieldCheck, label: "Session protected" },
          { icon: KeyRound, label: "Reset password" },
          { icon: Mountain, label: "OAuth ready" },
          { icon: PackageCheck, label: "Order tracking" },
          { icon: MapPin, label: "Alamat utama" },
        ].map((item) => (
          <span key={item.label} className="inline-flex items-center gap-2">
            <item.icon className="size-4 text-primary" />
            {item.label}
          </span>
        ))}
      </div>
    </AuthPageShell>
  );
}
