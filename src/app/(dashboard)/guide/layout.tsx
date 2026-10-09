

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