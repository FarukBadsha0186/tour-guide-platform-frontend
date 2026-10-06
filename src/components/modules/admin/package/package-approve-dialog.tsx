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
import { useApprovePackage } from "@/hooks"
import { toast } from "sonner"
import type { AdminPackage, PackageStatus } from "@/types/admin.type"
import { CheckCircle, XCircle } from "lucide-react"

interface PackageApproveDialogProps {
  pkg: AdminPackage | null
  open: boolean
  onOpenChange: (open: boolean) => void
  action: "APPROVED" | "REJECTED"
}

export function PackageApproveDialog({
  pkg,
  open,
  onOpenChange,
  action,
}: PackageApproveDialogProps) {
  const { mutate: approve, isPending } = useApprovePackage()

  if (!pkg) return null

  const isApprove = action === "APPROVED"

  const handleConfirm = () => {
    approve(
      { id: pkg.id, status: action as PackageStatus },
      {
        onSuccess: () => {
          toast.success(
            isApprove
              ? "Package approved successfully"
              : "Package rejected successfully"
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
            {isApprove ? "Approve Package" : "Reject Package"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {isApprove ? (
              <>
                Approve the package <strong>{pkg.title}</strong>? It will be
                visible to tourists and can be booked.
              </>
            ) : (
              <>
                Reject the package <strong>{pkg.title}</strong>? The guide will
                be notified and can edit and resubmit.
              </>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>

          <Button
            onClick={handleConfirm}
            disabled={isPending}
            variant={isApprove ? "default" : "destructive"}
            className={
              isApprove ? "bg-green-600 hover:bg-green-700 text-white" : ""
            }
          >
            {isPending && <Spinner className="mr-2 h-4 w-4" />}
            {isApprove ? (
              <>
                <CheckCircle className="mr-2 h-4 w-4" />
                Approve
              </>
            ) : (
              <>
                <XCircle className="mr-2 h-4 w-4" />
                Reject
              </>
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}