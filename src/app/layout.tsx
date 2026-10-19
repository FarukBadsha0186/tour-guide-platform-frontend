
import type { Metadata } from "next"
import { Geist, Geist_Mono, Inter } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import Providers from "@/providers"
import GoogleAuthProvider from "@/providers/google.provders"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster as SonnerToaster } from "sonner"
import { Toaster } from "@/components/ui/toast"
import ThemeProvider from "@/providers/theme.provider"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Tour Guide Platform",
  description: "Book tours with verified local guides",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable
      )}
    >
      <body suppressHydrationWarning>
          <ThemeProvider>
        <Providers>
          <GoogleAuthProvider>
            <TooltipProvider>
              {children}
              
              <SonnerToaster position="top-right" richColors />
             
              <Toaster />
            </TooltipProvider>
          </GoogleAuthProvider>
        </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}