"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Compass, MapPin, Search, Users } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50 to-white">
      {/* Decorative blobs */}
      <div className="absolute top-20 -left-20 w-72 h-72 bg-emerald-200 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-20 -right-20 w-72 h-72 bg-teal-200 rounded-full blur-3xl opacity-30" />

      <div className="container mx-auto px-4 py-20 md:py-32 relative">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-emerald-200 text-emerald-700 text-sm mb-6 shadow-sm">
            <Compass className="h-4 w-4" />
            <span>Explore Bangladesh with Local Experts</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Discover the Beauty of{" "}
            <span className="text-emerald-600">Bangladesh</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Book authentic tours with verified local guides. From historical
            Dhaka to the beaches of Cox's Bazar — your perfect adventure starts
            here.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/packages">
              <Button size="lg" className="w-full sm:w-auto">
                <Search className="mr-2 h-5 w-5" />
                Browse Tours
              </Button>
            </Link>
            <Link href="/guides">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto"
              >
                <Users className="mr-2 h-5 w-5" />
                Meet Guides
              </Button>
            </Link>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mt-12">
            <Stat number="50+" label="Tour Packages" />
            <Stat number="30+" label="Expert Guides" />
            <Stat number="1000+" label="Happy Travelers" />
          </div>
        </div>
      </div>
    </section>
  )
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center">
      <p className="text-2xl md:text-3xl font-bold text-emerald-600">
        {number}
      </p>
      <p className="text-xs md:text-sm text-muted-foreground mt-1">{label}</p>
    </div>
  )
}