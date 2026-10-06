// "use client"




// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarRail,
// } from "@/components/ui/sidebar"
// import { Compass } from "lucide-react"
// import { UserRole } from "@/types"

// import { SidebarItem, SidebarItems } from "@/types/sidebar"
// import Link from "next/link"
// import { adminRoutes, touristRoutes } from "@/routes"
// import { usePathname } from "next/navigation"



// const sidebarRoutes: Record <UserRole,SidebarItems>={
//     ADMIN: adminRoutes,
//     GUIDE: adminRoutes,
//     TOURIST: touristRoutes
// }

// export function AppSidebar({role}:{role:UserRole}) {

//   const pathname= usePathname();

//     const routes: SidebarItems =sidebarRoutes[role]
//   return (
//     <Sidebar >

//       <Link href="/">
//       <SidebarHeader>
       
//     <Compass className="h-6 w-6 text-primary" />
//       </SidebarHeader>
//       </Link>
//       <SidebarContent>
//         {routes.map((item) => (
//           <SidebarGroup key={item.title}>
//             <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
//             <SidebarGroupContent>
//               <SidebarMenu>
//                 {item.items.map((item) => (
//                   <SidebarMenuItem key={item.title}>
//                     <SidebarMenuButton render={<Link href={item.url}></Link>}
//                       isActive={pathname === item.url} 
//                     >
                      
//                     </SidebarMenuButton>
//                   </SidebarMenuItem>
//                 ))}
//               </SidebarMenu>
//             </SidebarGroupContent>
//           </SidebarGroup>
//         ))}
//       </SidebarContent>
//       <SidebarRail />
//     </Sidebar>
//   )
// }


"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Compass } from "lucide-react"
import { UserRole } from "@/types"
import { SidebarItems } from "@/types/sidebar"
import Link from "next/link"
import { adminRoutes, guideRoutes, touristRoutes } from "@/routes"
import { usePathname } from "next/navigation"

const sidebarRoutes: Record<UserRole, SidebarItems> = {
  ADMIN: adminRoutes,
  GUIDE: guideRoutes,
  TOURIST: touristRoutes,
}

export function AppSidebar({ role }: { role: UserRole }) {
  const pathname = usePathname()

  const routes: SidebarItems = sidebarRoutes[role] ?? []

  return (
    <Sidebar>
      <Link href="/">
        <SidebarHeader>
          <Compass className="h-6 w-6 text-primary" />
        </SidebarHeader>
      </Link>

      <SidebarContent>
        {routes.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      render={<Link href={item.url} />}
                      isActive={pathname === item.url}
                    >
                      {item.title}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  )
}