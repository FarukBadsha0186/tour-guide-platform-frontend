
"use client"

import { useState } from "react"
import { PublicGuideCard } from "@/components/modules/public/guides/public-guide-card"
import { GuidesFilters } from "@/components/modules/tourist/guides/guides-filters"
import { TablePagination } from "@/components/modules/admin/common/table-pagination"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { usePublicGuides } from "@/hooks"
import { DEFAULT_PAGE, DEFAULT_LIMIT } from "@/constants/admin.constants"
import { Users, RefreshCw } from "lucide-react"

const SKELETON_IDS = ["sk-1", "sk-2", "sk-3", "sk-4", "sk-5", "sk-6", "sk-7", "sk-8"]

export default function PublicGuidesPage() {
  const [page, setPage] = useState(DEFAULT_PAGE)
  const [limit, setLimit] = useState(DEFAULT_LIMIT)
  
  // Filter states
  const [search, setSearch] = useState("")
  const [location, setLocation] = useState("")
  const [language, setLanguage] = useState("ALL")
  const [minRating, setMinRating] = useState("ALL")
  const [sortBy, setSortBy] = useState("createdAt-desc")

  // Params builder
  const getSortParams = () => {
    const [sortField, sortOrder] = sortBy.split("-")
    return { 
      sortBy: sortField as any, // Type assertion to avoid TS errors
      sortOrder: sortOrder as "asc" | "desc" 
    }
  }

  const getFilterParams = () => {
    const params: any = {}
    if (location) params.location = location
    if (language !== "ALL") params.language = language
    if (minRating !== "ALL") params.minRating = Number(minRating)
    return params
  }

  // Hook call (using `as any` to bypass strict types if hook doesn't accept all params yet)
  const { data, isLoading, isError, refetch } = usePublicGuides({
    page,
    limit,
    search: search || undefined,
    ...getFilterParams(),
    ...getSortParams(),
  } as any)

  const guides = data?.data || []
  const meta = data?.meta

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm mb-4">
          <Users className="h-4 w-4" />
          <span>Meet The Experts</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
          Local Guides
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Connect with verified local experts who know Bangladesh inside out.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8">
        <GuidesFilters
          search={search}
          onSearchChange={(value) => { setSearch(value); setPage(1) }}
          location={location}
          onLocationChange={(value) => { setLocation(value); setPage(1) }}
          language={language}
          onLanguageChange={(value) => { setLanguage(value); setPage(1) }}
          minRating={minRating}
          onRatingChange={(value) => { setMinRating(value); setPage(1) }}
          sortBy={sortBy}
          onSortChange={(value) => { setSortBy(value); setPage(1) }}
        />
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKELETON_IDS.map((id) => (
            <Skeleton key={id} className="h-80 w-full rounded-2xl" />
          ))}
        </div>
      ) : isError ? (
        <div className="text-center py-20">
          <p className="text-destructive font-medium">Failed to load guides</p>
          <Button onClick={() => refetch()} variant="outline" className="mt-4">
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </div>
      ) : guides.length === 0 ? (
        <div className="text-center py-20 border border-border rounded-2xl bg-muted/20">
          <Users className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
          <p className="text-muted-foreground">No guides found matching your filters.</p>
        </div>
      ) : (
        <>
          {/* 4 Cards per row (lg:grid-cols-4) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {guides.map((guide) => (
              <PublicGuideCard key={guide.id} guide={guide} />
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