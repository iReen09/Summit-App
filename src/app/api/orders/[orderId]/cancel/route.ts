import { requireUser } from "@/lib/server/authz";
import { cancelUserOrder } from "@/lib/server/order-service";
import { handleRouteError, ok } from "@/lib/server/http";

export async function POST(_request: Request, { params }: { params: Promise<{ orderId: string }> }) {
  try {
    const user = await requireUser();
    if (!user.ok) return user.response;

    const { orderId } = await params;
    return ok(await cancelUserOrder(user.userId, orderId));
  } catch (error) {
    return handleRouteError(error);
  }
}
