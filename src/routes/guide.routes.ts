// export const guideRoutes= [
//     {
//       title: "Getting Started",
//       url: "#",
//       items: [
//         {
//           title: "Installation",
//           url: "#",
//         },
//         {
//           title: "Project Structure",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Build Your Application",
//       url: "#",
//       items: [
//         {
//           title: "Routing",
//           url: "#",
//         },
//         {
//           title: "Data Fetching",
//           url: "#",
//           isActive: true,
//         },
//         {
//           title: "Rendering",
//           url: "#",
//         },
//         {
//           title: "Caching",
//           url: "#",
//         },
//         {
//           title: "Styling",
//           url: "#",
//         },
//         {
//           title: "Optimizing",
//           url: "#",
//         },
//         {
//           title: "Configuring",
//           url: "#",
//         },
//         {
//           title: "Testing",
//           url: "#",
//         },
//         {
//           title: "Authentication",
//           url: "#",
//         },
//         {
//           title: "Deploying",
//           url: "#",
//         },
//         {
//           title: "Upgrading",
//           url: "#",
//         },
//         {
//           title: "Examples",
//           url: "#",
//         },
//       ],
//     },
//   ]

// import type { SidebarItems } from "@/types/sidebar"

// export const guideRoutes: SidebarItems = [
//   {
//     title: "Dashboard",
//     url: "/guide",
//     items: [
//       {
//         title: "Overview",
//         url: "/guide",
//       },
//     ],
//   },
//   {
//     title: "Profile",
//     url: "/guide/profile",
//     items: [
//       {
//         title: "My Profile",
//         url: "/guide/profile",
//       },
//     ],
//   },
//   {
//     title: "Packages",
//     url: "#",
//     items: [
//       {
//         title: "All Packages",
//         url: "/guide/packages",
//       },
//       {
//         title: "Create Package",
//         url: "/guide/packages/create",
//       },
//     ],
//   },
//   {
//     title: "Availability",
//     url: "/guide/availability",
//     items: [
//       {
//         title: "Manage Slots",
//         url: "/guide/availability",
//       },
//     ],
//   },
//   {
//     title: "Bookings",
//     url: "/guide/bookings",
//     items: [
//       {
//         title: "All Bookings",
//         url: "/guide/bookings",
//       },
//     ],
//   },
//   {
//     title: "Earnings",
//     url: "/guide/earnings",
//     items: [
//       {
//         title: "Overview",
//         url: "/guide/earnings",
//       },
//     ],
//   },
//   {
//     title: "Reviews",
//     url: "/guide/reviews",
//     items: [
//       {
//         title: "All Reviews",
//         url: "/guide/reviews",
//       },
//     ],
//   },
// ]

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