"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiRequest } from "@/lib/api-client";

export function ResetPasswordForm({ token }: { token?: string }) {
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!token) {
      toast.error("Token reset tidak ditemukan.");
      return;
    }

    setLoading(true);
    const formData = new FormData(event.currentTarget);

    try {
      await apiRequest("/api/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({
          token,
          password: String(formData.get("password") ?? ""),
          confirmPassword: String(formData.get("confirmPassword") ?? ""),
        }),
      });
      setComplete(true);
      toast.success("Password berhasil diganti.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Reset password gagal.");
    } finally {
      setLoading(false);
    }
  }

  if (!token) {
    return (
      <div className="rounded-md border bg-background p-4">
        <h2 className="font-semibold">Link reset tidak valid</h2>
        <p className="mt-2 text-sm text-muted-foreground">Minta ulang link reset password dari halaman lupa password.</p>
        <Button asChild className="mt-4">
          <Link href="/lupa-password">Minta link reset</Link>
        </Button>
      </div>
    );
  }

  if (complete) {
    return (
      <div className="rounded-md border bg-background p-4">
        <h2 className="font-semibold">Password sudah diperbarui</h2>
        <p className="mt-2 text-sm text-muted-foreground">Silakan masuk memakai password baru.</p>
        <Button asChild className="mt-4">
          <Link href="/masuk">Masuk</Link>
        </Button>
      </div>
    );
  }

  return (
    <form className="grid gap-4" onSubmit={onSubmit}>
      <div className="grid gap-2">
        <Label htmlFor="password">Password baru</Label>
        <Input id="password" name="password" type="password" autoComplete="new-password" placeholder="Minimal 8 karakter" required minLength={8} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="confirmPassword">Konfirmasi password baru</Label>
        <Input id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" placeholder="Ulangi password" required minLength={8} />
      </div>
      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading ? <Loader2 className="animate-spin" /> : null}
        Simpan password baru
      </Button>
    </form>
  );
}
