import { OrderDetailView } from "@/components/sections/order-detail-view";

export const metadata = {
  title: "Detail Pesanan",
};

export default async function OrderDetailPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params;
  return <OrderDetailView orderId={orderId} />;
}
