import Link from "next/link";
import { CheckCircle2, XCircle } from "lucide-react";

import { AuthPageShell } from "@/components/sections/auth-page-shell";
import { Button } from "@/components/ui/button";
import { verifyEmail } from "@/lib/server/auth-service";

export const metadata = {
  title: "Verifikasi Email",
};

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const params = await searchParams;
  let verified = false;

  if (params.token) {
    try {
      const result = await verifyEmail({ token: params.token });
      verified = result.ok;
    } catch {
      verified = false;
    }
  }

  return (
    <AuthPageShell
      badge="Email Verification"
      title={verified ? "Email berhasil diverifikasi" : "Link verifikasi tidak valid"}
      description={verified ? "Akun kamu sudah siap digunakan untuk login dan mengelola profil." : "Token verifikasi sudah kedaluwarsa, pernah dipakai, atau tidak ditemukan."}
      footer={
        <>
          Butuh link baru?{" "}
          <Link href="/masuk" className="font-medium text-primary hover:underline">
            Masuk atau daftar ulang
          </Link>
        </>
      }
    >
      <div className="rounded-md border bg-background p-5 text-center">
        {verified ? <CheckCircle2 className="mx-auto size-12 text-primary" /> : <XCircle className="mx-auto size-12 text-destructive" />}
        <p className="mt-4 text-sm text-muted-foreground">
          {verified ? "Silakan masuk memakai email dan password yang sudah dibuat." : "Minta ulang email verifikasi dari flow akun atau buat akun kembali jika belum berhasil."}
        </p>
        <Button asChild className="mt-5">
          <Link href="/masuk">Ke halaman masuk</Link>
        </Button>
      </div>
    </AuthPageShell>
  );
}
