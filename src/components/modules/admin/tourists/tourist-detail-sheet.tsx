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
import { StatusBadge } from "../common/status-badge"
import { AUTH_PROVIDER_LABELS } from "@/constants/admin.constants"
import { format } from "date-fns"
import type { AdminTourist } from "@/types/admin.type"

interface TouristDetailSheetProps {
  tourist: AdminTourist | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TouristDetailSheet({
  tourist,
  open,
  onOpenChange,
}: TouristDetailSheetProps) {
  if (!tourist) return null

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Tourist Details</SheetTitle>
          <SheetDescription>
            Full profile information of the tourist
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Profile */}
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={tourist.imageUrl} alt={tourist.name} />
              <AvatarFallback className="text-lg">
                {tourist.name?.charAt(0)?.toUpperCase() || "T"}
              </AvatarFallback>
            </Avatar>

            <div>
              <h3 className="text-lg font-semibold">{tourist.name}</h3>
              <p className="text-sm text-muted-foreground">{tourist.email}</p>
              <div className="mt-2">
                <StatusBadge status={tourist.status} type="user" />
              </div>
            </div>
          </div>

          <Separator />

          {/* Account Info */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Account Information</h4>

            <InfoRow
              label="Auth Provider"
              value={AUTH_PROVIDER_LABELS[tourist.authProvider] || tourist.authProvider}
            />
            <InfoRow
              label="Email Verified"
              value={tourist.emailVerified ? "Yes" : "No"}
            />
            <InfoRow
              label="Joined"
              value={format(new Date(tourist.createdAt), "MMM dd, yyyy")}
            />
            <InfoRow
              label="Last Updated"
              value={format(new Date(tourist.updatedAt), "MMM dd, yyyy")}
            />
          </div>

          <Separator />

          {/* Tourist Profile */}
          {tourist.tourist ? (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold">Tourist Profile</h4>

              <InfoRow
                label="Contact Number"
                value={tourist.tourist.contactNumber || "—"}
              />
              <InfoRow
                label="Address"
                value={tourist.tourist.address || "—"}
              />
              <InfoRow
                label="Nationality"
                value={tourist.tourist.nationality || "—"}
              />
              <InfoRow
                label="Date of Birth"
                value={
                  tourist.tourist.dateOfBirth
                    ? format(new Date(tourist.tourist.dateOfBirth), "MMM dd, yyyy")
                    : "—"
                }
              />
              <InfoRow
                label="Total Bookings"
                value={String(tourist.tourist._count.bookings)}
              />
            </div>
          ) : (
            <div className="rounded-lg border border-dashed p-4 text-center">
              <p className="text-sm text-muted-foreground">
                Tourist profile not completed yet
              </p>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
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