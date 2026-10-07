"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StatusBadge } from "@/components/modules/admin/common/status-badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { format } from "date-fns"
import Link from "next/link"
import { ArrowRight, Calendar } from "lucide-react"
import type { TouristBooking } from "@/types/tourist.type"

interface RecentBookingsProps {
  bookings: TouristBooking[]
  isLoading: boolean
}

export function RecentBookings({
  bookings,
  isLoading,
}: RecentBookingsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Bookings</CardTitle>
          <CardDescription>Your latest tour bookings</CardDescription>
        </div>
        <Link href="/tourist/bookings">
          <Button variant="ghost" size="sm">
            View all <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {["s1", "s2", "s3"].map((key) => (
              <div key={key} className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-48" />
                </div>
                <Skeleton className="h-6 w-20" />
              </div>
            ))}
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="h-10 w-10 mx-auto text-muted-foreground/50 mb-2" />
            <p className="text-sm text-muted-foreground">No bookings yet</p>
            <Link href="/packages">
              <Button variant="outline" size="sm" className="mt-3">
                Browse Tours
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <Link
                key={booking.id}
                href={`/tourist/bookings/${booking.id}`}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={booking.guide?.user?.imageUrl}
                    alt={booking.guide?.user?.name}
                  />
                  <AvatarFallback>
                    {booking.guide?.user?.name?.charAt(0)?.toUpperCase() ||
                      "G"}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {booking.package?.title || "Package"}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    Guide: {booking.guide?.user?.name || "—"} •{" "}
                    {format(new Date(booking.tourDate), "MMM dd, yyyy")}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm font-semibold">
                    ৳ {booking.totalPrice}
                  </p>
                  <StatusBadge status={booking.status} type="booking" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}