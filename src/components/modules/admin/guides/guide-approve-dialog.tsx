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
import { useApproveGuide } from "@/hooks"
import { toast } from "sonner"
import type { AdminGuide } from "@/types/admin.type"
import { CheckCircle, XCircle } from "lucide-react"

interface GuideApproveDialogProps {
  guide: AdminGuide | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function GuideApproveDialog({
  guide,
  open,
  onOpenChange,
}: GuideApproveDialogProps) {
  const { mutate: approve, isPending } = useApproveGuide()

  if (!guide) return null

  const isApproved = guide.guide?.isApproved ?? false

  const handleConfirm = (shouldApprove: boolean) => {
    approve(
      { id: guide.id, isApproved: shouldApprove  },
      {
        onSuccess: () => {
          toast.success(
            shouldApprove
              ? "Guide approved successfully"
              : "Guide rejected successfully"
          )
          onOpenChange(false)
        },
        onError: (err) => {
          toast.error("Action failed", {
            description: err.message || "Something went wrong",
          })
        },
      }
    )
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isApproved ? "Change Approval Status" : "Approve Guide"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {isApproved ? (
              <>
                Do you want to revoke approval for{" "}
                <strong>{guide.name}</strong>? They will lose access to create
                new packages.
              </>
            ) : (
              <>
                Approve <strong>{guide.name}</strong> as a verified guide? They
                will be able to create packages and receive bookings.
              </>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>

          {isApproved ? (
            <Button
              variant="destructive"
              onClick={() => handleConfirm(false)}
              disabled={isPending}
            >
              {isPending && <Spinner className="mr-2 h-4 w-4" />}
              <XCircle className="mr-2 h-4 w-4" />
              Revoke
            </Button>
          ) : (
            <Button
              onClick={() => handleConfirm(true)}
              disabled={isPending}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              {isPending && <Spinner className="mr-2 h-4 w-4" />}
              <CheckCircle className="mr-2 h-4 w-4" />
              Approve
            </Button>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}