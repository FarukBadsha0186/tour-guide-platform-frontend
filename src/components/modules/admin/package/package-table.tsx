"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "../common/status-badge"
import { Eye, CheckCircle, XCircle } from "lucide-react"
import type { AdminPackage } from "@/types/admin.type"
import { format } from "date-fns"

interface PackageTableProps {
  packages: AdminPackage[]
  onView: (pkg: AdminPackage) => void
  onApprove: (pkg: AdminPackage) => void
  onReject: (pkg: AdminPackage) => void
}

export function PackageTable({
  packages,
  onView,
  onApprove,
  onReject,
}: PackageTableProps) {
  if (packages.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg bg-muted/20">
        <p className="text-muted-foreground">No packages found</p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Package</TableHead>
            <TableHead>Guide</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {packages.map((pkg) => (
            <TableRow key={pkg.id}>
              <TableCell>
                <div>
                  <p className="font-medium line-clamp-1">{pkg.title}</p>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {pkg.meetingPoint || "—"}
                  </p>
                </div>
              </TableCell>

              <TableCell>
                <div className="text-sm">
                  <p className="font-medium">{pkg.guide?.user?.name || "—"}</p>
                  <p className="text-muted-foreground">
                    {pkg.guide?.user?.email || "—"}
                  </p>
                </div>
              </TableCell>

              <TableCell>
                <span className="text-sm">{pkg.durationHours}h</span>
              </TableCell>

              <TableCell>
                <span className="text-sm font-medium">
                  ৳ {pkg.pricePerPerson}
                </span>
              </TableCell>

              <TableCell>
                <StatusBadge status={pkg.status} type="package" />
              </TableCell>

              <TableCell>
                <span className="text-sm">
                  {format(new Date(pkg.createdAt), "MMM dd, yyyy")}
                </span>
              </TableCell>

              {/* <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onView(pkg)}
                    title="View details"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>

                  {pkg.status === "PENDING" && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onApprove(pkg)}
                        className="text-green-600 hover:text-green-700"
                        title="Approve"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onReject(pkg)}
                        className="text-destructive hover:text-destructive"
                        title="Reject"
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </TableCell> */}

              <TableCell className="text-right">
  <div className="flex items-center justify-end gap-2">
    <Button
      variant="ghost"
      size="icon"
      onClick={() => onView(pkg)}
      title="View details"
    >
      <Eye className="h-4 w-4" />
    </Button>

    {pkg.status === "PENDING" && (
      <>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onApprove(pkg)}
          className="text-green-600 hover:text-green-700 border-green-200 hover:bg-green-50"
        >
          Approve
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onReject(pkg)}
          className="text-destructive hover:text-destructive border-destructive/30 hover:bg-destructive/5"
        >
          Reject
        </Button>
      </>
    )}
  </div>
</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}