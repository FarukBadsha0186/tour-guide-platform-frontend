"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { CalendarIcon, Trash2 } from "lucide-react"
import { toast } from "sonner"
import {
  useUpdateAvailabilitySlot,
  useDeleteAvailabilitySlot,
} from "@/hooks"
import { TIME_OPTIONS } from "@/constants/guide.constants"
import { cn } from "@/lib/utils"
import type { AvailabilitySlot } from "@/types/guide.type"

interface AvailabilityEditDialogProps {
  slot: AvailabilitySlot | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AvailabilityEditDialog({
  slot,
  open,
  onOpenChange,
}: AvailabilityEditDialogProps) {
  const [date, setDate] = useState<Date | undefined>()
  const [startTime, setStartTime] = useState("09:00")
  const [endTime, setEndTime] = useState("17:00")
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const { mutate: update, isPending: isUpdating } =
    useUpdateAvailabilitySlot()
  const { mutate: remove, isPending: isDeleting } =
    useDeleteAvailabilitySlot()

  const isPending = isUpdating || isDeleting

  // Sync state when slot changes
  useEffect(() => {
    if (slot) {
      setDate(new Date(slot.date))
      setStartTime(slot.startTime)
      setEndTime(slot.endTime)
    }
  }, [slot])

  const handleSave = () => {
    if (!slot || !date) {
      toast.error("Please select a date")
      return
    }

    if (startTime >= endTime) {
      toast.error("End time must be after start time")
      return
    }

    update(
      {
        slotId: slot.id,
        payload: {
          date: format(date, "yyyy-MM-dd"),
          startTime,
          endTime,
          packageId: slot.packageId,
        },
      },
      {
        onSuccess: () => {
          toast.success("Slot updated successfully")
          onOpenChange(false)
        },
        onError: (err) => {
          toast.error("Update failed", {
            description: err.message || "Something went wrong",
          })
        },
      }
    )
  }

  const handleDelete = () => {
    if (!slot) return

    remove(slot.id, {
      onSuccess: () => {
        toast.success("Slot deleted successfully")
        setShowDeleteConfirm(false)
        onOpenChange(false)
      },
      onError: (err) => {
        toast.error("Delete failed", {
          description: err.message || "Something went wrong",
        })
        setShowDeleteConfirm(false)
      },
    })
  }

  if (!slot) return null

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Availability Slot</DialogTitle>
            <DialogDescription>
              Update the date or time for this slot.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {/* Date */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Date</p>
              <Popover>
                <PopoverTrigger
                  render={
                    <Button
                      type="button"
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                      disabled={isPending}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "MMM dd, yyyy") : "Pick a date"}
                    </Button>
                  }
                />
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(d) =>
                      d < new Date(new Date().setHours(0, 0, 0, 0))
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Start / End */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <p className="text-sm font-medium">Start Time</p>
                <Select
                  value={startTime}
                  onValueChange={(v) => setStartTime(v ?? "09:00")}
                  disabled={isPending}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TIME_OPTIONS.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">End Time</p>
                <Select
                  value={endTime}
                  onValueChange={(v) => setEndTime(v ?? "17:00")}
                  disabled={isPending}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TIME_OPTIONS.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <DialogFooter className="flex-row justify-between sm:justify-between">
            <Button
              type="button"
              variant="destructive"
              onClick={() => setShowDeleteConfirm(true)}
              disabled={isPending}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isPending || !date}>
                {isUpdating && <Spinner className="mr-2 h-4 w-4" />}
                Save
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this slot?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove the slot{" "}
              <strong>{slot && format(new Date(slot.date), "MMM dd, yyyy")}</strong>{" "}
              ({slot?.startTime} - {slot?.endTime}). Tourists won't be able to
              book it anymore.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault()
                handleDelete()
              }}
              disabled={isDeleting}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              {isDeleting && <Spinner className="mr-2 h-4 w-4" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}