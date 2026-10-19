

"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Compass, Search, Users, ArrowRight, Star, MapPin } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { HeroSlider } from "./hero-slider"
import { useSearchPublicPackages, usePublicGuides } from "@/hooks"

export function Hero() {
  const { data: packageData, isLoading: packageLoading } = useSearchPublicPackages({ limit: 1 })
  const { data: guideData, isLoading: guideLoading } = usePublicGuides({ limit: 1 })

  const featuredPackage = packageData?.data?.[0]
  const featuredGuide = guideData?.data?.[0]

  return (
    <section className="relative overflow-hidden bg-background">
      {/* Decorative blobs */}
      <div className="absolute top-10 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-30 dark:opacity-10" />
      <div className="absolute bottom-10 -right-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl opacity-30 dark:opacity-10" />

      <div className="container mx-auto px-4 py-4 md:py-6 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ===== LEFT: Text Content ===== */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card border border-primary/30 text-primary text-sm mb-6 shadow-sm">
              <Compass className="h-4 w-4" />
              <span>Explore Bangladesh with Local Experts</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-foreground">
              Discover Bangladesh{" "}
              <span className="text-primary">Through Local Eyes</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl lg:max-w-none mb-8">
              From the misty hills of Bandarban to the endless beaches of Cox's Bazar —
              experience Bangladesh with verified local guides who bring every destination to life.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link href="/packages">
                <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90">
                  <Search className="mr-2 h-5 w-5" />
                  Explore Tours
                </Button>
              </Link>
              <Link href="/guides">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-accent text-accent hover:bg-accent/10"
                >
                  <Users className="mr-2 h-5 w-5" />
                  Meet Guides
                </Button>
              </Link>
            </div>
          </div>

          {/* ===== RIGHT: Slider + Cards ===== */}
          <div className="flex flex-col gap-4">

            {/* Image Slider */}
            <HeroSlider />

           

          </div>
        </div>
      </div>
    </section>
  )
}