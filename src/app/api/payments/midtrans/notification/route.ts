import { handleRouteError, ok, parseJson } from "@/lib/server/http";
import { processMidtransNotification } from "@/lib/server/payment-service";

export async function POST(request: Request) {
  try {
    const payload = await parseJson(request);
    return ok(await processMidtransNotification(payload));
  } catch (error) {
    return handleRouteError(error);
  }
}
