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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StatusBadge } from "../common/status-badge"
import { Eye } from "lucide-react"
import type { AdminBooking } from "@/types/admin.type"
import { format } from "date-fns"

interface BookingTableProps {
  bookings: AdminBooking[]
  onView: (booking: AdminBooking) => void
}

export function BookingTable({ bookings, onView }: BookingTableProps) {
  if (bookings.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg bg-muted/20">
        <p className="text-muted-foreground">No bookings found</p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Reference</TableHead>
            <TableHead>Tourist</TableHead>
            <TableHead>Guide</TableHead>
            <TableHead>Tour Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell>
                <span className="font-mono text-sm font-medium">
                  {booking.bookingReference}
                </span>
              </TableCell>

              <TableCell>
                {booking.tourist?.user ? (
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={booking.tourist.user.imageUrl}
                        alt={booking.tourist.user.name}
                      />
                      <AvatarFallback>
                        {booking.tourist.user.name?.charAt(0)?.toUpperCase() ||
                          "T"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">
                        {booking.tourist.user.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {booking.tourist.user.email}
                      </p>
                    </div>
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground">—</span>
                )}
              </TableCell>

              <TableCell>
                {booking.guide?.user ? (
                  <div>
                    <p className="text-sm font-medium">
                      {booking.guide.user.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {booking.guide.user.email}
                    </p>
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground">—</span>
                )}
              </TableCell>

              <TableCell>
                <span className="text-sm">
                  {format(new Date(booking.tourDate), "MMM dd, yyyy")}
                </span>
              </TableCell>

              <TableCell>
                <span className="text-sm font-medium">
                  ৳ {booking.totalPrice}
                </span>
              </TableCell>

              <TableCell>
                <StatusBadge status={booking.status} type="booking" />
              </TableCell>

              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onView(booking)}
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