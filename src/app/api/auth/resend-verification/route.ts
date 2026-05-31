import { handleRouteError, ok, parseJson } from "@/lib/server/http";
import { resendVerification, resendVerificationSchema } from "@/lib/server/auth-service";

const genericMessage = "Jika email terdaftar dan belum diverifikasi, link verifikasi baru akan dikirim.";

export async function POST(request: Request) {
  try {
    const payload = resendVerificationSchema.parse(await parseJson(request));
    await resendVerification(payload);

    return ok({ message: genericMessage });
  } catch (error) {
    return handleRouteError(error);
  }
}
