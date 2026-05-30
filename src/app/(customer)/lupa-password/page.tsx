import Link from "next/link";
import { KeyRound, MailCheck, ShieldCheck } from "lucide-react";

import { AuthPageShell } from "@/components/sections/auth-page-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
      <form className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email akun</Label>
          <Input id="email" type="email" autoComplete="email" placeholder="nama@email.com" />
        </div>
        <Button type="button" size="lg" className="w-full">
          Kirim link reset
        </Button>
      </form>

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
