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
import type { TouristBooking } from "@/types/tourist.type"

interface BookingTableProps {
  bookings: TouristBooking[]
}

export function BookingTable({ bookings }: BookingTableProps) {
  if (bookings.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg bg-muted/20">
        <p className="text-muted-foreground">No bookings yet</p>
        <p className="text-sm text-muted-foreground mt-1">
          Browse packages and book your first tour
        </p>
        <Link href="/packages">
          <Button className="mt-4">Browse Tours</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Reference</TableHead>
            <TableHead>Package</TableHead>
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
                <span className="font-mono text-xs font-medium">
                  {booking.bookingReference}
                </span>
              </TableCell>

              <TableCell>
                <span className="text-sm line-clamp-1">
                  {booking.package?.title || "—"}
                </span>
              </TableCell>

              <TableCell>
                {booking.guide?.user ? (
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={booking.guide.user.imageUrl}
                        alt={booking.guide.user.name}
                      />
                      <AvatarFallback>
                        {booking.guide.user.name?.charAt(0)?.toUpperCase() ||
                          "G"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">
                        {booking.guide.user.name}
                      </p>
                    </div>
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
                <Link href={`/tourist/bookings/${booking.id}`}>
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