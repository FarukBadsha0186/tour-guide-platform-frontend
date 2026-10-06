"use client"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { StatusBadge } from "@/components/modules/admin/common/status-badge"
import { format } from "date-fns"
import type { GuidePackage } from "@/types/guide.type"
import {
  Clock,
  Users,
  DollarSign,
  MapPin,
  CheckCircle2,
  XCircle,
} from "lucide-react"

interface PackageDetailSheetProps {
  pkg: GuidePackage | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PackageDetailSheet({
  pkg,
  open,
  onOpenChange,
}: PackageDetailSheetProps) {
  if (!pkg) return null

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Package Details</SheetTitle>
          <SheetDescription>
            View your package information
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Header */}
          <div>
            <h3 className="text-lg font-semibold">{pkg.title}</h3>
            <div className="mt-2">
              <StatusBadge status={pkg.status} type="package" />
            </div>
          </div>

          {/* Description */}
          {pkg.description && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold">Description</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {pkg.description}
              </p>
            </div>
          )}

          <Separator />

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <StatCard
              icon={<Clock className="h-4 w-4" />}
              label="Duration"
              value={`${pkg.durationHours} hours`}
            />
            <StatCard
              icon={<DollarSign className="h-4 w-4" />}
              label="Price / Person"
              value={`৳ ${pkg.pricePerPerson}`}
            />
            <StatCard
              icon={<Users className="h-4 w-4" />}
              label="Group Size"
              value={`${pkg.minGroupSize} - ${pkg.maxGroupSize}`}
            />
            <StatCard
              icon={<MapPin className="h-4 w-4" />}
              label="Meeting Point"
              value={pkg.meetingPoint || "—"}
            />
          </div>

          {/* Inclusions */}
          {pkg.inclusions?.length > 0 && (
            <>
              <Separator />
              <div className="space-y-3">
                <h4 className="text-sm font-semibold">Inclusions</h4>
                <ul className="space-y-2">
                  {pkg.inclusions.map((item) => (
                    <li
                      key={`inclusion-${item}`}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}

          {/* Exclusions */}
          {pkg.exclusions?.length > 0 && (
            <>
              <Separator />
              <div className="space-y-3">
                <h4 className="text-sm font-semibold">Exclusions</h4>
                <ul className="space-y-2">
                  {pkg.exclusions.map((item) => (
                    <li
                      key={`exclusion-${item}`}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <XCircle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}

          {/* Timeline */}
          <Separator />
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Timeline</h4>
            <InfoRow
              label="Created"
              value={format(new Date(pkg.createdAt), "MMM dd, yyyy HH:mm")}
            />
            <InfoRow
              label="Last Updated"
              value={format(new Date(pkg.updatedAt), "MMM dd, yyyy HH:mm")}
            />
          </div>
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
      <span className="font-medium text-right">{value}</span>
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
      <p className="text-sm font-semibold truncate">{value}</p>
    </div>
  )
}