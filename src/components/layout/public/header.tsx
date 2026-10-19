

// // "use client"

// // import { toast } from "@/components/ui/toast"
// // import { useGetMe, useLogout } from "@/hooks"
// // import { Button } from "@base-ui/react"
// // import { useQueryClient } from "@tanstack/react-query"
// // import Link from "next/link"
// // import { useRouter } from "next/navigation"
// // import { Compass } from "lucide-react"
// // import { UserRole } from "@/types"
// // import RoleGuard from "@/components/auth/role.guard"
// // import { Badge } from "@/components/ui/badge"
// // import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"




// // export default function Header() {
// //   const routes = [
// //     { name: "Home", url: "/" },
// //      { name: "Packages", url: "/packages" },
// //       { name: "Guides", url: "/guides" },
// //   ]

// // const dashboardRoute: Record<UserRole, string> = {
    
// //     ADMIN: "/admin",
// //     TOURIST: "/tourist",
// //     GUIDE: "/guide",
// //   };




// //   const router = useRouter()
// //   const { data, isLoading } = useGetMe()
// //   const { mutate: logout } = useLogout()
// //   const queryClient = useQueryClient()

// //   const role: UserRole = !!data?.data && data?.data.role;


// //   const handleLogout = () => {
// //     logout(undefined, {
// //       onSuccess: () => {
// //         toast.add({
// //           title: "Tata",
// //           description: "Logged out successfully",
// //           type: "success",
// //         })
// //         queryClient.removeQueries({ queryKey: ["user"] })
// //       },
// //       onError: () => {
// //         toast.add({
// //           title: "Logout Failed",
// //           description: "Something went wrong",
// //           type: "error",
// //         })
// //       },
// //     })
// //   }

// //   return (
// //     <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
// //       <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
// //         {/* Logo */}
// //         <Link href="/" className="flex items-center gap-2">
// //           <Compass className="h-6 w-6 text-primary" />
// //           <span className="text-lg font-semibold tracking-tight text-foreground">
// //             Tour Guide
// //           </span>
// //         </Link>

        

// // <nav className="hidden items-center gap-8 md:flex">
// //   {routes.map((route) => (
// //     <Link
// //       key={route.url}
// //       href={route.url}
// //       className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
// //     >
// //       {route.name}
// //     </Link>
// //   ))}

// //   {role && (
// //     <Link
// //       href={dashboardRoute[role]}
// //       className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
// //     >
// //       Dashboard
// //     </Link>
// //   )}
// // </nav>

        

// //         {/* Auth */}
// //         <div className="flex items-center gap-3">
// //           {!isLoading && !data && (
// //             <>
// //               <Button
// //                 nativeButton={false}
// //                 render={<Link href="/login" />}
// //                 className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
// //               >
// //                 Login
// //               </Button>

// //               <Button
// //                 nativeButton={false}
// //                 render={<Link href="/register" />}
// //                 className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
// //               >
// //                 Sign Up
// //               </Button>
// //             </>
// //           )}

          
// //           {!isLoading && data && (
// //   <div className="flex items-center gap-3">
    

// //     {/* User Avatar + Name */}
// //     <div className="hidden sm:flex items-center gap-2">
// //       <Avatar className="h-8 w-8">
// //         <AvatarImage src={data.data?.imageUrl} alt={data.data?.name} />
// //         <AvatarFallback className="text-xs">
// //           {data.data?.name?.charAt(0)?.toUpperCase() || "U"}
// //         </AvatarFallback>
// //       </Avatar>
// //       <span className="text-sm font-medium">
// //         {data.data?.name || "User"}
// //       </span>
// //     </div>

// //     {/* Role Badge */}
// //     <Badge variant="outline" className="text-xs capitalize">
// //       {data.data?.role?.toLowerCase()}
// //     </Badge>

// //     {/* Logout Button */}
// //     <Button
// //       onClick={handleLogout}
// //       className="rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
// //     >
// //       Logout
// //     </Button>
// //   </div>
// // )}
// //         </div>
// //       </div>
// //     </header>
// //   )
// // }

// "use client"

// import { toast } from "@/components/ui/toast"
// import { useGetMe, useLogout } from "@/hooks"
// import { Button } from "@base-ui/react"
// import { useQueryClient } from "@tanstack/react-query"
// import Link from "next/link"
// import { useRouter } from "next/navigation"
// import { Compass } from "lucide-react"
// import { UserRole } from "@/types"
// import RoleGuard from "@/components/auth/role.guard"
// import { Badge } from "@/components/ui/badge"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { ThemeToggle } from "@/components/theme-toggle/theme-toggle"


