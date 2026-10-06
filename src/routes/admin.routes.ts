


// import type { SidebarItems } from "@/types/sidebar"

// export const adminRoutes: SidebarItems = [
//   {
//     title: "Dashboard",
//     url: "/admin",
//     items: [
//       {
//         title: "Overview",
//         url: "/admin",
//       },
//     ],
//   },
//   {
//     title: "Management",
//     url: "#",
//     items: [
//       {
//         title: "Tourists",
//         url: "/admin/tourists",
//       },
//       {
//         title: "Guides",
//         url: "/admin/guides",
//       },
//       {
//         title: "Packages",
//         url: "/admin/packages",
//       },
//       {
//         title: "Bookings",
//         url: "/admin/bookings",
//       },
//       {
//         title: "Payments",
//         url: "/admin/payments",
//       },
//     ],
//   },
// ]

import type { SidebarItems } from "@/types/sidebar"

export const adminRoutes: SidebarItems = [
  {
    title: "Dashboard",
    items: [{ title: "Overview", url: "/admin" }],
  },
  {
    title: "Management",
    items: [
      { title: "Tourists", url: "/admin/tourists" },
      { title: "Guides", url: "/admin/guides" },
      { title: "Packages", url: "/admin/packages" },
      { title: "Bookings", url: "/admin/bookings" },
      { title: "Payments", url: "/admin/payments" },
    ],
  },
]