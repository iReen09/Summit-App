import { forgotPasswordSchema, requestPasswordReset } from "@/lib/server/auth-service";
import { handleRouteError, ok, parseJson } from "@/lib/server/http";

const genericMessage = "Jika email terdaftar, instruksi reset password akan dikirim.";

export async function POST(request: Request) {
  try {
    const payload = forgotPasswordSchema.parse(await parseJson(request));
    await requestPasswordReset(payload);

    return ok({ message: genericMessage });
  } catch (error) {
    return handleRouteError(error);
  }
}