// export default function Header() {
//   const routes = [
//     { name: "Home", url: "/" },
//     { name: "Packages", url: "/packages" },
//     { name: "Guides", url: "/guides" },
//   ]

//   const dashboardRoute: Record<UserRole, string> = {
//     ADMIN: "/admin",
//     TOURIST: "/tourist",
//     GUIDE: "/guide",
//   };

//   const router = useRouter()
//   const { data, isLoading } = useGetMe()
//   const { mutate: logout } = useLogout()
//   const queryClient = useQueryClient()

//   const role: UserRole = !!data?.data && data?.data.role;

//   const handleLogout = () => {
//     logout(undefined, {
//       onSuccess: () => {
//         toast.add({
//           title: "Tata",
//           description: "Logged out successfully",
//           type: "success",
//         })
//         queryClient.removeQueries({ queryKey: ["user"] })
//       },
//       onError: () => {
//         toast.add({
//           title: "Logout Failed",
//           description: "Something went wrong",
//           type: "error",
//         })
//       },
//     })
//   }

//   return (
//     <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
//       <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
//         {/* Logo */}
//         <Link href="/" className="flex items-center gap-2">
//           <Compass className="h-6 w-6 text-primary" />
//           <span className="text-lg font-semibold tracking-tight text-foreground">
//             Tour Guide
//           </span>
//         </Link>

//         <nav className="hidden items-center gap-8 md:flex">
//           {routes.map((route) => (
//             <Link
//               key={route.url}
//               href={route.url}
//               className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
//             >
//               {route.name}
//             </Link>
//           ))}

//           {role && (
//             <Link
//               href={dashboardRoute[role]}
//               className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
//             >
//               Dashboard
//             </Link>
//           )}
//         </nav>

//         {/* Auth */}
//         <div className="flex items-center gap-3">
          
//           <ThemeToggle />

//           {!isLoading && !data && (
//             <>
//               <Button
//                 nativeButton={false}
//                 render={<Link href="/login" />}
//                 className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
//               >
//                 Login
//               </Button>

//               <Button
//                 nativeButton={false}
//                 render={<Link href="/register" />}
//                 className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
//               >
//                 Sign Up
//               </Button>
//             </>
//           )}

//           {!isLoading && data && (
//             <div className="flex items-center gap-3">
//               {/* User Avatar + Name */}
//               <div className="hidden sm:flex items-center gap-2">
//                 <Avatar className="h-8 w-8">
//                   <AvatarImage src={data.data?.imageUrl} alt={data.data?.name} />
//                   <AvatarFallback className="text-xs">
//                     {data.data?.name?.charAt(0)?.toUpperCase() || "U"}
//                   </AvatarFallback>
//                 </Avatar>
//                 <span className="text-sm font-medium">
//                   {data.data?.name || "User"}
//                 </span>
//               </div>

//               {/* Role Badge */}
//               <Badge variant="outline" className="text-xs capitalize">
//                 {data.data?.role?.toLowerCase()}
//               </Badge>

//               {/* Logout Button */}
//               <Button
//                 onClick={handleLogout}
//                 className="rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
//               >
//                 Logout
//               </Button>
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   )
// }


// "use client"

// import { toast } from "@/components/ui/toast"
// import { useGetMe, useLogout } from "@/hooks"
// import { useQueryClient } from "@tanstack/react-query"
// import Link from "next/link"
// import { useRouter, usePathname } from "next/navigation"
// import { Compass, Menu, User, LogOut, LayoutDashboard, BookOpen } from "lucide-react"
// import { UserRole } from "@/types"
// import { Badge } from "@/components/ui/badge"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { ThemeToggle } from "@/components/theme-toggle/theme-toggle"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet"

// export default function Header() {
//   const publicRoutes = [
//     { name: "Home", url: "/" },
//     { name: "Packages", url: "/packages" },
//     { name: "Guides", url: "/guides" },
//     { name: "About", url: "/about" },
//     { name: "Contact", url: "/contact" },
//   ]

//   const dashboardRoute: Record<UserRole, string> = {
//     ADMIN: "/admin",
//     TOURIST: "/tourist",
//     GUIDE: "/guide",
//   }

//   const router = useRouter()
//   const pathname = usePathname()
//   const { data, isLoading } = useGetMe()
//   const { mutate: logout } = useLogout()
//   const queryClient = useQueryClient()

