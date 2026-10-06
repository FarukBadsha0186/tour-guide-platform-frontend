"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Spinner } from "@/components/ui/spinner"
import { useUpdateGuideBookingStatus } from "@/hooks"
import { toast } from "sonner"
import type { GuideBooking } from "@/types/guide.type"
import type { BookingStatus } from "@/types/admin.type"
import { GUIDE_BOOKING_TRANSITIONS } from "@/constants/guide.constants"

interface BookingStatusActionsProps {
  booking: GuideBooking
}

export function BookingStatusActions({
  booking,
}: BookingStatusActionsProps) {
  const transitions =
    GUIDE_BOOKING_TRANSITIONS[booking.status as BookingStatus] || []

  const [selectedTransition, setSelectedTransition] = useState<{
    nextStatus: BookingStatus
    label: string
    description: string
    variant: "default" | "destructive" | "outline"
  } | null>(null)

  const { mutate: updateStatus, isPending } =
    useUpdateGuideBookingStatus()

  if (transitions.length === 0) {
    return (
      <div className="rounded-lg border border-muted bg-muted/30 p-4">
        <p className="text-sm text-muted-foreground">
          This booking has no available actions.
        </p>
      </div>
    )
  }

  const handleConfirm = () => {
    if (!selectedTransition) return

    updateStatus(
      { id: booking.id, status: selectedTransition.nextStatus },
      {
        onSuccess: () => {
          toast.success(`Booking ${selectedTransition.nextStatus.toLowerCase()} successfully`)
          setSelectedTransition(null)
        },
        onError: (err) => {
          toast.error("Action failed", {
            description: err.message || "Something went wrong",
          })
          setSelectedTransition(null)
        },
      }
    )
  }

  return (
    <>
      <div className="rounded-lg border p-4 space-y-3">
        <h4 className="text-sm font-semibold">Actions</h4>
        <div className="flex flex-wrap gap-2">
          {transitions.map((transition) => (
            <Button
              key={transition.nextStatus}
              variant={transition.variant}
              onClick={() =>
                setSelectedTransition({
                  nextStatus: transition.nextStatus,
                  label: transition.label,
                  description: transition.description,
                  variant: transition.variant,
                })
              }
              disabled={isPending}
            >
              {transition.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Confirm Dialog */}
      <AlertDialog
        open={!!selectedTransition}
        onOpenChange={(open) => !open && setSelectedTransition(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{selectedTransition?.label}</AlertDialogTitle>
            <AlertDialogDescription>
              {selectedTransition?.description}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
            <Button
              onClick={handleConfirm}
              disabled={isPending}
              variant={selectedTransition?.variant || "default"}
            >
              {isPending && <Spinner className="mr-2 h-4 w-4" />}
              Confirm
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}