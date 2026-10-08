

import RoleGuard from "@/components/auth/role.guard"
import { ReactNode } from "react"

export default function TouristRootLayout({
  children,
}: {
  children: ReactNode
}) {
  return <RoleGuard roles={["TOURIST"]}>{children}</RoleGuard>
}