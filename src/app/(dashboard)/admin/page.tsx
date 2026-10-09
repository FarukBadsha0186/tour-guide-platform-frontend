

"use client"

import { AdminPageHeader } from "@/components/modules/admin/common/admin-page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserCheck, Package, Calendar, CreditCard } from "lucide-react"
import Link from "next/link"

export default function AdminDashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <AdminPageHeader
        title="Admin Dashboard"
        description="Overview of your platform"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <QuickCard
          title="Tourists"
          description="Manage all tourists"
          href="/admin/tourists"
          icon={<Users className="h-5 w-5" />}
        />
        <QuickCard
          title="Guides"
          description="Approve and manage guides"
          href="/admin/guides"
          icon={<UserCheck className="h-5 w-5" />}
        />
        <QuickCard
          title="Packages"
          description="Approve tour packages"
          href="/admin/packages"
          icon={<Package className="h-5 w-5" />}
        />
        <QuickCard
          title="Bookings"
          description="View all bookings"
          href="/admin/bookings"
          icon={<Calendar className="h-5 w-5" />}
        />
        <QuickCard
          title="Payments"
          description="Track payments"
          href="/admin/payments"
          icon={<CreditCard className="h-5 w-5" />}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Welcome to Admin Panel</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Select a section from the sidebar to manage the platform.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

function QuickCard({
  title,
  description,
  href,
  icon,
}: {
  title: string
  description: string
  href: string
  icon: React.ReactNode
}) {
  return (
    <Link href={href}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <div className="text-muted-foreground">{icon}</div>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </Link>
  )
}