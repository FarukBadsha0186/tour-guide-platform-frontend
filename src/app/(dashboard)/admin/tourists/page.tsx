"use client"

import { useState } from "react"
import { AdminPageHeader } from "@/components/modules/admin/common/admin-page-header"
import { TableSearch } from "@/components/modules/admin/common/table-search"
import { TablePagination } from "@/components/modules/admin/common/table-pagination"
import { TouristTable } from "@/components/modules/admin/tourists/tourist-table"
import { TouristDetailSheet } from "@/components/modules/admin/tourists/tourist-detail-sheet"
import { TouristBlockDialog } from "@/components/modules/admin/tourists/tourist-block-dialog"
import { useAdminTourists } from "@/hooks"
import type { AdminTourist } from "@/types/admin.type"
import { DEFAULT_PAGE, DEFAULT_LIMIT } from "@/constants/admin.constants"
import { Spinner } from "@/components/ui/spinner"

export default function TouristsPage() {
  const [page, setPage] = useState(DEFAULT_PAGE)
  const [limit, setLimit] = useState(DEFAULT_LIMIT)
  const [search, setSearch] = useState("")

  const [selectedTourist, setSelectedTourist] = useState<AdminTourist | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)
  const [blockOpen, setBlockOpen] = useState(false)

  const { data, isLoading, isError } = useAdminTourists({
    page,
    limit,
    search: search || undefined,
  })

  const handleView = (tourist: AdminTourist) => {
    setSelectedTourist(tourist)
    setDetailOpen(true)
  }

  const handleBlock = (tourist: AdminTourist) => {
    setSelectedTourist(tourist)
    setBlockOpen(true)
  }

  return (
    <div className="p-6 space-y-6">
      <AdminPageHeader
        title="Tourists"
        description="Manage and monitor all registered tourists on the platform"
      />

      {/* Search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <TableSearch
          value={search}
          onChange={(value) => {
            setSearch(value)
            setPage(1)
          }}
          placeholder="Search by name or email..."
        />
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Spinner className="h-8 w-8" />
        </div>
      ) : isError ? (
        <div className="rounded-lg border border-destructive/50 bg-destructive/5 p-6 text-center">
          <p className="text-destructive font-medium">
            Failed to load tourists
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Please try again later
          </p>
        </div>
      ) : (
        <>
          <TouristTable
            tourists={data?.data || []}
            onView={handleView}
            onBlock={handleBlock}
          />

          {data?.meta && data.meta.total > 0 && (
            <TablePagination
              meta={data.meta}
              onPageChange={setPage}
              onLimitChange={(value) => {
                setLimit(value)
                setPage(1)
              }}
            />
          )}
        </>
      )}

      {/* Detail Sheet */}
      <TouristDetailSheet
        tourist={selectedTourist}
        open={detailOpen}
        onOpenChange={setDetailOpen}
      />

      {/* Block Dialog */}
      <TouristBlockDialog
        tourist={selectedTourist}
        open={blockOpen}
        onOpenChange={setBlockOpen}
      />
    </div>
  )
}