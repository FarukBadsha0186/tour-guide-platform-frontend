import type { SidebarItems } from "@/types/sidebar"

export const touristRoutes: SidebarItems = [
  {
    title: "Dashboard",
    items: [{ title: "Overview", url: "/tourist" }],
  },
  {
    title: "Profile",
    items: [{ title: "My Profile", url: "/tourist/profile" }],
  },
   {
    title: "Explore",
    items: [
      { title: "Browse Tours", url: "/tourist/browse" },  
    ],
  },
  
  {
    title: "Bookings",
    items: [{ title: "My Bookings", url: "/tourist/bookings" }],
  },
  {
    title: "Payments",
    items: [{ title: "Payment History", url: "/tourist/payments" }],
  },
  {
    title: "Reviews",
    items: [{ title: "My Reviews", url: "/tourist/reviews" }],
  },
]