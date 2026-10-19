// "use client"

// import { Input } from "@/components/ui/input"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
// import { Search } from "lucide-react"

// interface PackagesFiltersProps {
//   search: string
//   onSearchChange: (value: string) => void
//   priceRange: string
//   onPriceRangeChange: (value: string) => void
// }

// const PRICE_OPTIONS = [
//   { value: "ALL", label: "Any Price" },
//   { value: "0-1000", label: "Under ৳ 1000" },
//   { value: "1000-2000", label: "৳ 1000 - ৳ 2000" },
//   { value: "2000-5000", label: "৳ 2000 - ৳ 5000" },
//   { value: "5000-100000", label: "Above ৳ 5000" },
// ]

// export function PackagesFilters({
//   search,
//   onSearchChange,
//   priceRange,
//   onPriceRangeChange,
// }: PackagesFiltersProps) {
//   return (
//     <div className="flex flex-col sm:flex-row gap-3">
//       <div className="relative flex-1">
//         <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//         <Input
//           value={search}
//           onChange={(e) => onSearchChange(e.target.value)}
//           placeholder="Search tours, destinations..."
//           className="pl-9"
//         />
//       </div>

//       <Select value={priceRange} onValueChange={(v) => onPriceRangeChange(v ?? "ALL")}>
//         <SelectTrigger className="w-full sm:w-[200px]">
//           <SelectValue />
//         </SelectTrigger>
//         <SelectContent>
//           {PRICE_OPTIONS.map((opt) => (
//             <SelectItem key={opt.value} value={opt.value}>
//               {opt.label}
//             </SelectItem>
//           ))}
//         </SelectContent>
//       </Select>
//     </div>
//   )
// }

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
  sortBy: string
  onSortChange: (value: string) => void
  duration: string
  onDurationChange: (value: string) => void
}

const PRICE_OPTIONS = [
  { value: "ALL", label: "Any Price" },
  { value: "0-1000", label: "Under ৳ 1000" },
  { value: "1000-2000", label: "৳ 1000 - ৳ 2000" },
  { value: "2000-5000", label: "৳ 2000 - ৳ 5000" },
  { value: "5000-100000", label: "Above ৳ 5000" },
]

const SORT_OPTIONS = [
  { value: "createdAt-desc", label: "Newest First" },
  { value: "pricePerPerson-asc", label: "Price: Low to High" },
  { value: "pricePerPerson-desc", label: "Price: High to Low" },
  { value: "rating-desc", label: "Top Rated" },
]

const DURATION_OPTIONS = [
  { value: "ALL", label: "Any Duration" },
  { value: "4", label: "Under 4 Hours" },
  { value: "8", label: "4 - 8 Hours" },
  { value: "12", label: "Full Day (8+ Hours)" },
]

export function PackagesFilters({
  search,
  onSearchChange,
  priceRange,
  onPriceRangeChange,
  sortBy,
  onSortChange,
  duration,
  onDurationChange,
}: PackagesFiltersProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {/* 1. Search */}
      <div className="relative col-span-1 sm:col-span-2 lg:col-span-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search tours, destinations..."
          className="pl-9 bg-card"
        />
      </div>

      {/* 2. Price */}
      <Select value={priceRange} onValueChange={(v) => onPriceRangeChange(v ?? "ALL")}>
        <SelectTrigger className="w-full bg-card">
          <SelectValue placeholder="Price" />
        </SelectTrigger>
        <SelectContent>
          {PRICE_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* 3. Duration */}
      <Select value={duration} onValueChange={(v) => onDurationChange(v ?? "ALL")}>
        <SelectTrigger className="w-full bg-card">
          <SelectValue placeholder="Duration" />
        </SelectTrigger>
        <SelectContent>
          {DURATION_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* 4. Sort By */}
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