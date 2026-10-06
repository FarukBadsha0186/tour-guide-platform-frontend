"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "../common/status-badge"
import { Eye } from "lucide-react"
import type { AdminPayment } from "@/types/admin.type"
import { format } from "date-fns"

interface PaymentTableProps {
  payments: AdminPayment[]
  onView: (payment: AdminPayment) => void
}

export function PaymentTable({ payments, onView }: PaymentTableProps) {
  if (payments.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg bg-muted/20">
        <p className="text-muted-foreground">No payments found</p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Transaction</TableHead>
            <TableHead>Booking</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Platform Fee</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
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
                <span className="font-mono text-sm font-medium">
                  {payment.booking?.bookingReference || "—"}
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
                <span className="text-sm text-muted-foreground">
                  ৳ {payment.platformFee}
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

              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onView(payment)}
                  title="View details"
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}