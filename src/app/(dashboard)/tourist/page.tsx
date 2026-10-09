
// "use client"

// import { useRouter } from "next/navigation"
// import DashBoardShell from "@/components/dashboard/dashboard.shell"
// import { AdminPageHeader } from "@/components/modules/admin/common/admin-page-header"
// import { StatsCards } from "@/components/modules/tourist/dashboard/stats-cards"
// import { RecentBookings } from "@/components/modules/tourist/dashboard/recent-bookings"
// import { Button } from "@/components/ui/button"
// import { useTouristDashboard } from "@/hooks"
// import { RefreshCw, Search } from "lucide-react"

// export default function TouristDashboardPage() {
//   const router = useRouter()
//   const { stats, recentBookings, isLoading, refetch } =
//     useTouristDashboard()

//   return (
//     <DashBoardShell role="TOURIST">
//       <div className="p-6 space-y-6">
//         <AdminPageHeader
//           title="Dashboard"
//           description="Welcome back! Here's your travel overview."
//           action={
//             <div className="flex gap-2">
//               <Button onClick={() => router.push("/tourist/browse")}>
//                 <Search className="mr-2 h-4 w-4" />
//                 Book New Tour
//               </Button>
//               <Button onClick={() => refetch()} variant="outline" size="sm">
//                 <RefreshCw className="h-4 w-4" />
//               </Button>
//             </div>
//           }
//         />

//         <StatsCards stats={stats} isLoading={isLoading} />

//         <RecentBookings bookings={recentBookings} isLoading={isLoading} />
//       </div>
//     </DashBoardShell>
//   )
// }


"use client"

import { useRouter } from "next/navigation"
import { AdminPageHeader } from "@/components/modules/admin/common/admin-page-header"
import { StatsCards } from "@/components/modules/tourist/dashboard/stats-cards"
import { RecentBookings } from "@/components/modules/tourist/dashboard/recent-bookings"
import { Button } from "@/components/ui/button"
import { useTouristDashboard } from "@/hooks"
import { RefreshCw, Search } from "lucide-react"

export default function TouristDashboardPage() {
  const router = useRouter()
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
          <div className="flex gap-2">
            <Button onClick={() => router.push("/tourist/browse")}>
              <Search className="mr-2 h-4 w-4" />
              Book New Tour
            </Button>
            <Button onClick={() => refetch()} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
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