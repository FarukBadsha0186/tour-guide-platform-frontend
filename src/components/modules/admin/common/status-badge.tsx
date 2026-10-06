
import { Badge } from "@/components/ui/badge"
import {
  BOOKING_STATUS_CONFIG,
  PACKAGE_STATUS_CONFIG,
  PAYMENT_STATUS_CONFIG,
  StatusConfig,
  USER_STATUS_CONFIG,
} from "@/constants/admin.constants"
import type {
  BookingStatus,
  PackageStatus,
  PaymentStatus,
  UserStatus,
} from "@/types/admin.type"

type StatusType = "user" | "booking" | "payment" | "package"

interface StatusBadgeProps {
  status: string
  type: StatusType
}



export function StatusBadge({ status, type }: StatusBadgeProps) {
  let config : StatusConfig | undefined

  switch (type) {
    case "user":
      config = USER_STATUS_CONFIG[status as UserStatus]
      break
    case "booking":
      config = BOOKING_STATUS_CONFIG[status as BookingStatus]
      break
    case "payment":
      config = PAYMENT_STATUS_CONFIG[status as PaymentStatus]
      break
    case "package":
      config = PACKAGE_STATUS_CONFIG[status as PackageStatus]
      break
  }

  if (!config) {
    return <Badge variant="outline">{status}</Badge>
  }

  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  )
}