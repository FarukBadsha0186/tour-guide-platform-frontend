

// import TourisLayout from "@/components/layout/tourist/tourist.dashboard";
// import TouristhomeLayout from "@/components/layout/tourist/tourist.home";
// import { UserRole } from "@/types";
// import { ReactNode } from "react";

// export default function TouristDashboard({children ,role}:{ children :ReactNode ,role:UserRole}) {

//      return( 

       
//       <h1>hello this is dashboard </h1>
//      )
    
// }


"use client"

import { AdminPageHeader } from "@/components/modules/admin/common/admin-page-header"
import { StatsCards } from "@/components/modules/tourist/dashboard/stats-cards"
import { RecentBookings } from "@/components/modules/tourist/dashboard/recent-bookings"
import { Button } from "@/components/ui/button"
import { useTouristDashboard } from "@/hooks"
import { RefreshCw } from "lucide-react"

export default function TouristDashboardPage() {
  const { stats, recentBookings, isLoading, isError, refetch } =
    useTouristDashboard()

  if (isError) {
    return (
      <div className="p-6">
        <div className="rounded-lg border border-destructive/50 bg-destructive/5 p-6 text-center">
          <p className="text-destructive font-medium">
            Failed to load dashboard
          </p>
          <Button onClick={() => refetch()} variant="outline" size="sm">
  <RefreshCw className="mr-2 h-4 w-4" />
  Refresh
</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <AdminPageHeader
        title="Dashboard"
        description="Welcome back! Here's your travel overview."
        action={
          <Button onClick={() => refetch()} variant="outline" size="sm">
  <RefreshCw className="mr-2 h-4 w-4" />
  Refresh
</Button>
        }
      />

      <StatsCards stats={stats} isLoading={isLoading} />

      <RecentBookings
        bookings={recentBookings}
        isLoading={isLoading}
      />
    </div>
  )
}