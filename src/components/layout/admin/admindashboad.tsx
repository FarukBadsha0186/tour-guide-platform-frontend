// // import RoleGuard from "@/components/auth/role.guard";
// // import DashBoardShell from "@/components/dashboard/dashboard.shell";
// // import { ReactNode } from "react";

// // export default function AdminLayout({children}:{children:ReactNode}) {
// //     return <RoleGuard roles={["ADMIN"]}>Admin Layout 
// //     <DashBoardShell >
// //         {children}
// //     </DashBoardShell>
// //     </RoleGuard>;
    
// // }

// import RoleGuard from "@/components/auth/role.guard"
// import DashBoardShell from "@/components/dashboard/dashboard.shell"
// import { UserRole } from "@/types"
// import { ReactNode } from "react"

// export default function AdminLayout({ children ,userRole}: { children: ReactNode, userRole:UserRole }) {
//   return (
//     <RoleGuard roles={["ADMIN"]}>
//       <DashBoardShell role="ADMIN">
//         {children}
//       </DashBoardShell>
//     </RoleGuard>
//   )
// }

import RoleGuard from "@/components/auth/role.guard"
import DashBoardShell from "@/components/dashboard/dashboard.shell"
import { UserRole } from "@/types"
import { ReactNode } from "react"

export default function AdminLayout({
  children,
  userRole,
}: {
  children: ReactNode
  userRole: UserRole
}) {
  return (
    <RoleGuard roles={["ADMIN"]}>
      <DashBoardShell role={userRole}>
        {children}
      </DashBoardShell>
    </RoleGuard>
  )
}