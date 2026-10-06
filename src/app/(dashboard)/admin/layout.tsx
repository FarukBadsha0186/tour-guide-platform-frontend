import AdminLayout from "@/components/layout/admin/admindashboad"
import { ReactNode } from "react"

export default function AdminRootLayout({
  children,
}: {
  children: ReactNode
}) {
  return <AdminLayout userRole="ADMIN">{children}</AdminLayout>
}