import TouristHomeLayout from "@/components/layout/tourist/tourist.home"
import { ReactNode } from "react"

export default function TouristHomeRootLayout({
  children,
}: {
  children: ReactNode
}) {
  return <TouristHomeLayout userRole="TOURIST">{children}</TouristHomeLayout>
}