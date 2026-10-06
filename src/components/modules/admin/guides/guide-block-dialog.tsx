"use client"

import { useState } from "react"
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
import { Textarea } from "@/components/ui/textarea"
import { Spinner } from "@/components/ui/spinner"
import { useBlockGuide, useUnblockGuide } from "@/hooks"
import { toast } from "sonner"
import type { AdminGuide } from "@/types/admin.type"

interface GuideBlockDialogProps {
  guide: AdminGuide | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function GuideBlockDialog({
  guide,
  open,
  onOpenChange,
}: GuideBlockDialogProps) {
  const [reason, setReason] = useState("")

  const { mutate: block, isPending: isBlocking } = useBlockGuide()
  const { mutate: unblock, isPending: isUnblocking } = useUnblockGuide()

  if (!guide) return null

  const isBlocked = guide.status === "BLOCKED"
  const isPending = isBlocking || isUnblocking

  const handleConfirm = () => {
    if (isBlocked) {
      unblock(guide.id, {
        onSuccess: () => {
          toast.success("Guide unblocked successfully")
          onOpenChange(false)
        },
        onError: (err) => {
          toast.error("Failed to unblock", {
            description: err.message || "Something went wrong",
          })
        },
      })
    } else {
      if (!reason.trim()) {
        toast.error("Please provide a reason")
        return
      }

      block(
        { id: guide.id, reason },
        {
          onSuccess: () => {
            toast.success("Guide blocked successfully")
            setReason("")
            onOpenChange(false)
          },
          onError: (err) => {
            toast.error("Failed to block", {
              description: err.message || "Something went wrong",
            })
          },
        }
      )
    }
  }

  const handleClose = (value: boolean) => {
    if (!isPending) {
      setReason("")
      onOpenChange(value)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={handleClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isBlocked ? "Unblock Guide" : "Block Guide"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {isBlocked ? (
              <>
                Are you sure you want to unblock <strong>{guide.name}</strong>?
                They will regain access to the platform.
              </>
            ) : (
              <>
                Are you sure you want to block <strong>{guide.name}</strong>?
                They will lose access to create packages and receive bookings.
              </>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {!isBlocked && (
          <div className="space-y-2">
            <label htmlFor="reason" className="text-sm font-medium">
              Reason <span className="text-destructive">*</span>
            </label>
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Why are you blocking this guide?"
              rows={3}
              disabled={isPending}
            />
          </div>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>

          <Button
            onClick={handleConfirm}
            disabled={isPending || (!isBlocked && !reason.trim())}
            variant={isBlocked ? "default" : "destructive"}
          >
            {isPending && <Spinner className="mr-2 h-4 w-4" />}
            {isBlocked ? "Unblock" : "Block"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}