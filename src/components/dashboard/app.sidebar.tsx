

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
// import { SidebarItems } from "@/types/sidebar"
// import Link from "next/link"
// import { adminRoutes, guideRoutes, touristRoutes } from "@/routes"
// import { usePathname } from "next/navigation"

// const sidebarRoutes: Record<UserRole, SidebarItems> = {
//   ADMIN: adminRoutes,
//   GUIDE: guideRoutes,
//   TOURIST: touristRoutes,
// }

// export function AppSidebar({ role }: { role: UserRole }) {
//   const pathname = usePathname()

//   const routes: SidebarItems = sidebarRoutes[role] ?? []

//   return (
//     <Sidebar>
//       <Link href="/">
//         <SidebarHeader>
//           <Compass className="h-6 w-6 text-primary" />
//         </SidebarHeader>
//       </Link>

//       <SidebarContent>
//         {routes.map((group) => (
//           <SidebarGroup key={group.title}>
//             <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
//             <SidebarGroupContent>
//               <SidebarMenu>
//                 {group.items.map((item) => (
//                   <SidebarMenuItem key={item.title}>
//                     <SidebarMenuButton
//                       render={<Link href={item.url} />}
//                       isActive={pathname === item.url}
//                     >
//                       {item.title}
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
  SidebarFooter,          // ← নতুন
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  Compass,
  LogOut,
} from "lucide-react"
import { UserRole } from "@/types"
import { SidebarItems } from "@/types/sidebar"
import Link from "next/link"
import { adminRoutes, guideRoutes, touristRoutes } from "@/routes"
import { usePathname, useRouter } from "next/navigation"
import { useLogout } from "@/hooks"
import { toast } from "@/components/ui/toast"
import { useQueryClient } from "@tanstack/react-query"

const sidebarRoutes: Record<UserRole, SidebarItems> = {
  ADMIN: adminRoutes,
  GUIDE: guideRoutes,
  TOURIST: touristRoutes,
}

export function AppSidebar({ role }: { role: UserRole }) {
  const pathname = usePathname()
  const router = useRouter()
  const queryClient = useQueryClient()

  const { mutate: logout, isPending: isLoggingOut } = useLogout()

  const routes: SidebarItems = sidebarRoutes[role] ?? []

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        toast.add({
          title: "Tata",
          description: "Logged out successfully",
          type: "success",
        })
        queryClient.removeQueries({ queryKey: ["user"] })
        router.push("/")
      },
      onError: () => {
        toast.add({
          title: "Logout Failed",
          description: "Something went wrong",
          type: "error",
        })
      },
    })
  }

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

      {/* Logout button — সব role এ */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <LogOut className="h-4 w-4" />
              <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}