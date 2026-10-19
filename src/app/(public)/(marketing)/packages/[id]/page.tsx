

"use client"
import { useGetMe } from "@/hooks"
import { use, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { format } from "date-fns"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Spinner } from "@/components/ui/spinner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useSearchPublicPackages, useTouristAvailableSlots } from "@/hooks"
import { BookingForm } from "@/components/modules/tourist/bookings/booking-form"
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
  ShieldCheck,
  Sparkles,
  CalendarDays,
} from "lucide-react"
import { toast } from "sonner"

interface PageProps {
  params: Promise<{ id: string }>
}

export default function PackageDetailPage({ params }: PageProps) {
  const { data: me } = useGetMe()
  const isLoggedIn = !!me?.data
  const router = useRouter()
  const { id } = use(params)
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  const { data: packagesData, isLoading } = useSearchPublicPackages({
    limit: 100,
  })

  const handleBookNow = () => {
    if (!isLoggedIn) {
      toast.error("Please login to book", {
        description: "You need to be logged in to book this tour.",
      })
      router.push(`/login?redirect=/packages/${id}`)
      return
    }
    setIsBookingOpen(true)
  }

  const pkg = useMemo(
    () => packagesData?.data?.find((p) => p.id === id),
    [packagesData, id]
  )

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

  if (!pkg) {
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
    //<div className="container mx-auto px-4 py-8">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 py-6">
      {/* Back link */}
      <Link
        href="/packages"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Packages
      </Link>

      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950/40 dark:via-teal-950/30 dark:to-cyan-950/30 p-5 sm:p-6 mb-6">
  <div className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-emerald-400/20 blur-2xl" />
  <div className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-teal-400/20 blur-2xl" />
  <div className="relative">
    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2 break-words">
      {pkg.title}
    </h1>
    <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
      {pkg.description}
    </p>
  </div>
</div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 min-w-0 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatBox icon={<Clock className="h-4 w-4" />} label="Duration" value={`${pkg.durationHours}h`} tone="emerald" />
            <StatBox icon={<Users className="h-4 w-4" />} label="Group Size" value={`${pkg.minGroupSize}-${pkg.maxGroupSize}`} tone="blue" />
            <StatBox icon={<MapPin className="h-4 w-4" />} label="Location" value={pkg.guide.baseLocation || "—"} tone="rose" />
            <StatBox icon={<Star className="h-4 w-4" />} label="Rating" value={pkg.guide.rating.toFixed(1)} tone="amber" />
          </div>

          {pkg.meetingPoint && (
            <section>
              <SectionHeading icon={<MapPin className="h-4 w-4" />} title="Meeting Point" />
              <div className="rounded-xl border bg-muted/30 p-4 flex items-start gap-3">
                <MapPin className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-sm">{pkg.meetingPoint}</p>
              </div>
            </section>
          )}

          {pkg.inclusions?.length > 0 && (
            <section>
              <SectionHeading icon={<CheckCircle2 className="h-4 w-4 text-emerald-600" />} title="What's Included" />
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {pkg.inclusions.map((item) => (
                  <li key={`inc-${item}`} className="flex items-start gap-2 text-sm rounded-lg border bg-emerald-50/40 dark:bg-emerald-950/10 border-emerald-100 dark:border-emerald-900/50 p-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {pkg.exclusions?.length > 0 && (
            <section>
              <SectionHeading icon={<XCircle className="h-4 w-4 text-destructive" />} title="Not Included" />
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {pkg.exclusions.map((item) => (
                  <li key={`exc-${item}`} className="flex items-start gap-2 text-sm rounded-lg border bg-muted/30 p-2.5">
                    <XCircle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <Separator />

          <section>
            <SectionHeading icon={<Users className="h-4 w-4" />} title="Your Guide" />
            <div className="rounded-xl border p-5 flex items-center gap-4 hover:shadow-sm transition-shadow">
              <Avatar className="h-16 w-16 ring-2 ring-emerald-100 dark:ring-emerald-900">
                <AvatarImage src={pkg.guide.user.imageUrl} alt={pkg.guide.user.name} />
                <AvatarFallback className="text-lg">
                  {pkg.guide.user.name?.charAt(0)?.toUpperCase() || "G"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold text-lg flex items-center gap-2">
                  {pkg.guide.user.name}
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                  <span>
                    {pkg.guide.rating.toFixed(1)} ({pkg.guide.totalReviews} reviews)
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 min-w-0">
          <div className="sticky top-6">
            <Card className="overflow-hidden">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white p-4">
  <p className="text-xs uppercase tracking-wide opacity-90">Price per person</p>
  <p className="text-2xl font-bold mt-1">৳ {pkg.pricePerPerson}</p>
</div>
              <CardContent className="p-4 space-y-3">
                <div>
                  <p className="text-sm font-medium mb-3 flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-emerald-600" />
                    Available Dates
                  </p>
                  {availableSlots.length === 0 ? (
                    <div className="rounded-lg border border-dashed p-4 text-center">
                      <p className="text-sm text-muted-foreground">No available dates yet</p>
                    </div>
                  ) : (
                    <div className="space-y-2  max-h-40 overflow-y-auto pr-1">
                      {availableSlots.slice(0, 5).map((slot) => (
                        <div key={slot.id} className="flex items-center justify-between rounded-lg border bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-900 p-2.5">
                          <div className="flex items-center gap-2">
                            <CalendarDays className="h-4 w-4 text-emerald-600" />
                            <span className="text-sm font-medium">
                              {format(new Date(slot.date), "MMM dd, yyyy")}
                            </span>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {slot.startTime} - {slot.endTime}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-md"
                  size="lg"
                  onClick={handleBookNow}
                  disabled={availableSlots.length === 0}
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  Book Now
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Free cancellation up to 24 hours before the tour
                </p>
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
            <DialogDescription>Select a date and number of people.</DialogDescription>
          </DialogHeader>
          <BookingForm
            pkg={pkg as any}
            availableSlots={availableSlots as any}
            onCancel={() => setIsBookingOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

function StatBox({ icon, label, value, tone = "emerald" }: { icon: React.ReactNode; label: string; value: string; tone?: "emerald" | "blue" | "amber" | "rose" }) {
  const tones: Record<string, string> = {
    emerald: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
    blue: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
    amber: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
    rose: "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
  }
  return (
   <div className="rounded-xl border bg-card p-2.5 hover:shadow-sm transition-shadow">
  <div className="flex items-center gap-1.5 mb-1">
    <span className={`inline-flex h-6 w-6 items-center justify-center rounded-md ${tones[tone]}`}>
      {icon}
    </span>
    <span className="text-[11px] text-muted-foreground">{label}</span>
  </div>
  <p className="font-semibold text-sm truncate">{value}</p>
</div>
  )
}

function SectionHeading({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <h3 className="font-semibold mb-3 flex items-center gap-2">
      {icon}
      {title}
    </h3>
  )
}