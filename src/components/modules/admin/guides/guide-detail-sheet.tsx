"use client"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { StatusBadge } from "../common/status-badge"
import { AUTH_PROVIDER_LABELS } from "@/constants/admin.constants"
import { format } from "date-fns"
import type { AdminGuide } from "@/types/admin.type"
import { MapPin, Star, Briefcase, TrendingUp } from "lucide-react"

interface GuideDetailSheetProps {
  guide: AdminGuide | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function GuideDetailSheet({
  guide,
  open,
  onOpenChange,
}: GuideDetailSheetProps) {
  if (!guide) return null

  const profile = guide.guide

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Guide Details</SheetTitle>
          <SheetDescription>
            Full profile information of the guide
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Profile */}
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={guide.imageUrl} alt={guide.name} />
              <AvatarFallback className="text-lg">
                {guide.name?.charAt(0)?.toUpperCase() || "G"}
              </AvatarFallback>
            </Avatar>

            <div>
              <h3 className="text-lg font-semibold">{guide.name}</h3>
              <p className="text-sm text-muted-foreground">{guide.email}</p>
              <div className="mt-2 flex gap-2">
                <StatusBadge status={guide.status} type="user" />
                {profile?.isApproved ? (
                  <Badge
                    variant="outline"
                    className="bg-green-100 text-green-700 border-green-200"
                  >
                    Approved
                  </Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className="bg-yellow-100 text-yellow-700 border-yellow-200"
                  >
                    Not Approved
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Account Info */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Account Information</h4>

            <InfoRow
              label="Auth Provider"
              value={
                AUTH_PROVIDER_LABELS[guide.authProvider] || guide.authProvider
              }
            />
            <InfoRow
              label="Email Verified"
              value={guide.emailVerified ? "Yes" : "No"}
            />
            <InfoRow
              label="Joined"
              value={format(new Date(guide.createdAt), "MMM dd, yyyy")}
            />
          </div>

          {/* Guide Profile */}
          {profile ? (
            <>
              <Separator />

              <div className="space-y-3">
                <h4 className="text-sm font-semibold">Professional Info</h4>

                <InfoRow
                  label="License Number"
                  value={profile.licenseNumber || "—"}
                />
                <InfoRow
                  label="Experience"
                  value={`${profile.yearsExperience} years`}
                />
                <InfoRow
                  label="Languages"
                  value={profile.languages?.join(", ") || "—"}
                />
                <InfoRow
                  label="Base Location"
                  value={profile.baseLocation || "—"}
                />
                <InfoRow
                  label="Hourly Rate"
                  value={
                    profile.hourlyRate ? `৳ ${profile.hourlyRate}` : "—"
                  }
                />
              </div>

              {profile.bio && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">Bio</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {profile.bio}
                    </p>
                  </div>
                </>
              )}

              <Separator />

              <div className="space-y-3">
                <h4 className="text-sm font-semibold">Performance</h4>

                <div className="grid grid-cols-2 gap-3">
                  <StatCard
                    icon={<Star className="h-4 w-4" />}
                    label="Rating"
                    value={profile.rating.toFixed(1)}
                  />
                  <StatCard
                    icon={<Briefcase className="h-4 w-4" />}
                    label="Total Bookings"
                    value={String(profile.totalBookings)}
                  />
                  <StatCard
                    icon={<TrendingUp className="h-4 w-4" />}
                    label="Earnings"
                    value={`৳ ${profile.totalEarnings}`}
                  />
                  <StatCard
                    icon={<MapPin className="h-4 w-4" />}
                    label="Packages"
                    value={String(profile._count.packages)}
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="rounded-lg border border-dashed p-4 text-center">
              <p className="text-sm text-muted-foreground">
                Guide profile not completed yet
              </p>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

// ========================================
// HELPERS
// ========================================

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-right break-all">{value}</span>
    </div>
  )
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="rounded-lg border p-3 space-y-1">
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}
        <span className="text-xs">{label}</span>
      </div>
      <p className="text-sm font-semibold">{value}</p>
    </div>
  )
}