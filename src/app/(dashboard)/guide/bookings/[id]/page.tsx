"use client"

import { use } from "react"
import { useRouter } from "next/navigation"
import { AdminPageHeader } from "@/components/modules/admin/common/admin-page-header"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { useGuideBooking } from "@/hooks"
import { ArrowLeft, RefreshCw } from "lucide-react"
import { BookingDetail } from "@/components/modules/guides/bookings/booking-detail"
import { BookingStatusActions } from "@/components/modules/guides/bookings/booking-status-actions"

interface PageProps {
  params: Promise<{ id: string }>
}

export default function GuideBookingDetailPage({ params }: PageProps) {
  const router = useRouter()
  const { id } = use(params)

  const { data, isLoading, isError, refetch } = useGuideBooking(id)

  const booking = data?.data

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
              onClick={() => router.push("/guide/bookings")}
              variant="outline"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Bookings
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
        description="View booking information and take actions"
        action={
          <Button
            variant="outline"
            onClick={() => router.push("/guide/bookings")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Detail */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="pt-6">
              <BookingDetail booking={booking} />
            </CardContent>
          </Card>
        </div>

        {/* Right: Actions */}
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <BookingStatusActions booking={booking} />
          </div>
        </div>
      </div>
    </div>
  )
}