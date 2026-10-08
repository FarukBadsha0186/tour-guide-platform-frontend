"use client"

import { useState } from "react"
import { PackageCard } from "./package-card"
import { PackagesFilters } from "./packages-filters"
import { TablePagination } from "@/components/modules/admin/common/table-pagination"
import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"
import { useTouristPackages } from "@/hooks"
import { DEFAULT_PAGE, DEFAULT_LIMIT } from "@/constants/admin.constants"
import { Compass, RefreshCw } from "lucide-react"

interface PackagesContentProps {
  detailBasePath?: string
}

export function PackagesContent({
  detailBasePath = "/packages",
}: PackagesContentProps) {
  const [page, setPage] = useState(DEFAULT_PAGE)
  const [limit, setLimit] = useState(DEFAULT_LIMIT)
  const [search, setSearch] = useState("")
  const [priceRange, setPriceRange] = useState("ALL")

  const getPriceParams = () => {
    if (priceRange === "ALL") return {}
    const [min, max] = priceRange.split("-").map(Number)
    return { minPrice: min, maxPrice: max }
  }

  const { data, isLoading, isError, refetch } = useTouristPackages({
    page,
    limit,
    search: search || undefined,
    ...getPriceParams(),
  })

  const packages = data?.data || []
  const meta = data?.meta

  return (
    <div className="space-y-6">
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
      />

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Spinner className="h-8 w-8" />
        </div>
      ) : isError ? (
        <div className="text-center py-20">
          <p className="text-destructive font-medium">
            Failed to load packages
          </p>
          <Button
            onClick={() => refetch()}
            variant="outline"
            className="mt-4"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </div>
      ) : packages.length === 0 ? (
        <div className="text-center py-20 border rounded-lg bg-muted/20">
          <Compass className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
          <p className="text-muted-foreground">No packages found</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                pkg={pkg}
                detailBasePath={detailBasePath}
              />
            ))}
          </div>

          {meta && meta.total > 0 && (
            <TablePagination
              meta={meta}
              onPageChange={setPage}
              onLimitChange={(value) => {
                setLimit(value)
                setPage(1)
              }}
            />
          )}
        </>
      )}
    </div>
  )
}