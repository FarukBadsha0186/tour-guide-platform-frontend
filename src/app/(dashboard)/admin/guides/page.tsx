"use client"

import { useState } from "react"
import { AdminPageHeader } from "@/components/modules/admin/common/admin-page-header"
import { TableSearch } from "@/components/modules/admin/common/table-search"
import { TablePagination } from "@/components/modules/admin/common/table-pagination"
import { GuideTable } from "@/components/modules/admin/guides/guide-table"
import { GuideDetailSheet } from "@/components/modules/admin/guides/guide-detail-sheet"
import { GuideApproveDialog } from "@/components/modules/admin/guides/guide-approve-dialog"
import { GuideBlockDialog } from "@/components/modules/admin/guides/guide-block-dialog"
import { useAdminGuides } from "@/hooks"
import type { AdminGuide } from "@/types/admin.type"
import { DEFAULT_PAGE, DEFAULT_LIMIT } from "@/constants/admin.constants"
import { Spinner } from "@/components/ui/spinner"

export default function GuidesPage() {
  const [page, setPage] = useState(DEFAULT_PAGE)
  const [limit, setLimit] = useState(DEFAULT_LIMIT)
  const [search, setSearch] = useState("")

  const [selectedGuide, setSelectedGuide] = useState<AdminGuide | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)
  const [approveOpen, setApproveOpen] = useState(false)
  const [blockOpen, setBlockOpen] = useState(false)

  const { data, isLoading, isError } = useAdminGuides({
    page,
    limit,
    search: search || undefined,
  })

  const handleView = (guide: AdminGuide) => {
    setSelectedGuide(guide)
    setDetailOpen(true)
  }

  const handleApprove = (guide: AdminGuide) => {
    setSelectedGuide(guide)
    setApproveOpen(true)
  }

  const handleBlock = (guide: AdminGuide) => {
    setSelectedGuide(guide)
    setBlockOpen(true)
  }

  return (
    <div className="p-6 space-y-6">
      <AdminPageHeader
        title="Guides"
        description="Approve and manage all guides on the platform"
      />

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

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Spinner className="h-8 w-8" />
        </div>
      ) : isError ? (
        <div className="rounded-lg border border-destructive/50 bg-destructive/5 p-6 text-center">
          <p className="text-destructive font-medium">Failed to load guides</p>
          <p className="text-sm text-muted-foreground mt-1">
            Please try again later
          </p>
        </div>
      ) : (
        <>
          <GuideTable
            guides={data?.data || []}
            onView={handleView}
            onApprove={handleApprove}
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

      <GuideDetailSheet
        guide={selectedGuide}
        open={detailOpen}
        onOpenChange={setDetailOpen}
      />

      <GuideApproveDialog
        guide={selectedGuide}
        open={approveOpen}
        onOpenChange={setApproveOpen}
      />

      <GuideBlockDialog
        guide={selectedGuide}
        open={blockOpen}
        onOpenChange={setBlockOpen}
      />
    </div>
  )
}