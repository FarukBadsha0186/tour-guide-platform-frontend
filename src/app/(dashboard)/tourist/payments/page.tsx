"use client"

import { useState } from "react"
import { AdminPageHeader } from "@/components/modules/admin/common/admin-page-header"
import { TablePagination } from "@/components/modules/admin/common/table-pagination"
import { PaymentTable } from "@/components/modules/tourist/payments/payment-table"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useTouristPayments } from "@/hooks"
import { DEFAULT_PAGE, DEFAULT_LIMIT } from "@/constants/admin.constants"
import { RefreshCw } from "lucide-react"

const PAYMENT_STATUS_FILTERS = [
  { value: "ALL", label: "All" },
  { value: "INITIATED", label: "Initiated" },
  { value: "SUCCESS", label: "Success" },
  { value: "FAILED", label: "Failed" },
  { value: "REFUNDED", label: "Refunded" },
]

export default function TouristPaymentsPage() {
  const [page, setPage] = useState(DEFAULT_PAGE)
  const [limit, setLimit] = useState(DEFAULT_LIMIT)
  const [status, setStatus] = useState("ALL")

  const { data, isLoading, isError, refetch } = useTouristPayments({
    page,
    limit,
    status: status === "ALL" ? undefined : status,
  })

  const payments = data?.data || []
  const meta = data?.meta

  return (
    <div className="p-6 space-y-6">
      <AdminPageHeader
        title="Payment History"
        description="View all your payment transactions"
      />

      {/* Filter */}
      <div className="flex items-center gap-3">
        <Select
          value={status}
          onValueChange={(value) => {
            setStatus(value ?? "ALL")
            setPage(1)
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {PAYMENT_STATUS_FILTERS.map((f) => (
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
            Failed to load payments
          </p>
          <Button onClick={() => refetch()} variant="outline" className="mt-4">
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </div>
      ) : (
        <>
          <PaymentTable payments={payments} />

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