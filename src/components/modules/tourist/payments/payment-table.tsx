"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { StatusBadge } from "@/components/modules/admin/common/status-badge"
import { format } from "date-fns"
import type { TouristPayment } from "@/types/tourist.type"

interface PaymentTableProps {
  payments: TouristPayment[]
}

export function PaymentTable({ payments }: PaymentTableProps) {
  if (payments.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg bg-muted/20">
        <p className="text-muted-foreground">No payments yet</p>
        <p className="text-sm text-muted-foreground mt-1">
          Your payment history will appear here
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Transaction</TableHead>
            <TableHead>Booking Ref</TableHead>
            <TableHead>Package</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell>
                <span className="font-mono text-xs">
                  #{payment.id.slice(0, 8)}
                </span>
              </TableCell>

              <TableCell>
                <span className="font-mono text-xs font-medium">
                  {payment.booking?.bookingReference || "—"}
                </span>
              </TableCell>

              <TableCell>
                <span className="text-sm line-clamp-1">
                  {payment.booking?.package?.title || "—"}
                </span>
              </TableCell>

              <TableCell>
                <span className="text-sm">{payment.paymentMethod}</span>
              </TableCell>

              <TableCell>
                <span className="text-sm font-medium">
                  ৳ {payment.amount}
                </span>
              </TableCell>

              <TableCell>
                <StatusBadge status={payment.status} type="payment" />
              </TableCell>

              <TableCell>
                <span className="text-sm">
                  {format(new Date(payment.createdAt), "MMM dd, yyyy")}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}