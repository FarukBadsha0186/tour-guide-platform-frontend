"use client"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { StatusBadge } from "../common/status-badge"
import { format } from "date-fns"
import type { AdminBooking } from "@/types/admin.type"
import { Calendar, Users, DollarSign, Hash } from "lucide-react"

interface BookingDetailSheetProps {
  booking: AdminBooking | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function BookingDetailSheet({
  booking,
  open,
  onOpenChange,
}: BookingDetailSheetProps) {
  if (!booking) return null

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Booking Details</SheetTitle>
          <SheetDescription>
            Complete information about this booking
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Booking Reference</p>
              <p className="font-mono text-sm font-semibold">
                {booking.bookingReference}
              </p>
            </div>
            <StatusBadge status={booking.status} type="booking" />
          </div>

          <Separator />

          {/* Summary Cards */}
          <div className="grid grid-cols-2 gap-3">
            <StatCard
              icon={<Calendar className="h-4 w-4" />}
              label="Tour Date"
              value={format(new Date(booking.tourDate), "MMM dd, yyyy")}
            />
            <StatCard
              icon={<Users className="h-4 w-4" />}
              label="Travelers"
              value={String(booking.numberOfPeople)}
            />
            <StatCard
              icon={<DollarSign className="h-4 w-4" />}
              label="Total Price"
              value={`৳ ${booking.totalPrice}`}
            />
            <StatCard
              icon={<Hash className="h-4 w-4" />}
              label="Booking ID"
              value={`#${booking.id.slice(0, 8)}`}
            />
          </div>

          {/* Tourist */}
          {booking.tourist?.user && (
            <>
              <Separator />
              <div className="space-y-3">
                <h4 className="text-sm font-semibold">Tourist</h4>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
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
              </div>
            </>
          )}

          {/* Guide */}
          {booking.guide?.user && (
            <>
              <Separator />
              <div className="space-y-3">
                <h4 className="text-sm font-semibold">Guide</h4>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
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
                    <p className="text-xs text-muted-foreground">
                      {booking.guide.user.email}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Timeline */}
          <Separator />
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Timeline</h4>
            <InfoRow
              label="Created"
              value={format(new Date(booking.createdAt), "MMM dd, yyyy HH:mm")}
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

// ========================================
// HELPERS
// ========================================

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  )
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="rounded-lg border p-3 space-y-1">
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}
        <span className="text-xs">{label}</span>
      </div>
      <p className="text-sm font-semibold truncate">{value}</p>
    </div>
  )
}