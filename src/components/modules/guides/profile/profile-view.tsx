"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { StatusBadge } from "@/components/modules/admin/common/status-badge"
import { Pencil } from "lucide-react"
import type { GuideProfile } from "@/types/guide.type"

interface ProfileViewProps {
  profile: GuideProfile
  onEdit: () => void
}

export function ProfileView({ profile, onEdit }: ProfileViewProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={profile.user.imageUrl} alt={profile.user.name} />
            <AvatarFallback className="text-2xl">
              {profile.user.name?.charAt(0)?.toUpperCase() || "G"}
            </AvatarFallback>
          </Avatar>

          <div>
            <h2 className="text-xl font-bold">{profile.user.name}</h2>
            <p className="text-sm text-muted-foreground">
              {profile.user.email}
            </p>
            <div className="mt-2 flex gap-2">
              {profile.isApproved ? (
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
                  Pending Approval
                </Badge>
              )}
              {profile.isAvailable && (
                <Badge
                  variant="outline"
                  className="bg-blue-100 text-blue-700 border-blue-200"
                >
                  Available
                </Badge>
              )}
            </div>
          </div>
        </div>

        <Button onClick={onEdit}>
          <Pencil className="mr-2 h-4 w-4" />
          Edit Profile
        </Button>
      </div>

      <Separator />

      {/* Professional Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-sm font-semibold">Professional Information</h3>

          <InfoRow
            label="License Number"
            value={profile.licenseNumber || "—"}
          />
          <InfoRow
            label="Years of Experience"
            value={`${profile.yearsExperience} years`}
          />
          <InfoRow
            label="Base Location"
            value={profile.baseLocation || "—"}
          />
          <InfoRow
            label="Hourly Rate"
            value={profile.hourlyRate ? `৳ ${profile.hourlyRate}` : "—"}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold">Performance</h3>

          <InfoRow label="Rating" value={profile.rating.toFixed(1)} />
          <InfoRow
            label="Total Reviews"
            value={String(profile.totalReviews)}
          />
          <InfoRow
            label="Total Bookings"
            value={String(profile.totalBookings)}
          />
          <InfoRow
            label="Total Earnings"
            value={`৳ ${profile.totalEarnings.toLocaleString()}`}
          />
        </div>
      </div>

      {/* Languages */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold">Languages</h3>
        {profile.languages && profile.languages.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {profile.languages.map((lang) => (
              <Badge key={lang} variant="secondary">
                {lang}
              </Badge>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No languages added</p>
        )}
      </div>

      {/* Bio */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold">Bio</h3>
        {profile.bio ? (
          <p className="text-sm text-muted-foreground leading-relaxed">
            {profile.bio}
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">No bio added yet</p>
        )}
      </div>
    </div>
  )
}

// ========================================
// INFO ROW
// ========================================

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  )
}