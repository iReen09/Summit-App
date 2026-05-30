import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Clock, MapPinned, ShieldCheck, Truck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function AuthPageShell({
  badge,
  title,
  description,
  children,
  footer,
}: {
  badge: string;
  title: string;
  description: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <section className="border-b bg-[linear-gradient(135deg,var(--secondary)_0%,var(--background)_48%,color-mix(in_oklab,var(--accent)_16%,var(--background))_100%)]">
      <div className="container-page grid min-h-[calc(100vh-4rem)] gap-8 py-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:py-12">
        <Card className="w-full overflow-hidden">
          <div className="h-2 bg-[linear-gradient(90deg,var(--primary),var(--accent))]" />
          <CardHeader>
            <Badge variant="accent" className="w-fit">
              {badge}
            </Badge>
            <CardTitle className="mt-3 text-2xl sm:text-3xl">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent>
            {children}
            {footer ? <div className="mt-5 text-center text-sm text-muted-foreground">{footer}</div> : null}
          </CardContent>
        </Card>

        <div className="relative hidden min-h-[620px] overflow-hidden rounded-lg bg-primary text-primary-foreground shadow-sm lg:block">
          <Image
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80"
            alt="Pendaki menyiapkan perlengkapan outdoor"
            fill
            priority
            className="object-cover opacity-45"
            sizes="50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-primary/10" />
          <div className="absolute left-6 top-6 grid grid-cols-3 gap-2">
            {[
              { value: "3", label: "langkah akun" },
              { value: "24j", label: "VA timer" },
              { value: "7h", label: "return" },
            ].map((item) => (
              <div key={item.label} className="rounded-md border border-white/20 bg-white/15 px-3 py-2 text-center backdrop-blur">
                <div className="text-lg font-semibold">{item.value}</div>
                <div className="text-[11px] text-primary-foreground/75">{item.label}</div>
              </div>
            ))}
          </div>
          <div className="absolute inset-x-0 bottom-0 p-8">
            <Badge variant="secondary" className="mb-4">
              Summit Gear Account
            </Badge>
            <h2 className="max-w-lg text-4xl font-semibold tracking-normal">Belanja gear pendakian lebih cepat, aman, dan mudah dilacak.</h2>
            <div className="mt-6 grid gap-3">
              {[
                { icon: CheckCircle2, label: "Profil dan alamat tersimpan untuk checkout Sprint 4." },
                { icon: ShieldCheck, label: "Session web disiapkan untuk Auth.js dan RBAC admin." },
                { icon: Truck, label: "Pesanan, tracking, dan notifikasi siap mengikuti flow PRD." },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3 rounded-md border border-white/20 bg-white/10 p-3 text-sm backdrop-blur">
                  <item.icon className="size-4 shrink-0" />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {[
                { icon: MapPinned, label: "Alamat utama" },
                { icon: Clock, label: "Reset aman" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 rounded-md bg-primary-foreground/95 px-3 py-2 text-sm font-medium text-primary">
                  <item.icon className="size-4" />
                  {item.label}
                </div>
              ))}
            </div>
            <Link href="/produk" className="mt-6 inline-flex text-sm font-medium text-primary-foreground/85 hover:text-primary-foreground">
              Lihat katalog Summit Gear
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
