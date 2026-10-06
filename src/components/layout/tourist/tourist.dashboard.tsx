import RoleGuard from "@/components/auth/role.guard"
import DashBoardShell from "@/components/dashboard/dashboard.shell"
import { UserRole } from "@/types"
import { ReactNode } from "react"

export default function TourisLayout({
  children,
  userRole,
}: {
  children: ReactNode
  userRole: UserRole
}) {
  return (
    <RoleGuard roles={["TOURIST"]}>
      <DashBoardShell role={userRole}>
        {children}
      </DashBoardShell>
    </RoleGuard>
  )
}