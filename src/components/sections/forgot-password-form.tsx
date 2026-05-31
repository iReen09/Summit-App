"use client";

import { useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiRequest } from "@/lib/api-client";

export function ForgotPasswordForm() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);

    try {
      await apiRequest("/api/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({
          email: String(formData.get("email") ?? ""),
        }),
      });
      setSent(true);
      toast.success("Jika email terdaftar, link reset akan dikirim.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Request reset gagal.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="grid gap-4" onSubmit={onSubmit}>
      <div className="grid gap-2">
        <Label htmlFor="email">Email akun</Label>
        <Input id="email" name="email" type="email" autoComplete="email" placeholder="nama@email.com" required />
      </div>
      {sent ? <p className="rounded-md border bg-secondary p-3 text-sm text-muted-foreground">Cek inbox atau spam untuk link reset password.</p> : null}
      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading ? <Loader2 className="animate-spin" /> : null}
        Kirim link reset
      </Button>
    </form>
  );
}
