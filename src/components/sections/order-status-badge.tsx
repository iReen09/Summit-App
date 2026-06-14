import { Badge } from "@/components/ui/badge";
import type { CustomerOrderStatus, CustomerPaymentStatus } from "@/lib/commerce-types";
import { cn } from "@/lib/utils";

const orderLabels: Record<CustomerOrderStatus, string> = {
  PENDING_PAYMENT: "Menunggu Pembayaran",
  PAID: "Sudah Dibayar",
  PROCESSING: "Diproses",
  SHIPPED: "Dikirim",
  DELIVERED: "Terkirim",
  COMPLETED: "Selesai",
  CANCELLED: "Dibatalkan",
  EXPIRED: "Kedaluwarsa",
};

const paymentLabels: Record<CustomerPaymentStatus, string> = {
  PENDING: "Pending",
  PAID: "Lunas",
  FAILED: "Gagal",
  EXPIRED: "Kedaluwarsa",
  REFUNDED: "Dikembalikan",
};

export function OrderStatusBadge({ status, className }: { status: CustomerOrderStatus; className?: string }) {
  const tone: Record<CustomerOrderStatus, string> = {
    PENDING_PAYMENT: "border-accent/40 bg-accent/15 text-accent-foreground",
    PAID: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700",
    PROCESSING: "border-primary/30 bg-primary/10 text-primary",
    SHIPPED: "border-blue-500/30 bg-blue-500/10 text-blue-700",
    DELIVERED: "border-cyan-500/30 bg-cyan-500/10 text-cyan-700",
    COMPLETED: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700",
    CANCELLED: "border-destructive/30 bg-destructive/10 text-destructive",
    EXPIRED: "border-muted-foreground/30 bg-secondary text-muted-foreground",
  };

  return (
    <Badge variant="outline" className={cn(tone[status], className)}>
      {orderLabels[status]}
    </Badge>
  );
}

export function PaymentStatusBadge({ status, className }: { status: CustomerPaymentStatus; className?: string }) {
  const tone: Record<CustomerPaymentStatus, string> = {
    PENDING: "border-accent/40 bg-accent/15 text-accent-foreground",
    PAID: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700",
    FAILED: "border-destructive/30 bg-destructive/10 text-destructive",
    EXPIRED: "border-muted-foreground/30 bg-secondary text-muted-foreground",
    REFUNDED: "border-blue-500/30 bg-blue-500/10 text-blue-700",
  };

  return (
    <Badge variant="outline" className={cn(tone[status], className)}>
      {paymentLabels[status]}
    </Badge>
  );
}
