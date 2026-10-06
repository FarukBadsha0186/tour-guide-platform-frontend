"use client"

import { useState } from "react"
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
import { useGuideBookings } from "@/hooks"
import {
  DEFAULT_PAGE,
  DEFAULT_LIMIT,
} from "@/constants/admin.constants"
import { BOOKING_STATUS_FILTERS } from "@/constants/guide.constants"
import { RefreshCw } from "lucide-react"
import { useRouter } from "next/navigation"
import { BookingTable } from "@/components/modules/guides/bookings/booking-table"

export default function GuideBookingsPage() {
  const router = useRouter()

  const [page, setPage] = useState(DEFAULT_PAGE)
  const [limit, setLimit] = useState(DEFAULT_LIMIT)
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("ALL")

  const { data, isLoading, isError, refetch } = useGuideBookings({
    page,
    limit,
    status: status === "ALL" ? undefined : status,
  })

  const bookings = data?.data || []
  const meta = data?.meta

  // Client-side search (bookingReference filter)
  const filteredBookings = search
    ? bookings.filter(
        (b) =>
          b.bookingReference.toLowerCase().includes(search.toLowerCase()) ||
          b.tourist?.user?.name
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||
          b.package?.title?.toLowerCase().includes(search.toLowerCase())
      )
    : bookings

  return (
    <div className="p-6 space-y-6">
      <AdminPageHeader
        title="Bookings"
        description="Manage all bookings from tourists"
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <TableSearch
          value={search}
          onChange={setSearch}
          placeholder="Search by reference, tourist, or package..."
        />

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
            {BOOKING_STATUS_FILTERS.map((f) => (
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
            Failed to load bookings
          </p>
          <Button onClick={() => refetch()} variant="outline" className="mt-4">
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </div>
      ) : (
        <>
          <BookingTable
            bookings={filteredBookings}
            onView={(b) => router.push(`/guide/bookings/${b.id}`)}
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
    </div>
  )
}