import Link from "next/link";

import { AuthPageShell } from "@/components/sections/auth-page-shell";
import { ResetPasswordForm } from "@/components/sections/reset-password-form";

export const metadata = {
  title: "Reset Password",
};

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const params = await searchParams;

  return (
    <AuthPageShell
      badge="Password Baru"
      title="Atur password baru"
      description="Gunakan link reset dari email untuk mengganti password akun Summit Gear."
      footer={
        <>
          Sudah ingat password?{" "}
          <Link href="/masuk" className="font-medium text-primary hover:underline">
            Masuk
          </Link>
        </>
      }
    >
      <ResetPasswordForm token={params.token} />
    </AuthPageShell>
  );
}
