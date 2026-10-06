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
import { useBlockTourist, useUnblockTourist } from "@/hooks"
import { toast } from "sonner"
import type { AdminTourist } from "@/types/admin.type"

interface TouristBlockDialogProps {
  tourist: AdminTourist | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TouristBlockDialog({
  tourist,
  open,
  onOpenChange,
}: TouristBlockDialogProps) {
  const [reason, setReason] = useState("")

  const { mutate: block, isPending: isBlocking } = useBlockTourist()
  const { mutate: unblock, isPending: isUnblocking } = useUnblockTourist()

  if (!tourist) return null

  const isBlocked = tourist.status === "BLOCKED"
  const isPending = isBlocking || isUnblocking

  const handleConfirm = () => {
    if (isBlocked) {
      // Unblock
      unblock(tourist.id, {
        onSuccess: () => {
          toast.success("Tourist unblocked successfully")
          onOpenChange(false)
        },
        onError: (err) => {
          toast.error("Failed to unblock", {
            description: err.message || "Something went wrong",
          })
        },
      })
    } else {
      // Block
      if (!reason.trim()) {
        toast.error("Please provide a reason")
        return
      }

      block(
        { id: tourist.id, reason },
        {
          onSuccess: () => {
            toast.success("Tourist blocked successfully")
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
            {isBlocked ? "Unblock Tourist" : "Block Tourist"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {isBlocked ? (
              <>
                Are you sure you want to unblock{" "}
                <strong>{tourist.name}</strong>? They will regain access to the
                platform.
              </>
            ) : (
              <>
                Are you sure you want to block <strong>{tourist.name}</strong>?
                They will lose access to the platform.
              </>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* Reason input (only for block) */}
        {!isBlocked && (
          <div className="space-y-2">
            <label htmlFor="reason" className="text-sm font-medium">
              Reason <span className="text-destructive">*</span>
            </label>
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Why are you blocking this tourist?"
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