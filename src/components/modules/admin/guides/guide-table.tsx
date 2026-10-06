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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StatusBadge } from "../common/status-badge"
import { Eye, CheckCircle, Ban } from "lucide-react"
import type { AdminGuide } from "@/types/admin.type"
import { format } from "date-fns"

interface GuideTableProps {
  guides: AdminGuide[]
  onView: (guide: AdminGuide) => void
  onApprove: (guide: AdminGuide) => void
  onBlock: (guide: AdminGuide) => void
}

export function GuideTable({
  guides,
  onView,
  onApprove,
  onBlock,
}: GuideTableProps) {
  if (guides.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg bg-muted/20">
        <p className="text-muted-foreground">No guides found</p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Guide</TableHead>
            <TableHead>Experience</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {guides.map((guide) => (
            <TableRow key={guide.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={guide.imageUrl} alt={guide.name} />
                    <AvatarFallback>
                      {guide.name?.charAt(0)?.toUpperCase() || "G"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{guide.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {guide.email}
                    </p>
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <div className="text-sm">
                  <p>{guide.guide?.yearsExperience ?? 0} years</p>
                  <p className="text-muted-foreground">
                    {guide.guide?.languages?.join(", ") || "—"}
                  </p>
                </div>
              </TableCell>

              <TableCell>
                <span className="text-sm">
                  {guide.guide?.baseLocation || "—"}
                </span>
              </TableCell>

              <TableCell>
                <StatusBadge status={guide.status} type="user" />
              </TableCell>

              <TableCell>
                <span className="text-sm">
                  {format(new Date(guide.createdAt), "MMM dd, yyyy")}
                </span>
              </TableCell>

              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onView(guide)}
                    title="View details"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>

                  {!guide.guide?.isApproved && guide.status !== "BLOCKED" && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onApprove(guide)}
                      className="text-green-600 hover:text-green-700"
                      title="Approve"
                    >
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                  )}

                  {guide.status === "ACTIVE" && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onBlock(guide)}
                      className="text-destructive hover:text-destructive"
                      title="Block"
                    >
                      <Ban className="h-4 w-4" />
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