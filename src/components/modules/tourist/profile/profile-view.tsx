"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Pencil } from "lucide-react"
import type { TouristProfile } from "@/types/tourist.type"
import { format } from "date-fns"

interface ProfileViewProps {
  profile: TouristProfile
  onEdit: () => void
}

export function ProfileView({ profile, onEdit }: ProfileViewProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage
              src={profile.user.imageUrl}
              alt={profile.user.name}
            />
            <AvatarFallback className="text-2xl">
              {profile.user.name?.charAt(0)?.toUpperCase() || "T"}
            </AvatarFallback>
          </Avatar>

          <div>
            <h2 className="text-xl font-bold">{profile.user.name}</h2>
            <p className="text-sm text-muted-foreground">
              {profile.user.email}
            </p>
          </div>
        </div>

        <Button onClick={onEdit}>
          <Pencil className="mr-2 h-4 w-4" />
          Edit Profile
        </Button>
      </div>

      <Separator />

      {/* Personal Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-sm font-semibold">Personal Information</h3>

          <InfoRow
            label="Full Name"
            value={profile.user.name || "—"}
          />
          <InfoRow
            label="Contact Number"
            value={profile.contactNumber || "—"}
          />
          <InfoRow
            label="Nationality"
            value={profile.nationality || "—"}
          />
          <InfoRow
            label="Date of Birth"
            value={
              profile.dateOfBirth
                ? format(new Date(profile.dateOfBirth), "MMM dd, yyyy")
                : "—"
            }
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold">Contact Details</h3>

          <InfoRow
            label="Email"
            value={profile.user.email || "—"}
          />
          <InfoRow
            label="Address"
            value={profile.address || "—"}
          />
        </div>
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
      <span className="font-medium text-right break-all">{value}</span>
    </div>
  )
}