import { CustomerFooter } from "@/components/layout/customer-footer";
import { CustomerHeader } from "@/components/layout/customer-header";
import { auth } from "@/lib/auth";

export default async function CustomerLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <div className="flex min-h-screen flex-col">
      <CustomerHeader
        user={
          session?.user
            ? {
                name: session.user.name ?? null,
                email: session.user.email ?? null,
                isAdmin: session.user.isAdmin ?? false,
              }
            : null
        }
      />
      <main className="flex-1">{children}</main>
      <CustomerFooter />
    </div>
  );
}
