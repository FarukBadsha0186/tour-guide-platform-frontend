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
import { StatusBadge } from "@/components/modules/admin/common/status-badge"
import { Eye, Pencil } from "lucide-react"
import { format } from "date-fns"
import type { GuidePackage } from "@/types/guide.type"

interface PackageTableProps {
  packages: GuidePackage[]
  onView: (pkg: GuidePackage) => void
  onEdit: (pkg: GuidePackage) => void
}

export function PackageTable({
  packages,
  onView,
  onEdit,
}: PackageTableProps) {
  if (packages.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg bg-muted/20">
        <p className="text-muted-foreground">No packages yet</p>
        <p className="text-sm text-muted-foreground mt-1">
          Create your first tour package to get started
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Group Size</TableHead>
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
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {pkg.meetingPoint || "No meeting point"}
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
                <span className="text-sm">
                  {pkg.minGroupSize}-{pkg.maxGroupSize}
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
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(pkg)}
                      title="Edit package"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
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