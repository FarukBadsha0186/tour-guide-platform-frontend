


"use client"

import { AdminPageHeader } from "@/components/modules/admin/common/admin-page-header"


import { useGuideDashboard } from "@/hooks"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import { StatsCards } from "@/components/modules/guides/dashboard/stats-cards"
import { RecentBookings } from "@/components/modules/guides/dashboard/recent-bookings"

export default function GuideDashboardPage() {
  const { stats, isLoading, isError, refetch } = useGuideDashboard()

  if (isError) {
    return (
      <div className="p-6">
        <div className="rounded-lg border border-destructive/50 bg-destructive/5 p-6 text-center">
          <p className="text-destructive font-medium">
            Failed to load dashboard
          </p>
          <Button onClick={refetch} variant="outline" className="mt-4">
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <AdminPageHeader
        title="Dashboard"
        description="Welcome back! Here's your guide overview."
        action={
          <Button onClick={refetch} variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        }
      />

      <StatsCards stats={stats} isLoading={isLoading} />

      <RecentBookings
        bookings={stats.recentBookings}
        isLoading={isLoading}
      />
    </div>
  )
}