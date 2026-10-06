"use client"

import { useState } from "react"
import { format } from "date-fns"
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
import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"
import { CalendarIcon, X } from "lucide-react"
import { toast } from "sonner"
import { useCreateAvailability, useGuidePackages } from "@/hooks"
import { TIME_OPTIONS } from "@/constants/guide.constants"
import { cn } from "@/lib/utils"

interface AvailabilityFormProps {
  onSuccess: () => void
  onCancel: () => void
  defaultPackageId?: string
}

export function AvailabilityForm({
  onSuccess,
  onCancel,
  defaultPackageId,
}: AvailabilityFormProps) {
  const [selectedDates, setSelectedDates] = useState<Date[]>([])
  const [startTime, setStartTime] = useState("09:00")
  const [endTime, setEndTime] = useState("17:00")
  const [packageId, setPackageId] = useState(defaultPackageId || "")

  const { data: packagesData, isLoading: isLoadingPackages } =
    useGuidePackages({ limit: 100 })

  const { mutate: create, isPending } = useCreateAvailability()

  const packages = packagesData?.data?.data || []

  const handleDateSelect = (dates: Date[] | undefined) => {
    setSelectedDates(dates || [])
  }

  const removeDate = (dateToRemove: Date) => {
    setSelectedDates((prev) =>
      prev.filter((d) => d.toDateString() !== dateToRemove.toDateString())
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!packageId) {
      toast.error("Please select a package")
      return
    }

    if (selectedDates.length === 0) {
      toast.error("Please select at least one date")
      return
    }

    if (startTime >= endTime) {
      toast.error("End time must be after start time")
      return
    }

    create(
      {
        dates: selectedDates.map((d) => format(d, "yyyy-MM-dd")),
        startTime,
        endTime,
        packageId,
      },
      {
        onSuccess: () => {
          toast.success(
            `${selectedDates.length} slot${
              selectedDates.length > 1 ? "s" : ""
            } added successfully`
          )
          onSuccess()
        },
        onError: (err) => {
          toast.error("Failed to add slots", {
            description: err.message || "Something went wrong",
          })
        },
      }
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Package Select */}
      <div className="space-y-2">
        <p className="text-sm font-medium">
          Package <span className="text-destructive">*</span>
        </p>
        <Select
          value={packageId}
          onValueChange={(value) => setPackageId(value ?? "")}
          disabled={isLoadingPackages || !!defaultPackageId}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a package" />
          </SelectTrigger>
          <SelectContent>
            {packages.map((pkg) => (
              <SelectItem key={pkg.id} value={pkg.id}>
                {pkg.title} ({pkg.status})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Dates Picker */}
      <div className="space-y-2">
        <p className="text-sm font-medium">
          Dates <span className="text-destructive">*</span>
        </p>
        <Popover>
          <PopoverTrigger
            render={
              <Button
                type="button"
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  selectedDates.length === 0 && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDates.length === 0
                  ? "Pick multiple dates"
                  : `${selectedDates.length} date${
                      selectedDates.length > 1 ? "s" : ""
                    } selected`}
              </Button>
            }
          />
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="multiple"
              selected={selectedDates}
              onSelect={handleDateSelect}
              disabled={(date) =>
                date < new Date(new Date().setHours(0, 0, 0, 0))
              }
            
            />
          </PopoverContent>
        </Popover>

        {/* Selected Dates Badges */}
        {selectedDates.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedDates.map((date) => (
              <Badge
                key={date.toISOString()}
                variant="secondary"
                className="gap-1 pr-1 cursor-pointer"
                onClick={() => removeDate(date)}
              >
                {format(date, "MMM dd, yyyy")}
                <X className="h-3 w-3" />
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Time Range */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <p className="text-sm font-medium">Start Time</p>
          <Select
            value={startTime}
            onValueChange={(v) => setStartTime(v ?? "09:00")}
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

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isPending}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending && <Spinner className="mr-2 h-4 w-4" />}
          Add {selectedDates.length > 0 ? `(${selectedDates.length})` : ""} Slots
        </Button>
      </div>
    </form>
  )
}