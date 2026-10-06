// "use client"

// import RoleGuard from "@/components/auth/role.guard"
// import DashBoardShell from "@/components/dashboard/dashboard.shell"
// import { ReactNode } from "react"

// export default function GuideRootLayout({
//   children,
// }: {
//   children: ReactNode
// }) {
//   return (
//     <RoleGuard roles={["GUIDE"]}>
//       <DashBoardShell userRole="GUIDE">{children}</DashBoardShell>
//     </RoleGuard>
//   )
// }



import AdminLayout from "@/components/layout/admin/admindashboad"
import GuideLayout from "@/components/layout/guide/guidedashboard"
import { ReactNode } from "react"

export default function GuideRootLayout({
  children,
}: {
  children: ReactNode
}) {
  return <GuideLayout userRole="GUIDE">{children}</GuideLayout>
}