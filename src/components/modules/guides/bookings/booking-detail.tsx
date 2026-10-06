"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { StatusBadge } from "@/components/modules/admin/common/status-badge"
import { format } from "date-fns"
import type { GuideBooking } from "@/types/guide.type"
import {
  Calendar,
  Users,
  DollarSign,
  Hash,
  Clock,
  MessageSquare,
} from "lucide-react"

interface BookingDetailProps {
  booking: GuideBooking
}

export function BookingDetail({ booking }: BookingDetailProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs text-muted-foreground">Booking Reference</p>
          <p className="font-mono text-lg font-semibold">
            {booking.bookingReference}
          </p>
        </div>
        <StatusBadge status={booking.status} type="booking" />
      </div>

      <Separator />

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
          icon={<Clock className="h-4 w-4" />}
          label="Booked On"
          value={format(new Date(booking.createdAt), "MMM dd, yyyy")}
        />
      </div>

      {/* Tourist */}
      {booking.tourist?.user && (
        <>
          <Separator />
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Tourist</h4>
            <div className="flex items-center gap-3 p-3 rounded-lg border">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src={booking.tourist.user.imageUrl}
                  alt={booking.tourist.user.name}
                />
                <AvatarFallback>
                  {booking.tourist.user.name?.charAt(0)?.toUpperCase() || "T"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium">{booking.tourist.user.name}</p>
                <p className="text-sm text-muted-foreground">
                  {booking.tourist.user.email}
                </p>
                {booking.tourist.contactNumber && (
                  <p className="text-sm text-muted-foreground">
                    📞 {booking.tourist.contactNumber}
                  </p>
                )}
                {booking.tourist.nationality && (
                  <p className="text-sm text-muted-foreground">
                    🌍 {booking.tourist.nationality}
                  </p>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Package */}
      {booking.package && (
        <>
          <Separator />
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Package</h4>
            <div className="rounded-lg border p-4 space-y-2">
              <p className="font-medium">{booking.package.title}</p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Duration</p>
                  <p className="font-medium">
                    {booking.package.durationHours} hours
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Price / Person</p>
                  <p className="font-medium">
                    ৳ {booking.package.pricePerPerson}
                  </p>
                </div>
                {booking.package.meetingPoint && (
                  <div className="col-span-2">
                    <p className="text-muted-foreground">Meeting Point</p>
                    <p className="font-medium">
                      {booking.package.meetingPoint}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Special Requests */}
      {booking.specialRequests && (
        <>
          <Separator />
          <div className="space-y-3">
            <h4 className="text-sm font-semibold flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Special Requests
            </h4>
            <div className="rounded-lg border bg-muted/30 p-4">
              <p className="text-sm leading-relaxed">
                {booking.specialRequests}
              </p>
            </div>
          </div>
        </>
      )}

      {/* Payment */}
      {booking.payment && (
        <>
          <Separator />
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Payment Information</h4>
            <div className="rounded-lg border p-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Total Amount</span>
                <span className="font-semibold text-base">
                  ৳ {booking.payment.amount}
                </span>
              </div>

              <Separator />

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Your Earning
                </span>
                <span className="font-medium text-green-600">
                  ৳ {booking.payment.guideEarning}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Platform Fee</span>
                <span className="font-medium">
                  ৳ {booking.payment.commissionFee}
                </span>
              </div>

              <Separator />

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Status</span>
                <StatusBadge
                  status={booking.payment.status}
                  type="payment"
                />
              </div>

              {booking.payment.bKashTrxId && (
                <InfoRow
                  label="bKash TRX ID"
                  value={booking.payment.bKashTrxId}
                />
              )}

              {booking.payment.paidAt && (
                <InfoRow
                  label="Paid At"
                  value={format(
                    new Date(booking.payment.paidAt),
                    "MMM dd, yyyy HH:mm"
                  )}
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

// ========================================
// HELPERS
// ========================================

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
      <p className="text-sm font-semibold">{value}</p>
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-right break-all">{value}</span>
    </div>
  )
}