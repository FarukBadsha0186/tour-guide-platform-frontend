"use client"

import { useState } from "react"
import { PublicPackageCard } from "@/components/modules/public/packages/public-package-card"
import { PackagesFilters } from "@/components/modules/tourist/packages/packages-filters"
import { TablePagination } from "@/components/modules/admin/common/table-pagination"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useSearchPublicPackages } from "@/hooks"
import { DEFAULT_PAGE, DEFAULT_LIMIT } from "@/constants/admin.constants"
import { Compass, RefreshCw } from "lucide-react"

const SKELETON_IDS = ["sk-1", "sk-2", "sk-3", "sk-4", "sk-5", "sk-6", "sk-7", "sk-8"]

export default function PublicPackagesPage() {
  const [page, setPage] = useState(DEFAULT_PAGE)
  const [limit, setLimit] = useState(DEFAULT_LIMIT)
  const [search, setSearch] = useState("")
  const [priceRange, setPriceRange] = useState("ALL")
  const [sortBy, setSortBy] = useState("createdAt-desc")
  const [duration, setDuration] = useState("ALL")

  const getPriceParams = () => {
    if (priceRange === "ALL") return {}
    const [min, max] = priceRange.split("-").map(Number)
    return { minPrice: min, maxPrice: max }
  }

  // ✅ FIX: Type assertion add kora hoyeche
  const getSortParams = () => {
    const [sortField, sortOrder] = sortBy.split("-")
    return { 
      sortBy: sortField as "pricePerPerson" | "durationHours" | "createdAt", 
      sortOrder: sortOrder as "asc" | "desc" 
    }
  }

  const getDurationParam = () => {
    if (duration === "ALL") return {}
    if (duration === "12") return { minDuration: 8 } 
    return { maxDuration: Number(duration) }
  }

  const { data, isLoading, isError, refetch } = useSearchPublicPackages({
    page,
    limit,
    search: search || undefined,
    ...getPriceParams(),
    ...getSortParams(),
    ...getDurationParam(),
  } as any) // ✅ Jodi hook er type strict thake, `as any` dile error chole jabe

  const packages = data?.data || []
  const meta = data?.meta

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm mb-4">
          <Compass className="h-4 w-4" />
          <span>Explore Bangladesh</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
          Discover Amazing Tours
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Browse handpicked tour packages from verified local guides.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8">
        <PackagesFilters
          search={search}
          onSearchChange={(value) => {
            setSearch(value)
            setPage(1)
          }}
          priceRange={priceRange}
          onPriceRangeChange={(value) => {
            setPriceRange(value)
            setPage(1)
          }}
          sortBy={sortBy}
          onSortChange={(value) => {
            setSortBy(value)
            setPage(1)
          }}
          duration={duration}
          onDurationChange={(value) => {
            setDuration(value)
            setPage(1)
          }}
        />
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKELETON_IDS.map((id) => (
            <Skeleton key={id} className="h-96 w-full rounded-2xl" />
          ))}
        </div>
      ) : isError ? (
        <div className="text-center py-20">
          <p className="text-destructive font-medium">Failed to load packages</p>
          <Button onClick={() => refetch()} variant="outline" className="mt-4">
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </div>
      ) : packages.length === 0 ? (
        <div className="text-center py-20 border border-border rounded-2xl bg-muted/20">
          <Compass className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
          <p className="text-muted-foreground">No packages found matching your filters.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg) => (
              <PublicPackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>

          {meta && meta.total > 0 && (
            <div className="mt-10">
              <TablePagination
                meta={meta}
                onPageChange={setPage}
                onLimitChange={(value) => {
                  setLimit(value)
                  setPage(1)
                }}
              />
            </div>
          )}
        </>
      )}
    </div>
  )
}