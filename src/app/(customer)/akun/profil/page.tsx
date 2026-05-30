import Link from "next/link";
import { Camera, CheckCircle2, KeyRound, LogOut, MailCheck, Phone, Save, ShieldCheck, Sparkles, UserRound } from "lucide-react";

import { AccountShell } from "@/components/sections/account-shell";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "Profil Akun",
};

export default function ProfilePage() {
  return (
    <AccountShell
      title="Profil Akun"
      description="Kelola data identitas customer untuk checkout, notifikasi transaksi, dan proteksi session web."
    >
      <div className="grid gap-5">
        <Card className="overflow-hidden">
          <div className="h-2 bg-[linear-gradient(90deg,var(--primary),var(--accent))]" />
          <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Ringkasan akun</CardTitle>
              <CardDescription>Status data utama sebelum checkout dan order tracking aktif.</CardDescription>
            </div>
            <Badge variant="accent" className="w-fit">
              Customer Active
            </Badge>
          </CardHeader>
          <CardContent className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="rounded-md bg-secondary p-4">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Sparkles className="size-4 text-accent" />
                Kelengkapan profil
              </div>
              <div className="mt-4">
                <div className="flex items-end justify-between gap-3">
                  <span className="text-4xl font-semibold">80%</span>
                  <span className="text-xs text-muted-foreground">Siap checkout</span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-background">
                  <div className="h-full w-4/5 rounded-full bg-[linear-gradient(90deg,var(--primary),var(--accent))]" />
                </div>
                <p className="mt-3 text-sm text-muted-foreground">Lengkapi nomor HP dan alamat utama untuk membuka alur COD, ongkir, dan notifikasi transaksi.</p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
            {[
              { icon: MailCheck, label: "Email", value: "Menunggu verifikasi endpoint" },
              { icon: Phone, label: "Nomor HP", value: "Wajib untuk COD" },
              { icon: ShieldCheck, label: "Session", value: "JWT Auth.js ready" },
            ].map((item) => (
              <div key={item.label} className="rounded-md border bg-background p-4">
                <item.icon className="size-5 text-primary" />
                <div className="mt-3 text-sm font-medium">{item.label}</div>
                <div className="mt-1 text-sm text-muted-foreground">{item.value}</div>
              </div>
            ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-5 xl:grid-cols-[1fr_0.85fr]">
          <Card className="overflow-hidden">
            <div className="h-1 bg-primary" />
            <CardHeader>
              <CardTitle>Data profil</CardTitle>
              <CardDescription>Edit nama, nomor HP, dan foto profil sesuai requirement A-04 PRD.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="grid gap-5">
                <div className="rounded-lg bg-secondary/70 p-4">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Avatar className="size-20 border-4 border-background shadow-sm">
                    <AvatarFallback className="bg-secondary text-xl text-primary">SG</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-2">
                    <Label htmlFor="avatar">Foto profil</Label>
                    <div className="flex flex-wrap gap-2">
                      <Input id="avatar" type="file" accept="image/png,image/jpeg,image/webp" className="max-w-sm" />
                      <Button type="button" variant="outline">
                        <Camera /> Pilih foto
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">Validasi tipe dan ukuran file dilakukan server-side saat storage aktif.</p>
                  </div>
                  </div>
                </div>

                <Separator />

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Nama lengkap</Label>
                    <Input id="name" autoComplete="name" defaultValue="Summit Customer" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Nomor HP</Label>
                    <Input id="phone" type="tel" autoComplete="tel" placeholder="08xxxxxxxxxx" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" autoComplete="email" defaultValue="customer@summitgear.id" readOnly />
                  <p className="text-xs text-muted-foreground">Email menjadi identitas login dan target verifikasi/reset password.</p>
                </div>
                <Button type="button" className="w-full sm:w-fit">
                  <Save /> Simpan profil
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <div className="h-1 bg-accent" />
            <CardHeader>
              <CardTitle>Keamanan akun</CardTitle>
              <CardDescription>Password, reset access, dan logout untuk session management A-07.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="current-password">Password saat ini</Label>
                  <Input id="current-password" type="password" autoComplete="current-password" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="new-password">Password baru</Label>
                  <Input id="new-password" type="password" autoComplete="new-password" placeholder="Minimal 8 karakter" />
                </div>
                <Button type="button" variant="secondary">
                  <KeyRound /> Update password
                </Button>
              </form>

              <Separator className="my-5" />

              <div className="grid gap-3">
                <Link href="/lupa-password" className="flex items-center gap-3 rounded-md border bg-background p-3 text-sm hover:border-primary">
                  <CheckCircle2 className="size-4 text-primary" />
                  Kirim ulang link reset password
                </Link>
                <Button type="button" variant="outline" className="justify-start">
                  <LogOut /> Logout dari perangkat ini
                </Button>
                <div className="flex gap-3 rounded-md bg-secondary p-3 text-sm text-muted-foreground">
                  <UserRound className="mt-0.5 size-4 shrink-0 text-primary" />
                  Halaman ini siap diproteksi setelah middleware session Sprint 2 diaktifkan.
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AccountShell>
  );
}
