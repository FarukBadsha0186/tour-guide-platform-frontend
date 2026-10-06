"use client"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { StatusBadge } from "../common/status-badge"
import { format } from "date-fns"
import type { AdminPayment } from "@/types/admin.type"
import {
  CreditCard,
  DollarSign,
  TrendingUp,
  Building2,
  Calendar,
  User,
} from "lucide-react"

interface PaymentDetailSheetProps {
  payment: AdminPayment | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PaymentDetailSheet({
  payment,
  open,
  onOpenChange,
}: PaymentDetailSheetProps) {
  if (!payment) return null

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Payment Details</SheetTitle>
          <SheetDescription>
            Complete transaction information
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Transaction ID</p>
              <p className="font-mono text-xs">
                #{payment.id.slice(0, 12)}
              </p>
            </div>
            <StatusBadge status={payment.status} type="payment" />
          </div>

          <Separator />

          {/* Amount Breakdown */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Amount Breakdown</h4>

            <div className="rounded-lg border p-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Total Amount</span>
                <span className="font-semibold text-base">
                  ৳ {payment.amount}
                </span>
              </div>

              <Separator />

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Guide Earning
                </span>
                <span className="font-medium text-green-600">
                  ৳ {payment.guideEarning}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Commission Fee
                </span>
                <span className="font-medium">
                  ৳ {payment.commissionFee}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Platform Fee</span>
                <span className="font-medium">
                  ৳ {payment.platformFee}
                </span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Payment Info */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Payment Information</h4>

            <InfoRow
              label="Method"
              value={payment.paymentMethod}
            />
            <InfoRow
              label="bKash TRX ID"
              value={payment.bKashTrxId || "—"}
            />
            <InfoRow
              label="Created At"
              value={format(
                new Date(payment.createdAt),
                "MMM dd, yyyy HH:mm"
              )}
            />
            {payment.paidAt && (
              <InfoRow
                label="Paid At"
                value={format(
                  new Date(payment.paidAt),
                  "MMM dd, yyyy HH:mm"
                )}
              />
            )}
            {payment.refundedAt && (
              <InfoRow
                label="Refunded At"
                value={format(
                  new Date(payment.refundedAt),
                  "MMM dd, yyyy HH:mm"
                )}
              />
            )}
            {payment.refundReason && (
              <InfoRow
                label="Refund Reason"
                value={payment.refundReason}
              />
            )}
          </div>

          {/* Booking Info */}
          {payment.booking && (
            <>
              <Separator />
              <div className="space-y-3">
                <h4 className="text-sm font-semibold">Related Booking</h4>
                <div className="rounded-lg border p-4 space-y-2">
                  <InfoRow
                    label="Reference"
                    value={payment.booking.bookingReference}
                  />
                  <InfoRow
                    label="Tour Date"
                    value={format(
                      new Date(payment.booking.tourDate),
                      "MMM dd, yyyy"
                    )}
                  />
                  <InfoRow
                    label="Travelers"
                    value={String(payment.booking.numberOfPeople)}
                  />
                  {payment.booking.tourist?.user && (
                    <InfoRow
                      label="Tourist"
                      value={payment.booking.tourist.user.name}
                    />
                  )}
                  {payment.booking.guide?.user && (
                    <InfoRow
                      label="Guide"
                      value={payment.booking.guide.user.name}
                    />
                  )}
                </div>
              </div>
            </>
          )}

          {/* Payment Data (bKash URL, etc.) */}
          {payment.paymentData && Object.keys(payment.paymentData).length > 0 && (
            <>
              <Separator />
              <div className="space-y-3">
                <h4 className="text-sm font-semibold">Payment Gateway Data</h4>
                <pre className="rounded-lg bg-muted p-3 text-xs overflow-x-auto">
                  {JSON.stringify(payment.paymentData, null, 2)}
                </pre>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

// ========================================
// INFO ROW
// ========================================

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-right break-all">{value}</span>
    </div>
  )
}