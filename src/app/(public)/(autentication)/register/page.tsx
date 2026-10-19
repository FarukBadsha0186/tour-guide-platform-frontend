


import Registration from "@/components/layout/registration/registration"
import Link from "next/link"
import { Compass } from "lucide-react"

export default function RegisterPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Compass className="size-5" />
            </div>
            <span className="font-semibold">Tour Guide</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md">
            <Registration />
          </div>
        </div>
      </div>

     
      <div className="relative hidden lg:block">
        <img
          src="explorebangladesh.jpg"
          alt="Discover Bangladesh"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent dark:from-black/80 dark:via-black/40" />
        {/* Tagline */}
        <div className="absolute bottom-8 left-8 right-8 text-white">
          <p className="text-2xl font-bold">Discover Bangladesh</p>
          <p className="text-sm text-white/80 mt-1">
            Through local eyes and unforgettable journeys
          </p>
        </div>
      </div>

      
    </div>
  )
}