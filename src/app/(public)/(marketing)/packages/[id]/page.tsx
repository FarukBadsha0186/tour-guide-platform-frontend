"use client"

import { use, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { format } from "date-fns"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Spinner } from "@/components/ui/spinner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useTouristPackage, useTouristAvailableSlots } from "@/hooks"

import {
  Clock,
  Users,
  MapPin,
  Star,
  Calendar,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  BookOpen,
} from "lucide-react"
import { BookingForm } from "@/components/modules/tourist/bookings/booking-form"

interface PageProps {
  params: Promise<{ id: string }>
}

export default function PackageDetailPage({ params }: PageProps) {
  const router = useRouter()
  const { id } = use(params)

  const [isBookingOpen, setIsBookingOpen] = useState(false)

  const { data, isLoading, isError } = useTouristPackage(id)
  const pkg = data?.data

  const { data: availabilityData } = useTouristAvailableSlots({
    packageId: id,
    limit: 100,
  })

  const availableSlots = availabilityData?.data || []

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-20 flex justify-center">
        <Spinner className="h-8 w-8" />
      </div>
    )
  }

  if (isError || !pkg) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-destructive font-medium">Package not found</p>
        <Link href="/packages">
          <Button variant="outline" className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Packages
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back */}
      <Link
        href="/packages"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Packages
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-3">
              {pkg.title}
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              {pkg.description}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatBox
              icon={<Clock className="h-4 w-4" />}
              label="Duration"
              value={`${pkg.durationHours}h`}
            />
            <StatBox
              icon={<Users className="h-4 w-4" />}
              label="Group"
              value={`${pkg.minGroupSize}-${pkg.maxGroupSize}`}
            />
            <StatBox
              icon={<MapPin className="h-4 w-4" />}
              label="Location"
              value={pkg.guide.baseLocation || "—"}
            />
            <StatBox
              icon={<Star className="h-4 w-4" />}
              label="Rating"
              value={`${pkg.guide.rating.toFixed(1)}`}
            />
          </div>

          <Separator />

          {/* Meeting Point */}
          {pkg.meetingPoint && (
            <div>
              <h3 className="font-semibold mb-3">Meeting Point</h3>
              <div className="rounded-lg border bg-muted/30 p-4 flex items-start gap-3">
                <MapPin className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-sm">{pkg.meetingPoint}</p>
              </div>
            </div>
          )}

          {/* Inclusions */}
          {pkg.inclusions.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3">What's Included</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {pkg.inclusions.map((item) => (
                  <li
                    key={`inc-${item}`}
                    className="flex items-start gap-2 text-sm"
                  >
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Exclusions */}
          {pkg.exclusions.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3">Not Included</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {pkg.exclusions.map((item) => (
                  <li
                    key={`exc-${item}`}
                    className="flex items-start gap-2 text-sm"
                  >
                    <XCircle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Separator />

          {/* Guide Profile */}
          <div>
            <h3 className="font-semibold mb-4">Your Guide</h3>
            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={pkg.guide.user.imageUrl}
                    alt={pkg.guide.user.name}
                  />
                  <AvatarFallback className="text-lg">
                    {pkg.guide.user.name?.charAt(0)?.toUpperCase() || "G"}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <p className="font-semibold text-lg">
                    {pkg.guide.user.name}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                    <span>
                      {pkg.guide.rating.toFixed(1)} ({pkg.guide.totalReviews}{" "}
                      reviews)
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mt-2">
                    <span>🏆 {pkg.guide.yearsExperience} years exp</span>
                    <span>📍 {pkg.guide.baseLocation || "—"}</span>
                  </div>
                </div>
              </div>

              {pkg.guide.languages.length > 0 && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-xs text-muted-foreground mb-2">
                    Languages
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {pkg.guide.languages.map((lang) => (
                      <Badge key={lang} variant="secondary">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 space-y-4">
            {/* Price Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Booking</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Price per person</p>
                  <p className="text-3xl font-bold text-emerald-600">
                    ৳ {pkg.pricePerPerson}
                  </p>
                </div>

                <Separator />

                {/* Available Dates Preview */}
                <div>
                  <p className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Available Dates
                  </p>

                  {availableSlots.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      No available dates yet
                    </p>
                  ) : (
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {availableSlots.slice(0, 5).map((slot) => (
                        <div
                          key={slot.id}
                          className="flex items-center justify-between text-sm p-2 rounded-md bg-emerald-50 border border-emerald-100"
                        >
                          <span className="font-medium">
                            {format(new Date(slot.date), "MMM dd, yyyy")}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {slot.startTime} - {slot.endTime}
                          </span>
                        </div>
                      ))}
                      {availableSlots.length > 5 && (
                        <p className="text-xs text-muted-foreground text-center">
                          +{availableSlots.length - 5} more dates
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => setIsBookingOpen(true)}
                  disabled={availableSlots.length === 0}
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  Book Now
                </Button>

                {availableSlots.length === 0 && (
                  <p className="text-xs text-muted-foreground text-center">
                    No slots available for booking
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Booking Dialog */}
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Book This Tour</DialogTitle>
            <DialogDescription>
              Select a date and number of people to book this tour.
            </DialogDescription>
          </DialogHeader>

          <BookingForm
            pkg={pkg}
            availableSlots={availableSlots}
            // onSuccess={() => {
            //   setIsBookingOpen(false)
            //   router.push("/tourist/bookings")
            // }}
            onCancel={() => setIsBookingOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

// ========================================
// HELPER
// ========================================

function StatBox({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="rounded-lg border p-3">
      <div className="flex items-center gap-2 text-muted-foreground mb-1">
        {icon}
        <span className="text-xs">{label}</span>
      </div>
      <p className="font-semibold text-sm">{value}</p>
    </div>
  )
}