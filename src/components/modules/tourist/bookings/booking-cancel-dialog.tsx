"use client"

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { useCancelBooking } from "@/hooks"
import { toast } from "sonner"
import type { TouristBooking } from "@/types/tourist.type"
import { format } from "date-fns"

interface BookingCancelDialogProps {
  booking: TouristBooking | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function BookingCancelDialog({
  booking,
  open,
  onOpenChange,
}: BookingCancelDialogProps) {
  const { mutate: cancel, isPending } = useCancelBooking()

  if (!booking) return null

  const handleConfirm = () => {
    cancel(booking.id, {
      onSuccess: () => {
        toast.success("Booking cancelled successfully")
        onOpenChange(false)
      },
      onError: (err) => {
        toast.error("Cancel failed", {
          description: err.message || "Something went wrong",
        })
      },
    })
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cancel this booking?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to cancel the booking{" "}
            <strong>{booking.bookingReference}</strong> for{" "}
            <strong>{booking.package?.title}</strong> on{" "}
            <strong>{format(new Date(booking.tourDate), "MMM dd, yyyy")}</strong>
            ?
            <br />
            <br />
            <span className="text-destructive font-medium">
              ⚠️ Note: Cancellation may not be refundable.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Keep Booking</AlertDialogCancel>
          <Button
            onClick={handleConfirm}
            disabled={isPending}
            variant="destructive"
          >
            {isPending && <Spinner className="mr-2 h-4 w-4" />}
            Yes, Cancel
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}