import { CheckCircle2, Home, MapPin, Plus, Save, Star, Truck } from "lucide-react";

import { AccountShell } from "@/components/sections/account-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const metadata = {
  title: "Alamat Pengiriman",
};

const savedAddresses = [
  {
    label: "Rumah",
    recipient: "Summit Customer",
    phone: "0812 3456 7890",
    address: "Jl. Merapi Raya No. 18, Sleman, Daerah Istimewa Yogyakarta 55581",
    primary: true,
  },
  {
    label: "Kantor",
    recipient: "Tim Basecamp",
    phone: "0812 8888 7788",
    address: "Jl. Sudirman Kav. 7, Jakarta Pusat, DKI Jakarta 10220",
    primary: false,
  },
];

export default function AddressesPage() {
  return (
    <AccountShell
      title="Alamat Pengiriman"
      description="Kelola multiple alamat dan pilih alamat utama untuk checkout, ongkir, COD, dan fulfillment."
    >
      <div className="grid gap-5">
        <div className="grid gap-4 rounded-lg border bg-[linear-gradient(135deg,var(--secondary),var(--background))] p-4 sm:grid-cols-3">
          {[
            { label: "Alamat utama", value: "Rumah", icon: Home },
            { label: "Alamat tersimpan", value: "2 lokasi", icon: MapPin },
            { label: "Checkout readiness", value: "Siap", icon: CheckCircle2 },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3 rounded-md bg-card p-3 shadow-sm">
              <div className="grid size-10 place-items-center rounded-md bg-primary text-primary-foreground">
                <item.icon className="size-4" />
              </div>
              <div>
                <div className="text-sm font-semibold">{item.value}</div>
                <div className="text-xs text-muted-foreground">{item.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-normal">Daftar alamat</h2>
            <p className="mt-1 text-sm text-muted-foreground">Data statis frontend untuk kontrak UI CRUD alamat A-05.</p>
          </div>
          <Button type="button" variant="accent">
            <Plus /> Tambah alamat
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {savedAddresses.map((item) => (
            <Card key={item.label} className={item.primary ? "overflow-hidden border-primary" : "overflow-hidden"}>
              <div className={item.primary ? "h-1.5 bg-[linear-gradient(90deg,var(--primary),var(--accent))]" : "h-1.5 bg-secondary"} />
              <CardHeader className="flex flex-row items-start justify-between gap-4">
                <div>
                  <CardTitle className="flex items-center gap-2 text-base">
                    {item.primary ? <Home className="size-4 text-primary" /> : <MapPin className="size-4 text-primary" />}
                    {item.label}
                  </CardTitle>
                  <CardDescription>{item.recipient}</CardDescription>
                </div>
                {item.primary ? <Badge>Utama</Badge> : <Badge variant="secondary">Tersimpan</Badge>}
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="text-sm text-muted-foreground">
                  <div>{item.phone}</div>
                  <div className="mt-1">{item.address}</div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button type="button" variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button type="button" variant="ghost" size="sm" disabled={item.primary}>
                    Jadikan utama
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-5 xl:grid-cols-[1fr_0.75fr]">
          <Card className="overflow-hidden">
            <div className="h-1 bg-primary" />
            <CardHeader>
              <CardTitle>Form alamat</CardTitle>
              <CardDescription>Field mengikuti kebutuhan checkout: penerima, nomor HP, wilayah, kode pos, dan detail alamat.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="label">Label alamat</Label>
                    <Input id="label" placeholder="Rumah, Kantor, Basecamp" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="recipient">Nama penerima</Label>
                    <Input id="recipient" autoComplete="name" placeholder="Nama penerima paket" />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Nomor HP penerima</Label>
                    <Input id="phone" type="tel" autoComplete="tel" placeholder="08xxxxxxxxxx" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="postal-code">Kode pos</Label>
                    <Input id="postal-code" inputMode="numeric" autoComplete="postal-code" placeholder="12345" />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="grid gap-2">
                    <Label htmlFor="province">Provinsi</Label>
                    <Input id="province" placeholder="Jawa Barat" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="city">Kota/Kabupaten</Label>
                    <Input id="city" placeholder="Bandung" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="district">Kecamatan</Label>
                    <Input id="district" placeholder="Coblong" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="full-address">Alamat lengkap</Label>
                  <Textarea id="full-address" placeholder="Nama jalan, nomor rumah, patokan, dan catatan kurir" />
                </div>
                <label className="flex items-center gap-2 text-sm text-muted-foreground">
                  <input type="checkbox" className="size-4 rounded border-input accent-primary" />
                  Jadikan alamat utama
                </label>
                <Button type="button" className="w-full sm:w-fit">
                  <Save /> Simpan alamat
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="overflow-hidden bg-primary text-primary-foreground">
            <div className="h-1 bg-accent" />
            <CardHeader>
              <CardTitle>Kesiapan checkout</CardTitle>
              <CardDescription className="text-primary-foreground/72">Alamat menjadi sumber kalkulasi ongkir, validasi COD, dan shipment snapshot.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 text-sm">
              {[
                { icon: Truck, text: "Provinsi, kota, kecamatan, dan kode pos siap dipakai untuk ongkir RajaOngkir/BinderByte." },
                { icon: Star, text: "Satu alamat utama diprioritaskan pada checkout agar flow mobile tetap cepat." },
                { icon: MapPin, text: "Detail alamat disimpan sebagai snapshot order saat checkout dibuat." },
              ].map((item) => (
                <div key={item.text} className="flex gap-3 rounded-md border border-white/15 bg-white/10 p-3">
                  <item.icon className="mt-0.5 size-4 shrink-0 text-accent" />
                  <span>{item.text}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </AccountShell>
  );
}
