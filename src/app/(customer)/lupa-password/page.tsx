import Link from "next/link";
import { KeyRound, MailCheck, ShieldCheck } from "lucide-react";

import { AuthPageShell } from "@/components/sections/auth-page-shell";
import { ForgotPasswordForm } from "@/components/sections/forgot-password-form";

export const metadata = {
  title: "Lupa Password",
};

export default function ForgotPasswordPage() {
  return (
    <AuthPageShell
      badge="Reset Password"
      title="Pulihkan akses akun"
      description="Masukkan email terdaftar untuk menerima tautan reset password yang aman."
      footer={
        <>
          Ingat password?{" "}
          <Link href="/masuk" className="font-medium text-primary hover:underline">
            Kembali masuk
          </Link>
        </>
      }
    >
      <ForgotPasswordForm />

      <div className="mt-6 grid gap-3">
        {[
          { icon: MailCheck, label: "Link reset dikirim ke email terdaftar." },
          { icon: KeyRound, label: "Password baru wajib minimal 8 karakter." },
          { icon: ShieldCheck, label: "Token reset akan dibuat dengan masa berlaku terbatas." },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-3 rounded-md border bg-background p-3 text-sm">
            <item.icon className="size-4 text-primary" />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </AuthPageShell>
  );
}
