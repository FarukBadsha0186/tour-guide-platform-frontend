import Link from "next/link"
import { Compass } from "lucide-react"
import { GuideRegisterForm } from "@/components/layout/guide/guideRegister"

export default function GuideRegisterPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* LEFT: Image - Guide */}
      <div className="relative hidden  lg:block p-8">
        <div className="relative h-full w-full overflow-hidden rounded-2xl">
          <img
            src="/guide.jpg"
            alt="Become a Guide"
            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.6]"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent dark:from-black/85 dark:via-black/50" />
          {/* Tagline */}
          <div className="absolute inset-x-8 bottom-8 text-white">
            <p className="text-2xl font-bold">Become a Guide</p>
            <p className="mt-1 max-w-sm text-sm text-white/85">
              Share your passion for Bangladesh with travelers worldwide
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT: Form */}
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
            <GuideRegisterForm />
          </div>
        </div>
      </div>
    </div>
  )
}