


"use client"

import { useMemo } from "react"
import Link from "next/link"
import { format } from "date-fns"
import { 
  Users, 
  Package, 
  CalendarCheck, 
  DollarSign, 
  Clock, 
  ArrowRight 
} from "lucide-react"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts"

import { 
  useAdminTourists, 
  useAdminGuides, 
  useAdminPackages, 
  useAdminBookings, 
  useAdminPayments 
} from "@/hooks"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function AdminDashboardPage() {
  // ===== FETCH DATA =====
  const { data: touristsData, isLoading: touristsLoading } = useAdminTourists({ limit: 1 })
  const { data: guidesData, isLoading: guidesLoading } = useAdminGuides({ limit: 100 })
  const { data: packagesData, isLoading: packagesLoading } = useAdminPackages({ limit: 100 })
  
  // ✅ FIX 1: sortBy / sortOrder remove kora hoyeche (ListParams e nei)
  const { data: bookingsData, isLoading: bookingsLoading } = useAdminBookings({ limit: 5 })
  
  // ✅ FIX 2: limit 100 diye sob payments anbo, tarpor revenue calculate korbo
  const { data: paymentsData, isLoading: paymentsLoading } = useAdminPayments({ limit: 100 })

  const isLoading = touristsLoading || guidesLoading || packagesLoading || bookingsLoading || paymentsLoading

  // ===== CALCULATE STATS =====
  const stats = useMemo(() => {
    const totalTourists = touristsData?.meta?.total || 0
    const totalGuides = guidesData?.meta?.total || 0
    
    // Pending Guides (isApproved == false)
    const pendingGuides = guidesData?.data?.filter((g: any) => !g.isApproved).length || 0
    
    // Pending Packages (status == PENDING)
    const pendingPackages = packagesData?.data?.filter((p: any) => p.status === "PENDING").length || 0

    // ✅ FIX: paymentsData.data theke revenue calculate koro (stats property nei)
    const totalRevenue = paymentsData?.data?.reduce((sum: number, payment: any) => {
      if (payment.status === "SUCCESS") {
        return sum + (Number(payment.amount) || 0)
      }
      return sum
    }, 0) || 0

    const totalBookings = bookingsData?.meta?.total || 0

    return {
      totalUsers: totalTourists + totalGuides,
      totalBookings,
      totalRevenue,
      pendingApprovals: pendingGuides + pendingPackages,
    }
  }, [touristsData, guidesData, packagesData, bookingsData, paymentsData])

  // ===== PREPARE CHART DATA =====
  const chartData = useMemo(() => {
    if (!paymentsData?.data) return []

    const grouped = paymentsData.data.reduce((acc: any, payment: any) => {
      if (payment.status !== "SUCCESS") return acc
      
      const month = format(new Date(payment.createdAt), "MMM")
      if (!acc[month]) acc[month] = 0
      acc[month] += Number(payment.amount) || 0
      return acc
    }, {})

    return Object.keys(grouped).map(month => ({
      name: month,
      revenue: grouped[month]
    }))
  }, [paymentsData])

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      
      {/* ===== HEADER ===== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Admin Dashboard</h2>
          <p className="text-muted-foreground mt-1">Overview of your platform</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/guides">
            <Button variant="outline" className="border-border hover:bg-muted">
              Review Guides
            </Button>
          </Link>
          <Link href="/admin/packages">
            <Button className="bg-primary hover:bg-primary/90">
              Review Packages
            </Button>
          </Link>
        </div>
      </div>

      {/* ===== 1. OVERVIEW CARDS ===== */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Users" 
          value={stats.totalUsers} 
          icon={<Users className="h-5 w-5 text-primary" />} 
          desc="Tourists & Guides"
          loading={isLoading}
        />
        <StatCard 
          title="Total Bookings" 
          value={stats.totalBookings} 
          icon={<CalendarCheck className="h-5 w-5 text-secondary" />} 
          desc="All time bookings"
          loading={isLoading}
        />
        <StatCard 
          title="Total Revenue" 
          value={`৳ ${stats.totalRevenue.toLocaleString()}`} 
          icon={<DollarSign className="h-5 w-5 text-accent" />} 
          desc="Successful payments"
          loading={isLoading}
        />
        <StatCard 
          title="Pending Approvals" 
          value={stats.pendingApprovals} 
          icon={<Clock className="h-5 w-5 text-destructive" />} 
          desc="Guides & Packages"
          loading={isLoading}
        />
      </div>

      {/* ===== 2. CHART & PENDING LIST ===== */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        
        {/* Revenue Chart */}
        <Card className="lg:col-span-4 border-border bg-card shadow-sm">
          <CardHeader>
            <CardTitle className="text-foreground">Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue from successful payments.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            {isLoading ? (
              <Skeleton className="h-[300px] w-full" />
            ) : chartData.length === 0 ? (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                No revenue data available
              </div>
            ) : (
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      stroke="var(--muted-foreground)" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                    />
                    <YAxis 
                      stroke="var(--muted-foreground)" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                      tickFormatter={(value) => `৳${value}`}
                    />
                    <Tooltip 
                      cursor={{ fill: "var(--muted)" }}
                      contentStyle={{ 
                        backgroundColor: "var(--card)", 
                        borderColor: "var(--border)",
                        color: "var(--foreground)"
                      }} 
                    />
                    <Bar 
                      dataKey="revenue" 
                      fill="var(--primary)" 
                      radius={[4, 4, 0, 0]} 
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pending Approvals */}
        <Card className="lg:col-span-3 border-border bg-card shadow-sm">
          <CardHeader>
            <CardTitle className="text-foreground">Pending Approvals</CardTitle>
            <CardDescription>Top pending guides and packages.</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {/* Pending Guides */}
                {guidesData?.data?.filter((g: any) => !g.isApproved).slice(0, 3).map((guide: any) => {
                  const guideName = 
                    guide.user?.name || 
                    guide.name || 
                    guide.userName || 
                    guide.email || 
                    `Guide (${guide.userId?.slice(0, 8) || "New"})`;
                  
                  const initial = guideName.charAt(0).toUpperCase();
                  const location = guide.baseLocation || "Location not set";
                  
                  return (
                    <div key={guide.id} className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/20">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-medium">
                          {initial}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground truncate max-w-[120px]">{guideName}</p>
                          <p className="text-xs text-muted-foreground truncate max-w-[120px]">{location}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-secondary border-secondary/30">Pending</Badge>
                    </div>
                  );
                })}

                {/* Pending Packages */}
                {packagesData?.data?.filter((p: any) => p.status === "PENDING").slice(0, 3).map((pkg: any) => (
                  <div key={pkg.id} className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/20">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                        <Package className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground truncate max-w-[120px]">{pkg.title || "Untitled Package"}</p>
                        <p className="text-xs text-muted-foreground truncate max-w-[120px]">Guide: {pkg.guide?.user?.name || "Unknown"}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-primary border-primary/30">Pending</Badge>
                  </div>
                ))}

                {stats.pendingApprovals === 0 && (
                  <p className="text-center text-sm text-muted-foreground py-4">No pending approvals. All caught up!</p>
                )}

                <Link href="/admin/guides">
                  <Button variant="ghost" className="w-full mt-2 text-primary hover:text-primary/80 hover:bg-primary/5">
                    View All Approvals <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* ===== 3. RECENT BOOKINGS TABLE ===== */}
      <Card className="border-border bg-card shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-foreground">Recent Bookings</CardTitle>
            <CardDescription>Latest tour bookings on the platform.</CardDescription>
          </div>
          <Link href="/admin/bookings">
            <Button variant="outline" size="sm" className="border-border hover:bg-muted">
              View All
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-[200px] w-full" />
          ) : (
            <div className="rounded-md border border-border">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead>Tourist</TableHead>
                    <TableHead>Package</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookingsData?.data?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                        No bookings found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    bookingsData?.data?.map((booking: any) => (
                      <TableRow key={booking.id} className="border-border hover:bg-muted/30">
                        <TableCell className="font-medium text-foreground">
                          {booking.tourist?.user?.name || "N/A"}
                        </TableCell>
                        <TableCell className="text-muted-foreground truncate max-w-[200px]">
                          {booking.package?.title || "N/A"}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {format(new Date(booking.createdAt), "MMM dd, yyyy")}
                        </TableCell>
                        <TableCell className="text-foreground font-medium">
                          ৳ {Number(booking.totalPrice || 0).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={
                              booking.status === "CONFIRMED" || booking.status === "COMPLETED" 
                                ? "bg-primary/10 text-primary border-primary/20" :
                              booking.status === "PENDING_PAYMENT" 
                                ? "bg-secondary/10 text-secondary border-secondary/20" :
                              "bg-destructive/10 text-destructive border-destructive/20"
                            }
                          >
                            {booking.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// ===== REUSABLE STAT CARD =====
function StatCard({ 
  title, 
  value, 
  icon, 
  desc, 
  loading 
}: { 
  title: string
  value: string | number
  icon: React.ReactNode
  desc: string
  loading: boolean 
}) {
  return (
    <Card className="border-border bg-card shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="h-8 w-8 rounded-full bg-muted/50 flex items-center justify-center">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-8 w-1/2 mb-1" />
        ) : (
          <div className="text-2xl font-bold text-foreground">{value}</div>
        )}
        <p className="text-xs text-muted-foreground mt-1">{desc}</p>
      </CardContent>
    </Card>
  )
}