"use client"

import { format } from "date-fns"
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { Eye, Ban } from "lucide-react"
import type { AdminTourist } from "@/types/admin.type"

import { AUTH_PROVIDER_LABELS } from "@/constants/admin.constants"
import { Avatar } from "@/components/ui/avatar"

interface TouristTableProps {
  tourists: AdminTourist[]
  onView: (tourist: AdminTourist) => void
  onBlock: (tourist: AdminTourist) => void
}

export function TouristTable({
  tourists,
  onView,
  onBlock,
}: TouristTableProps) {
  if (tourists.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg bg-muted/20">
        <p className="text-muted-foreground">No tourists found</p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tourist</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Auth</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tourists.map((tourist) => (
            <TableRow key={tourist.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={tourist.imageUrl} alt={tourist.name} />
                    <AvatarFallback>
                      {tourist.name?.charAt(0)?.toUpperCase() || "T"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{tourist.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {tourist.email}
                    </p>
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <div className="text-sm">
                  <p>{tourist.tourist?.contactNumber || "—"}</p>
                  <p className="text-muted-foreground">
                    {tourist.tourist?.address || "—"}
                  </p>
                </div>
              </TableCell>

              <TableCell>
                <span className="text-sm text-muted-foreground">
                  {AUTH_PROVIDER_LABELS[tourist.authProvider] ||
                    tourist.authProvider}
                </span>
              </TableCell>

              <TableCell>
                <StatusBadge status={tourist.status} type="user" />
              </TableCell>

              <TableCell>
                <span className="text-sm">
                  {format(new Date(tourist.createdAt), "MMM dd, yyyy")}
                </span>
              </TableCell>

              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onView(tourist)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>

                  {tourist.status === "ACTIVE" && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onBlock(tourist)}
                      className="text-destructive hover:text-destructive"
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