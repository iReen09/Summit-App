import { requireUser } from "@/lib/server/authz";
import { handleRouteError, ok } from "@/lib/server/http";
import { listUserOrders, orderListQuerySchema } from "@/lib/server/order-service";

export async function GET(request: Request) {
  try {
    const user = await requireUser();
    if (!user.ok) return user.response;

    const url = new URL(request.url);
    const query = orderListQuerySchema.parse({
      status: url.searchParams.get("status") ?? "ALL",
    });

    return ok(await listUserOrders(user.userId, query));
  } catch (error) {
    return handleRouteError(error);
  }
}
