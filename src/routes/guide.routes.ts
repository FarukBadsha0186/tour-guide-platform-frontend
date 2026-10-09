import type { SidebarItems } from "@/types/sidebar"

export const guideRoutes: SidebarItems = [
  {
    title: "Dashboard",
    items: [{ title: "Overview", url: "/guide" }],
  },
  {
    title: "Profile",
    items: [{ title: "My Profile", url: "/guide/profile" }],
  },
  {
    title: "Packages",
    items: [
      { title: "All Packages", url: "/guide/packages" },
      { title: "Create Package", url: "/guide/packages/create" },
    ],
  },
  {
    title: "Availability",
    items: [{ title: "Manage Slots", url: "/guide/availability" }],
  },
  {
    title: "Bookings",
    items: [{ title: "All Bookings", url: "/guide/bookings" }],
  },
  {
    title: "Earnings",
    items: [{ title: "Overview", url: "/guide/earnings" }],
  },
  {
    title: "Reviews",
    items: [{ title: "All Reviews", url: "/guide/reviews" }],
  },
]