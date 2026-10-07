"use client"

import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search } from "lucide-react"

interface PackagesFiltersProps {
  search: string
  onSearchChange: (value: string) => void
  priceRange: string
  onPriceRangeChange: (value: string) => void
}

const PRICE_OPTIONS = [
  { value: "ALL", label: "Any Price" },
  { value: "0-1000", label: "Under ৳ 1000" },
  { value: "1000-2000", label: "৳ 1000 - ৳ 2000" },
  { value: "2000-5000", label: "৳ 2000 - ৳ 5000" },
  { value: "5000-100000", label: "Above ৳ 5000" },
]

export function PackagesFilters({
  search,
  onSearchChange,
  priceRange,
  onPriceRangeChange,
}: PackagesFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search tours, destinations..."
          className="pl-9"
        />
      </div>

      <Select value={priceRange} onValueChange={(v) => onPriceRangeChange(v ?? "ALL")}>
        <SelectTrigger className="w-full sm:w-[200px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {PRICE_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}