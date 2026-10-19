

import LoginForm from "@/components/layout/login/loginform"
import Link from "next/link"
import { Compass } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="relative flex min-h-svh items-center justify-center overflow-hidden">
      {/* Background Image */}
      <img
        src="/tourist_login.jpg"
        alt="Tour Guide"
        className="absolute inset-0 h-full w-full object-contain object-cover"
      />

      {/* Overlay - Light/Dark mode aware */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/40 to-black/60 dark:from-black/80 dark:via-black/70 dark:to-black/90" />

      {/* Centered Glass Card */}
      <div className="relative z-10 w-full max-w-md px-4 py-8">
        {/* Logo */}
        <Link
          href="/"
          className="mb-6 flex items-center justify-center gap-2 text-white"
        >
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Compass className="size-5" />
          </div>
          <span className="text-lg font-semibold tracking-tight">
            Tour Guide
          </span>
        </Link>

        {/* Glassmorphism Card */}
        <div className="rounded-2xl border border-white/20 bg-white/90 p-6 shadow-2xl backdrop-blur-xl sm:p-8 dark:border-white/10 dark:bg-black/60">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
