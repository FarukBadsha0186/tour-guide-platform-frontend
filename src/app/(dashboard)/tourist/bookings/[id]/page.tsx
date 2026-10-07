"use client"

import { use, useState } from "react"
import { useRouter } from "next/navigation"
import { AdminPageHeader } from "@/components/modules/admin/common/admin-page-header"
import { BookingDetail } from "@/components/modules/tourist/bookings/booking-detail"
import { BookingCancelDialog } from "@/components/modules/tourist/bookings/booking-cancel-dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { useTouristBooking } from "@/hooks"
import { ArrowLeft, RefreshCw, XCircle } from "lucide-react"

interface PageProps {
  params: Promise<{ id: string }>
}

export default function TouristBookingDetailPage({ params }: PageProps) {
  const router = useRouter()
  const { id } = use(params)

  const [cancelOpen, setCancelOpen] = useState(false)

  const { data, isLoading, isError, refetch } = useTouristBooking(id)

  const booking = data?.data

  const canCancel =
    booking &&
    (booking.status === "PENDING_PAYMENT" ||
      booking.status === "PAID" ||
      booking.status === "CONFIRMED")

  if (isLoading) {
    return (
      <div className="p-6 flex justify-center items-center py-20">
        <Spinner className="h-8 w-8" />
      </div>
    )
  }

  if (isError || !booking) {
    return (
      <div className="p-6">
        <div className="rounded-lg border border-destructive/50 bg-destructive/5 p-6 text-center">
          <p className="text-destructive font-medium">
            Failed to load booking
          </p>
          <div className="flex justify-center gap-3 mt-4">
            <Button
              onClick={() => router.push("/tourist/bookings")}
              variant="outline"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button onClick={() => refetch()}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Retry
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <AdminPageHeader
        title="Booking Details"
        description="View your booking information"
        action={
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => router.push("/tourist/bookings")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            {canCancel && (
              <Button
                variant="destructive"
                onClick={() => setCancelOpen(true)}
              >
                <XCircle className="mr-2 h-4 w-4" />
                Cancel Booking
              </Button>
            )}
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="pt-6">
              <BookingDetail booking={booking} />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar — Payment action */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 space-y-4">
            {booking.status === "PENDING_PAYMENT" && (
              <Card className="border-yellow-200 bg-yellow-50">
                <CardContent className="pt-6 space-y-3">
                  <p className="font-semibold text-yellow-800">
                    Payment Required
                  </p>
                  <p className="text-sm text-yellow-800">
                    Complete payment to confirm your booking.
                  </p>
                  <Button className="w-full" size="lg">
                    Pay Now
                  </Button>
                  <p className="text-xs text-yellow-700 text-center">
                    Payment gateway integration coming soon
                  </p>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardContent className="pt-6 space-y-2">
                <p className="text-sm font-semibold">Need Help?</p>
                <p className="text-xs text-muted-foreground">
                  Contact support if you have any questions about this booking.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <BookingCancelDialog
        booking={booking}
        open={cancelOpen}
        onOpenChange={setCancelOpen}
      />
    </div>
  )
}