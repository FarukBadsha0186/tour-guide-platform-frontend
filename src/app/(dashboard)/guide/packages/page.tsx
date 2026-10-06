// export default function GuidePackagesPage() {
//   return <div className="p-6">Packages — coming soon</div>
// }

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AdminPageHeader } from "@/components/modules/admin/common/admin-page-header"
import { TableSearch } from "@/components/modules/admin/common/table-search"
import { TablePagination } from "@/components/modules/admin/common/table-pagination"

import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useGuidePackages } from "@/hooks"
import type { GuidePackage } from "@/types/guide.type"
import {
  DEFAULT_PAGE,
  DEFAULT_LIMIT,
} from "@/constants/admin.constants"
import { PACKAGE_STATUS_FILTERS } from "@/constants/guide.constants"
import { Plus } from "lucide-react"
import { PackageTable } from "@/components/modules/guides/packages/package-table"
import { PackageDetailSheet } from "@/components/modules/guides/packages/package-detail-sheet"

export default function GuidePackagesPage() {
  const router = useRouter()

  const [page, setPage] = useState(DEFAULT_PAGE)
  const [limit, setLimit] = useState(DEFAULT_LIMIT)
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("ALL")

  const [selectedPackage, setSelectedPackage] =
    useState<GuidePackage | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)

  const { data, isLoading, isError } = useGuidePackages({
    page,
    limit,
    status: status === "ALL" ? undefined : status,
    search: search || undefined,
  })

  const handleView = (pkg: GuidePackage) => {
    setSelectedPackage(pkg)
    setDetailOpen(true)
  }

  const handleEdit = (pkg: GuidePackage) => {
    router.push(`/guide/packages/${pkg.id}/edit`)
  }

  const packages = data?.data?.data || []
  const meta = data?.data?.meta

  return (
    <div className="p-6 space-y-6">
      <AdminPageHeader
        title="My Packages"
        description="Manage your tour packages"
        action={
          <Button onClick={() => router.push("/guide/packages/create")}>
            <Plus className="mr-2 h-4 w-4" />
            Create Package
          </Button>
        }
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <TableSearch
          value={search}
          onChange={(value) => {
            setSearch(value)
            setPage(1)
          }}
          placeholder="Search packages..."
        />

        <Select
          value={status}
          onValueChange={(value) => {
            setStatus(value ?? "ALL")
            setPage(1)
          }}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {PACKAGE_STATUS_FILTERS.map((f) => (
              <SelectItem key={f.value} value={f.value}>
                {f.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Spinner className="h-8 w-8" />
        </div>
      ) : isError ? (
        <div className="rounded-lg border border-destructive/50 bg-destructive/5 p-6 text-center">
          <p className="text-destructive font-medium">
            Failed to load packages
          </p>
        </div>
      ) : (
        <>
          <PackageTable
            packages={packages}
            onView={handleView}
            onEdit={handleEdit}
          />

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

      <PackageDetailSheet
        pkg={selectedPackage}
        open={detailOpen}
        onOpenChange={setDetailOpen}
      />
    </div>
  )
}