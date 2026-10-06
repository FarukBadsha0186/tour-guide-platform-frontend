import TouristDashboard from "@/components/layout/tourist/tourist.dashboard"
import { UserRole } from "@/types"
import { ReactNode } from "react"

export default function TouristLayout({ children  }: { children: ReactNode  }) {
  return <TouristDashboard userRole="TOURIST">{children}</TouristDashboard>
}