"use client"

import { PublicGuideCard } from "@/components/modules/public/guides/public-guide-card"
import { TablePagination } from "@/components/modules/admin/common/table-pagination"
import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"
import { usePublicGuides } from "@/hooks"
import { useState } from "react"
import { DEFAULT_PAGE, DEFAULT_LIMIT } from "@/constants/admin.constants"
import { Users, RefreshCw } from "lucide-react"

export default function PublicGuidesPage() {
  const [page, setPage] = useState(DEFAULT_PAGE)
  const [limit, setLimit] = useState(DEFAULT_LIMIT)

  const { data, isLoading, isError, refetch } = usePublicGuides({
    page,
    limit,
  })

  const guides = data?.data || []
  const meta = data?.meta

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Hero */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-sm mb-4">
          <Users className="h-4 w-4" />
          <span>Meet Our Guides</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
          Verified Local Guides
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Experienced, verified, and passionate guides ready to show you around.
        </p>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Spinner className="h-8 w-8" />
        </div>
      ) : isError ? (
        <div className="text-center py-20">
          <p className="text-destructive font-medium">
            Failed to load guides
          </p>
          <Button onClick={() => refetch()} variant="outline" className="mt-4">
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </div>
      ) : guides.length === 0 ? (
        <div className="text-center py-20 border rounded-lg bg-muted/20">
          <Users className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
          <p className="text-muted-foreground">No guides available</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide) => (
              <PublicGuideCard key={guide.id} guide={guide} />
            ))}
          </div>

          {meta && meta.total > 0 && (
            <div className="mt-8">
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