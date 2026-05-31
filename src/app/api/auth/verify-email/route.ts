import { fail, handleRouteError, ok, parseJson } from "@/lib/server/http";
import { verifyEmail, verifyEmailSchema } from "@/lib/server/auth-service";

export async function POST(request: Request) {
  try {
    const payload = verifyEmailSchema.parse(await parseJson(request));
    const result = await verifyEmail(payload);

    if (!result.ok) {
      return fail(400, result.code, result.message);
    }

    return ok(result.user);
  } catch (error) {
    return handleRouteError(error);
  }
}
