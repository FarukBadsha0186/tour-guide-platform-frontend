"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { PublicPackageCard } from "../packages/public-package-card"
import { useSearchPublicPackages } from "@/hooks"
import { ArrowRight } from "lucide-react"

export function FeaturedPackages() {
  const { data, isLoading } = useSearchPublicPackages({
    limit: 6,
    sortBy: "createdAt",
    sortOrder: "desc",
  })

  const packages = data?.data || []

  if (isLoading) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4 flex justify-center">
          <Spinner className="h-8 w-8" />
        </div>
      </section>
    )
  }

  if (packages.length === 0) {
    return null
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
              Featured Tours
            </h2>
            <p className="text-muted-foreground">
              Handpicked experiences from our top guides
            </p>
          </div>
          <Link href="/packages">
            <Button variant="ghost" className="hidden sm:flex">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <PublicPackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>

        <div className="text-center mt-8 sm:hidden">
          <Link href="/packages">
            <Button variant="outline">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}