//   const role: UserRole = !!data?.data && data?.data.role
//   const isLoggedIn = !isLoading && !!data

//   const handleLogout = () => {
//     logout(undefined, {
//       onSuccess: () => {
//         toast.add({
//           title: "Tata",
//           description: "Logged out successfully",
//           type: "success",
//         })
//         queryClient.removeQueries({ queryKey: ["user"] })
//         router.push("/")
//       },
//       onError: () => {
//         toast.add({
//           title: "Logout Failed",
//           description: "Something went wrong",
//           type: "error",
//         })
//       },
//     })
//   }

//   const isActive = (url: string) => {
//     if (url === "/") return pathname === "/"
//     return pathname.startsWith(url)
//   }

//   return (
//     <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
//       <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

//         {/* LOGO */}
//         <Link href="/" className="flex items-center gap-2">
//           <Compass className="h-6 w-6 text-primary" />
//           <span className="text-lg font-semibold tracking-tight text-foreground">
//             Tour Guide
//           </span>
//         </Link>

//         {/* DESKTOP NAVIGATION */}
//         <nav className="hidden items-center gap-8 md:flex">
//           {publicRoutes.map((route) => (
//             <Link
//               key={route.url}
//               href={route.url}
//               className={`text-sm font-medium transition-colors ${
//                 isActive(route.url)
//                   ? "text-primary"
//                   : "text-muted-foreground hover:text-foreground"
//               }`}
//             >
//               {route.name}
//             </Link>
//           ))}

//           {role && (
//             <Link
//               href={dashboardRoute[role]}
//               className={`text-sm font-medium transition-colors ${
//                 pathname.startsWith(dashboardRoute[role])
//                   ? "text-primary"
//                   : "text-muted-foreground hover:text-foreground"
//               }`}
//             >
//               Dashboard
//             </Link>
//           )}
//         </nav>

//         {/* RIGHT SECTION */}
//         <div className="flex items-center gap-3">

//           <ThemeToggle />

//           {/* LOGGED OUT */}
//           {!isLoggedIn && (
//             <div className="hidden items-center gap-3 md:flex">
//               <Link
//                 href="/login"
//                 className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
//               >
//                 Login
//               </Link>

//               <Link
//                 href="/register"
//                 className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
//               >
//                 Sign Up
//               </Link>
//             </div>
//           )}

//           {/* LOGGED IN: PROFILE DROPDOWN */}
//           {isLoggedIn && (
//             <DropdownMenu>
//               <DropdownMenuTrigger
//                 render={
//                   <button
//                     type="button"
//                     className="flex items-center gap-2 rounded-full outline-none ring-primary focus-visible:ring-2"
//                   >
//                     <Avatar className="h-9 w-9 border border-border">
//                       <AvatarImage
//                         src={data.data?.imageUrl}
//                         alt={data.data?.name}
//                       />
//                       <AvatarFallback className="text-xs bg-primary/10 text-primary">
//                         {data.data?.name?.charAt(0)?.toUpperCase() || "U"}
//                       </AvatarFallback>
//                     </Avatar>
//                   </button>
//                 }
//               />

//               <DropdownMenuContent align="end" className="w-56">
//                 {/* <DropdownMenuLabel>
//                   <div className="flex flex-col space-y-1">
//                     <p className="text-sm font-medium leading-none text-foreground">
//                       {data.data?.name || "User"}
//                     </p>
//                     <p className="text-xs leading-none text-muted-foreground">
//                       {data.data?.email}
//                     </p>
//                     <Badge variant="outline" className="mt-1 w-fit text-[10px] capitalize">
//                       {data.data?.role?.toLowerCase()}
//                     </Badge>
//                   </div>
//                 </DropdownMenuLabel> */}

//                 <div className="flex flex-col space-y-1 px-2 py-1.5">
//   <p className="text-sm font-medium leading-none text-foreground">
//     {data.data?.name || "User"}
//   </p>
//   <p className="text-xs leading-none text-muted-foreground">
//     {data.data?.email}
//   </p>
//   <Badge variant="outline" className="mt-1 w-fit text-[10px] capitalize">
//     {data.data?.role?.toLowerCase()}
//   </Badge>
// </div>

//                 <DropdownMenuSeparator />

//                 <DropdownMenuItem
//                   render={
//                     <Link href={`${dashboardRoute[role]}/profile`}>
//                       <User className="mr-2 h-4 w-4" />
//                       Profile
//                     </Link>
//                   }
//                 />

