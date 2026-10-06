
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ReactNode } from "react"
import { AppSidebar } from "./app.sidebar"
import { UserRole } from "@/types"

export default function DashBoardShell({children, role }:{children:ReactNode , role :UserRole}) {
  return (
    <SidebarProvider>
      <AppSidebar  role={role}  />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          
        </header>
      {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
