"use client"

import { useState } from "react"
import { AdminPageHeader } from "@/components/modules/admin/common/admin-page-header"
import { TableSearch } from "@/components/modules/admin/common/table-search"
import { TablePagination } from "@/components/modules/admin/common/table-pagination"
import { PaymentTable } from "@/components/modules/admin/payments/payment-table"
import { PaymentDetailSheet } from "@/components/modules/admin/payments/payment-detail-sheet"
import { useAdminPayments } from "@/hooks"
import type { AdminPayment } from "@/types/admin.type"
import { DEFAULT_PAGE, DEFAULT_LIMIT } from "@/constants/admin.constants"
import { Spinner } from "@/components/ui/spinner"

export default function PaymentsPage() {
  const [page, setPage] = useState(DEFAULT_PAGE)
  const [limit, setLimit] = useState(DEFAULT_LIMIT)
  const [search, setSearch] = useState("")

  const [selectedPayment, setSelectedPayment] = useState<AdminPayment | null>(
    null
  )
  const [detailOpen, setDetailOpen] = useState(false)

  const { data, isLoading, isError } = useAdminPayments({
    page,
    limit,
    search: search || undefined,
  })

  const handleView = (payment: AdminPayment) => {
    setSelectedPayment(payment)
    setDetailOpen(true)
  }

  return (
    <div className="p-6 space-y-6">
      <AdminPageHeader
        title="Payments"
        description="Track all payment transactions on the platform"
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <TableSearch
          value={search}
          onChange={(value) => {
            setSearch(value)
            setPage(1)
          }}
          placeholder="Search by transaction ID..."
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Spinner className="h-8 w-8" />
        </div>
      ) : isError ? (
        <div className="rounded-lg border border-destructive/50 bg-destructive/5 p-6 text-center">
          <p className="text-destructive font-medium">
            Failed to load payments
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Please try again later
          </p>
        </div>
      ) : (
        <>
          <PaymentTable
            payments={data?.data || []}
            onView={handleView}
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

      <PaymentDetailSheet
        payment={selectedPayment}
        open={detailOpen}
        onOpenChange={setDetailOpen}
      />
    </div>
  )
}