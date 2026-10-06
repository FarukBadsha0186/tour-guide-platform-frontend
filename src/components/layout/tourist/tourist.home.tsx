import RoleGuard from "@/components/auth/role.guard"
import DashBoardShell from "@/components/dashboard/dashboard.shell"
import { UserRole } from "@/types"
import { ReactNode } from "react"

export default function TouristhomeLayout({
  children,
  userRole,
}: {
  children: ReactNode
  userRole: UserRole
}) {
  return (
    <RoleGuard roles={["TOURIST"]}>
     {children}
     <h1>
        hello tourist home page 
     </h1>
    </RoleGuard>
  )
}