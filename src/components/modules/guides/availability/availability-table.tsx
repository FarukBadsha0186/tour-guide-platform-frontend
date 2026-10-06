"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { Calendar, Clock, Pencil } from "lucide-react"
import type { AvailabilitySlot } from "@/types/guide.type"

interface AvailabilityTableProps {
  slots: AvailabilitySlot[]
  onEdit: (slot: AvailabilitySlot) => void
}

export function AvailabilityTable({
  slots,
  onEdit,
}: AvailabilityTableProps) {
  if (slots.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg bg-muted/20">
        <Calendar className="h-10 w-10 mx-auto text-muted-foreground/50 mb-2" />
        <p className="text-muted-foreground">No availability slots</p>
        <p className="text-sm text-muted-foreground mt-1">
          Add slots so tourists can book your tours
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {slots.map((slot) => (
            <TableRow key={slot.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    {format(new Date(slot.date), "MMM dd, yyyy (EEEE)")}
                  </span>
                </div>
              </TableCell>

              <TableCell>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {slot.startTime} - {slot.endTime}
                  </span>
                </div>
              </TableCell>

              <TableCell>
                {slot.isBooked ? (
                  <Badge
                    variant="outline"
                    className="bg-red-100 text-red-700 border-red-200"
                  >
                    Booked
                  </Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className="bg-green-100 text-green-700 border-green-200"
                  >
                    Available
                  </Badge>
                )}
              </TableCell>

              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(slot)}
                  disabled={slot.isBooked}
                  title={
                    slot.isBooked
                      ? "Booked slots cannot be edited"
                      : "Edit slot"
                  }
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}