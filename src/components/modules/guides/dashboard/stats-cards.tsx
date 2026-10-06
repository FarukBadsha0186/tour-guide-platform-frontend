"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import {
  DollarSign,
  Calendar,
  Star,
  Package,
  Clock,
} from "lucide-react"
import type { GuideDashboardStats } from "@/types/guide.type"

interface StatsCardsProps {
  stats: GuideDashboardStats | undefined
  isLoading: boolean
}

export function StatsCards({ stats, isLoading }: StatsCardsProps) {
  if (isLoading) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {["s1", "s2", "s3", "s4"].map((key) => (
        <Card key={key}>
          <CardHeader className="pb-2">
            <Skeleton className="h-4 w-24" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-16" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

  const items = [
    {
      title: "Total Earnings",
      value: `৳ ${stats?.totalEarnings.toLocaleString() || 0}`,
      icon: DollarSign,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      title: "Total Bookings",
      value: String(stats?.totalBookings || 0),
      icon: Calendar,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      title: "Rating",
      value: `${stats?.rating.toFixed(1) || "0.0"} (${stats?.totalReviews || 0})`,
      icon: Star,
      color: "text-yellow-600",
      bg: "bg-yellow-100",
    },
    {
      title: "Packages",
      value: `${stats?.approvedPackages || 0} / ${stats?.totalPackages || 0}`,
      icon: Package,
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item) => {
        const Icon = item.icon
        return (
          <Card key={item.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {item.title}
              </CardTitle>
              <div className={`p-2 rounded-full ${item.bg}`}>
                <Icon className={`h-4 w-4 ${item.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{item.value}</p>
            </CardContent>
          </Card>
        )
      })}

      {stats?.pendingPackages ? (
        <Card className="col-span-full border-yellow-200 bg-yellow-50">
          <CardContent className="flex items-center gap-3 py-4">
            <Clock className="h-5 w-5 text-yellow-600" />
            <p className="text-sm text-yellow-800">
              You have <strong>{stats.pendingPackages}</strong> package
              {stats.pendingPackages > 1 ? "s" : ""} pending admin approval.
            </p>
          </CardContent>
        </Card>
      ) : null}
    </div>
  )
}