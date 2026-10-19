"use client"

import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, MapPin } from "lucide-react"

interface GuidesFiltersProps {
  search: string
  onSearchChange: (value: string) => void
  location: string
  onLocationChange: (value: string) => void
  language: string
  onLanguageChange: (value: string) => void
  minRating: string
  onRatingChange: (value: string) => void
  sortBy: string
  onSortChange: (value: string) => void
}

const LANGUAGE_OPTIONS = [
  { value: "ALL", label: "Any Language" },
  { value: "English", label: "English" },
  { value: "Bengali", label: "Bengali" },
  { value: "Hindi", label: "Hindi" },
  { value: "Arabic", label: "Arabic" },
]

const RATING_OPTIONS = [
  { value: "ALL", label: "Any Rating" },
  { value: "4.5", label: "4.5+ Stars" },
  { value: "4.0", label: "4.0+ Stars" },
  { value: "3.0", label: "3.0+ Stars" },
]

const SORT_OPTIONS = [
  { value: "createdAt-desc", label: "Newest First" },
  { value: "rating-desc", label: "Top Rated" },
  { value: "yearsExperience-desc", label: "Most Experienced" },
]

export function GuidesFilters({
  search,
  onSearchChange,
  location,
  onLocationChange,
  language,
  onLanguageChange,
  minRating,
  onRatingChange,
  sortBy,
  onSortChange,
}: GuidesFiltersProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
      {/* 1. Search */}
      <div className="relative col-span-1 sm:col-span-2 lg:col-span-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search guides..."
          className="pl-9 bg-card"
        />
      </div>

      {/* 2. Location */}
      <div className="relative col-span-1">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
          placeholder="City / Location"
          className="pl-9 bg-card"
        />
      </div>

      {/* 3. Language */}
      <Select value={language} onValueChange={(v) => onLanguageChange(v ?? "ALL")}>
        <SelectTrigger className="w-full bg-card">
          <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent>
          {LANGUAGE_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* 4. Rating */}
      <Select value={minRating} onValueChange={(v) => onRatingChange(v ?? "ALL")}>
        <SelectTrigger className="w-full bg-card">
          <SelectValue placeholder="Rating" />
        </SelectTrigger>
        <SelectContent>
          {RATING_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* 5. Sort By */}
      <Select value={sortBy} onValueChange={(v) => onSortChange(v ?? "createdAt-desc")}>
        <SelectTrigger className="w-full bg-card">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          {SORT_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}