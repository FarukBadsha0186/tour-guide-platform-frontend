// import TouristDashboard from "@/components/layout/tourist/tourist.dashboard"
// import { UserRole } from "@/types"
// import { ReactNode } from "react"

// export default function TouristLayout({ children  }: { children: ReactNode  }) {
//   return <TouristDashboard userRole="TOURIST">{children}</TouristDashboard>
// }

// import RoleGuard from "@/components/auth/role.guard"
// import DashBoardShell from "@/components/dashboard/dashboard.shell"
// import { ReactNode } from "react"

// export default function TouristRootLayout({ children }: { children: ReactNode }) {
//   return (
  
//       <DashBoardShell userRolE="TOURIST">{children}</DashBoardShell>
  
//   )

// }



import RoleGuard from "@/components/auth/role.guard"
import DashBoardShell from "@/components/dashboard/dashboard.shell"
import TourisLayout from "@/components/layout/tourist/tourist.dashboard"
import { ReactNode } from "react"

export default function TouristRootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    // <RoleGuard roles={["TOURIST"]}>
    //   <DashBoardShell userRole="TOURIST">{children}</DashBoardShell>
    // </RoleGuard>

     <TourisLayout userRole="GUIDE">{children}</TourisLayout>
  )
}