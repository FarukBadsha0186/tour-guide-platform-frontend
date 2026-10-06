

"use client"

import { toast } from "@/components/ui/toast"
import { useGetMe, useLogout } from "@/hooks"
import { Button } from "@base-ui/react"
import { useQueryClient } from "@tanstack/react-query"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Compass } from "lucide-react"
import { UserRole } from "@/types"
import RoleGuard from "@/components/auth/role.guard"




export default function Header() {
  const routes = [
    { name: "Home", url: "/" },
    { name: "About", url: "/about-us" },
  ]

const dashboardRoute: Record<UserRole, string> = {
    
    ADMIN: "/admin",
    TOURIST: "/tourist",
    GUIDE: "/guide",
  };




  const router = useRouter()
  const { data, isLoading } = useGetMe()
  const { mutate: logout } = useLogout()
  const queryClient = useQueryClient()

  const role: UserRole = !!data?.data && data?.data.role;


  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        toast.add({
          title: "Tata",
          description: "Logged out successfully",
          type: "success",
        })
        queryClient.removeQueries({ queryKey: ["user"] })
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
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Compass className="h-6 w-6 text-primary" />
          <span className="text-lg font-semibold tracking-tight text-foreground">
            Tour Guide
          </span>
        </Link>

        {/* Nav */}
        {/* <nav className="hidden items-center gap-8 md:flex">
          {routes.map((route) => (
            <Link
              key={route.url}
              href={route.url}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {route.name}

            {role && <Link href={dashboardRoute[role]}>Dashboard</Link>}
            </Link>
          ))}
        </nav> */}

<nav className="hidden items-center gap-8 md:flex">
  {routes.map((route) => (
    <Link
      key={route.url}
      href={route.url}
      className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
    >
      {route.name}
    </Link>
  ))}

  {role && (
    <Link
      href={dashboardRoute[role]}
      className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
    >
      Dashboard
    </Link>
  )}
</nav>

        

        {/* Auth */}
        <div className="flex items-center gap-3">
          {!isLoading && !data && (
            <>
              <Button
                nativeButton={false}
                render={<Link href="/login" />}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Login
              </Button>

              <Button
                nativeButton={false}
                render={<Link href="/register" />}
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Sign Up
              </Button>
            </>
          )}

          {!isLoading && data && (
            <Button
              onClick={handleLogout}
              className="rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              Logout
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}