import { fail, handleRouteError, ok, parseJson } from "@/lib/server/http";
import { resetPassword, resetPasswordSchema } from "@/lib/server/auth-service";

export async function POST(request: Request) {
  try {
    const payload = resetPasswordSchema.parse(await parseJson(request));
    const result = await resetPassword(payload);

    if (!result.ok) {
      return fail(400, result.code, result.message);
    }

    return ok({ message: "Password berhasil diperbarui." });
  } catch (error) {
    return handleRouteError(error);
  }
}
