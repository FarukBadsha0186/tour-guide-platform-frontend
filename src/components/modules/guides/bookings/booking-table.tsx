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
import { StatusBadge } from "@/components/modules/admin/common/status-badge"
import { Eye } from "lucide-react"
import { format } from "date-fns"
import Link from "next/link"
import type { GuideBooking } from "@/types/guide.type"

interface BookingTableProps {
  bookings: GuideBooking[]
  onView: (booking: GuideBooking) => void
}

export function BookingTable({ bookings, onView }: BookingTableProps) {
  if (bookings.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg bg-muted/20">
        <p className="text-muted-foreground">No bookings yet</p>
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
            <TableHead>Package</TableHead>
            <TableHead>Tour Date</TableHead>
            <TableHead>People</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell>
                <span className="font-mono text-xs font-medium">
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
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">
                        {booking.tourist.user.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {booking.tourist.user.email}
                      </p>
                    </div>
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground">—</span>
                )}
              </TableCell>

              <TableCell>
                <span className="text-sm line-clamp-1">
                  {booking.package?.title || "—"}
                </span>
              </TableCell>

              <TableCell>
                <span className="text-sm">
                  {format(new Date(booking.tourDate), "MMM dd, yyyy")}
                </span>
              </TableCell>

              <TableCell>
                <span className="text-sm">{booking.numberOfPeople}</span>
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
                <Link href={`/guide/bookings/${booking.id}`}>
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}