//                 {role && (
//                   <DropdownMenuItem
//                     render={
//                       <Link href={dashboardRoute[role]}>
//                         <LayoutDashboard className="mr-2 h-4 w-4" />
//                         Dashboard
//                       </Link>
//                     }
//                   />
//                 )}

//                 {role === "TOURIST" && (
//                   <DropdownMenuItem
//                     render={
//                       <Link href="/tourist/bookings">
//                         <BookOpen className="mr-2 h-4 w-4" />
//                         My Bookings
//                       </Link>
//                     }
//                   />
//                 )}

//                 <DropdownMenuSeparator />

//                 <DropdownMenuItem
//                   onClick={handleLogout}
//                   className="cursor-pointer text-destructive focus:text-destructive"
//                 >
//                   <LogOut className="mr-2 h-4 w-4" />
//                   Logout
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           )}

//           {/* MOBILE MENU */}
//           <Sheet>
//             <SheetTrigger
//               render={
//                 <button
//                   type="button"
//                   className="md:hidden rounded-md p-2 text-foreground hover:bg-muted"
//                 >
//                   <Menu className="h-5 w-5" />
//                 </button>
//               }
//             />

//             <SheetContent side="right" className="w-[300px] sm:w-[400px]">
//               <SheetHeader>
//                 <SheetTitle className="flex items-center gap-2">
//                   <Compass className="h-5 w-5 text-primary" />
//                   Tour Guide
//                 </SheetTitle>
//               </SheetHeader>

//               <div className="mt-6 flex flex-col gap-4">
//                 <nav className="flex flex-col gap-2">
//                   {publicRoutes.map((route) => (
//                     <Link
//                       key={route.url}
//                       href={route.url}
//                       className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
//                         isActive(route.url)
//                           ? "bg-primary/10 text-primary"
//                           : "text-foreground hover:bg-muted"
//                       }`}
//                     >
//                       {route.name}
//                     </Link>
//                   ))}

//                   {role && (
//                     <Link
//                       href={dashboardRoute[role]}
//                       className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
//                     >
//                       Dashboard
//                     </Link>
//                   )}
//                 </nav>

//                 <div className="border-t border-border" />

//                 {isLoggedIn && (
//                   <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
//                     <Avatar className="h-10 w-10">
//                       <AvatarImage src={data.data?.imageUrl} alt={data.data?.name} />
//                       <AvatarFallback className="bg-primary/10 text-primary">
//                         {data.data?.name?.charAt(0)?.toUpperCase() || "U"}
//                       </AvatarFallback>
//                     </Avatar>
//                     <div className="flex-1 min-w-0">
//                       <p className="text-sm font-medium truncate text-foreground">
//                         {data.data?.name || "User"}
//                       </p>
//                       <p className="text-xs text-muted-foreground capitalize">
//                         {data.data?.role?.toLowerCase()}
//                       </p>
//                     </div>
//                   </div>
//                 )}

//                 {!isLoggedIn ? (
//                   <div className="flex flex-col gap-2">
//                     <Link
//                       href="/login"
//                       className="w-full rounded-md border border-border bg-background px-4 py-2 text-center text-sm font-medium text-foreground hover:bg-muted"
//                     >
//                       Login
//                     </Link>
//                     <Link
//                       href="/register"
//                       className="w-full rounded-md bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground hover:bg-primary/90"
//                     >
//                       Sign Up
//                     </Link>
//                   </div>
//                 ) : (
//                   <button
//                     type="button"
//                     onClick={handleLogout}
//                     className="w-full rounded-md border border-destructive bg-transparent px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 flex items-center justify-center"
//                   >
//                     <LogOut className="mr-2 h-4 w-4" />
//                     Logout
//                   </button>
//                 )}
//               </div>
//             </SheetContent>
//           </Sheet>
//         </div>
//       </div>
//     </header>
//   )
// }


"use client"

