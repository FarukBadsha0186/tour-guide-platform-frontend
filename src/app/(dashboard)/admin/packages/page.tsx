"use client"

import { useState } from "react"
import { AdminPageHeader } from "@/components/modules/admin/common/admin-page-header"
import { TableSearch } from "@/components/modules/admin/common/table-search"
import { TablePagination } from "@/components/modules/admin/common/table-pagination"

import { useAdminPackages } from "@/hooks"
import type { AdminPackage } from "@/types/admin.type"
import { DEFAULT_PAGE, DEFAULT_LIMIT } from "@/constants/admin.constants"
import { Spinner } from "@/components/ui/spinner"
import { PackageDetailSheet } from "@/components/modules/admin/package/package-detail-sheet"
import { PackageApproveDialog } from "@/components/modules/admin/package/package-approve-dialog"
import { PackageTable } from "@/components/modules/admin/package/package-table"

export default function PackagesPage() {
  const [page, setPage] = useState(DEFAULT_PAGE)
  const [limit, setLimit] = useState(DEFAULT_LIMIT)
  const [search, setSearch] = useState("")

  const [selectedPackage, setSelectedPackage] = useState<AdminPackage | null>(
    null
  )
  const [detailOpen, setDetailOpen] = useState(false)
  const [approveOpen, setApproveOpen] = useState(false)
  const [action, setAction] = useState<"APPROVED" | "REJECTED">("APPROVED")

  const { data, isLoading, isError } = useAdminPackages({
    page,
    limit,
    search: search || undefined,
  })

  const handleView = (pkg: AdminPackage) => {
    setSelectedPackage(pkg)
    setDetailOpen(true)
  }

  const handleApprove = (pkg: AdminPackage) => {
    setSelectedPackage(pkg)
    setAction("APPROVED")
    setApproveOpen(true)
  }

  const handleReject = (pkg: AdminPackage) => {
    setSelectedPackage(pkg)
    setAction("REJECTED")
    setApproveOpen(true)
  }

  return (
    <div className="p-6 space-y-6">
      <AdminPageHeader
        title="Packages"
        description="Approve and manage tour packages created by guides"
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <TableSearch
          value={search}
          onChange={(value) => {
            setSearch(value)
            setPage(1)
          }}
          placeholder="Search packages..."
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Spinner className="h-8 w-8" />
        </div>
      ) : isError ? (
        <div className="rounded-lg border border-destructive/50 bg-destructive/5 p-6 text-center">
          <p className="text-destructive font-medium">
            Failed to load packages
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Please try again later
          </p>
        </div>
      ) : (
        <>
          <PackageTable
            packages={data?.data || []}
            onView={handleView}
            onApprove={handleApprove}
            onReject={handleReject}
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

      <PackageDetailSheet
        pkg={selectedPackage}
        open={detailOpen}
        onOpenChange={setDetailOpen}
      />

      <PackageApproveDialog
        pkg={selectedPackage}
        open={approveOpen}
        onOpenChange={setApproveOpen}
        action={action}
      />
    </div>
  )
}