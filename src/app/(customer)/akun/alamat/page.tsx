import { redirect } from "next/navigation";

import { AccountShell } from "@/components/sections/account-shell";
import { AddressesPageClient } from "@/components/sections/addresses-page-client";
import { auth } from "@/lib/auth";
import { listAddresses } from "@/lib/server/account-service";

export const metadata = {
  title: "Alamat Pengiriman",
};

export default async function AddressesPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/masuk?callbackUrl=/akun/alamat");
  }

  const addresses = await listAddresses(session.user.id);

  return (
    <AccountShell
      title="Alamat Pengiriman"
      description="Kelola multiple alamat dan pilih alamat utama untuk checkout, ongkir, COD, dan fulfillment."
    >
      <AddressesPageClient
        initialAddresses={addresses.map((address) => ({
          id: address.id,
          label: address.label,
          recipient: address.recipient,
          phone: address.phone,
          fullAddress: address.fullAddress,
          province: address.province,
          city: address.city,
          district: address.district,
          postalCode: address.postalCode,
          isPrimary: address.isPrimary,
        }))}
      />
    </AccountShell>
  );
}