import { toast } from "@/components/ui/toast"
import { useGetMe, useLogout } from "@/hooks"
import { useQueryClient } from "@tanstack/react-query"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Compass, Menu, User, LogOut, LayoutDashboard, BookOpen } from "lucide-react"
import { UserRole } from "@/types"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/theme-toggle/theme-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function Header() {
  const publicRoutes = [
    { name: "Home", url: "/" },
    { name: "Packages", url: "/packages" },
    { name: "Guides", url: "/guides" },
    { name: "About", url: "/about" },
    { name: "Contact", url: "/contact" },
  ]

  const dashboardRoute: Record<UserRole, string> = {
    ADMIN: "/admin",
    TOURIST: "/tourist", 
    GUIDE: "/guide",
  }

  const router = useRouter()
  const pathname = usePathname()
  const { data, isLoading } = useGetMe()
  const { mutate: logout } = useLogout()
  const queryClient = useQueryClient()

  const role: UserRole | undefined = data?.data?.role
  const isLoggedIn = !isLoading && !!data?.data

  // ✅ Logic: Public routes dekhabe jodi logged out hoy, ba role TOURIST hoy
  const showPublicRoutes = !isLoggedIn || role === "TOURIST"

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        toast.add({
          title: "Logged out",
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

  const isActive = (url: string) => {
    if (url === "/") return pathname === "/"
    return pathname.startsWith(url)
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

        {/* Desktop Navigation - Conditionally Render */}
        {showPublicRoutes && (
          <nav className="hidden items-center gap-8 md:flex">
            {publicRoutes.map((route) => (
              <Link
                key={route.url}
                href={route.url}
                className={`text-sm font-medium transition-colors ${
                  isActive(route.url)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {route.name}
              </Link>
            ))}

            {/* Tourist der jonno Dashboard link */}
            {role === "TOURIST" && (
              <Link
                href={dashboardRoute[role]}
                className={`text-sm font-medium transition-colors ${
                  pathname.startsWith(dashboardRoute[role])
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Dashboard
              </Link>
            )}
          </nav>
        )}

        {/* Right Section */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {/* Logged Out Buttons */}
          {!isLoggedIn && (
            <div className="hidden items-center gap-3 md:flex">
              <Link
                href="/login"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* Logged In Profile Dropdown */}
          {isLoggedIn && (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <button
                    type="button"
                    className="flex items-center gap-2 rounded-full outline-none ring-primary focus-visible:ring-2"
                  >
                    <Avatar className="h-9 w-9 border border-border">
                      <AvatarImage src={data.data?.imageUrl} alt={data.data?.name} />
                      <AvatarFallback className="text-xs bg-primary/10 text-primary">
                        {data.data?.name?.charAt(0)?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                }
              />

              <DropdownMenuContent align="end" className="w-56">
              
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none text-foreground">
                      {data.data?.name || "User"}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {data.data?.email}
                    </p>
                    <Badge variant="outline" className="mt-1 w-fit text-[10px] capitalize">
                      {role?.toLowerCase()}
                    </Badge>
                  </div>
                

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  render={
                    <Link href={`${dashboardRoute[role as UserRole]}/profile`}>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  }
                />

                <DropdownMenuItem
                  render={
                    <Link href={dashboardRoute[role as UserRole]}>
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  }
                />

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer text-destructive focus:text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger
              render={
                <button
                  type="button"
                  className="md:hidden rounded-md p-2 text-foreground hover:bg-muted"
                >
                  <Menu className="h-5 w-5" />
                </button>
              }
            />
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Compass className="h-5 w-5 text-primary" />
                  Tour Guide
                </SheetTitle>
              </SheetHeader>

              <div className="mt-6 flex flex-col gap-4">
                {/* Mobile Navigation - Public Routes Conditionally */}
                {showPublicRoutes && (
                  <nav className="flex flex-col gap-2">
                    {publicRoutes.map((route) => (
                      <Link
                        key={route.url}
                        href={route.url}
                        className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                          isActive(route.url)
                            ? "bg-primary/10 text-primary"
                            : "text-foreground hover:bg-muted"
                        }`}
                      >
                        {route.name}
                      </Link>
                    ))}
                    
                    {role === "TOURIST" && (
                       <Link
                        href={dashboardRoute[role]}
                        className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
                      >
                        Dashboard
                      </Link>
                    )}
                  </nav>
                )}

                <div className="border-t border-border" />

                {/* Mobile Logged In Info */}
                {isLoggedIn && (
                  <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={data.data?.imageUrl} alt={data.data?.name} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {data.data?.name?.charAt(0)?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate text-foreground">
                        {data.data?.name || "User"}
                      </p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {role?.toLowerCase()}
                      </p>
                    </div>
                  </div>
                )}

                {/* Mobile Auth Buttons / Logout */}
                {!isLoggedIn ? (
                  <div className="flex flex-col gap-2">
                    <Link
                      href="/login"
                      className="w-full rounded-md border border-border bg-background px-4 py-2 text-center text-sm font-medium text-foreground hover:bg-muted"
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className="w-full rounded-md bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground hover:bg-primary/90"
                    >
                      Sign Up
                    </Link>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full rounded-md border border-destructive bg-transparent px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 flex items-center justify-center"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}