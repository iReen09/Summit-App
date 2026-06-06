-- Sprint 5 payment/order extensions.
ALTER TABLE "Order" ADD COLUMN "stockReleasedAt" TIMESTAMP(3);

ALTER TABLE "Payment" ADD COLUMN "snapToken" TEXT;
ALTER TABLE "Payment" ADD COLUMN "redirectUrl" TEXT;
ALTER TABLE "Payment" ADD COLUMN "paymentType" TEXT;
ALTER TABLE "Payment" ADD COLUMN "fraudStatus" TEXT;

CREATE INDEX "Order_expiresAt_idx" ON "Order"("expiresAt");
CREATE INDEX "Payment_midtransOrderId_idx" ON "Payment"("midtransOrderId");
CREATE INDEX "Payment_status_idx" ON "Payment"("status");
