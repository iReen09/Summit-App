import { PaymentStatusView } from "@/components/sections/payment-status-view";

export const metadata = {
  title: "Status Pembayaran",
};

export default async function PaymentStatusPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params;
  return <PaymentStatusView orderId={orderId} />;
}
