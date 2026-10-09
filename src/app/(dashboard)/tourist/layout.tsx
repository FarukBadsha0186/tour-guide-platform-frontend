

import RoleGuard from "@/components/auth/role.guard"
import DashBoardShell from "@/components/dashboard/dashboard.shell"
import TouristLayout from "@/components/layout/tourist/tourist.dashboard"
import { ReactNode } from "react"

export default function TouristRootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <TouristLayout userRole="TOURIST">{children}</TouristLayout>
    
  )
}