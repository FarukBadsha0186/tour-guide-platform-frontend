"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { PublicGuideCard } from "../guides/public-guide-card"
import { usePublicGuides } from "@/hooks"
import { ArrowRight } from "lucide-react"

export function FeaturedGuides() {
  const { data, isLoading } = usePublicGuides({ limit: 3 })

  const guides = data?.data || []

  if (isLoading) {
    return (
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 flex justify-center">
          <Spinner className="h-8 w-8" />
        </div>
      </section>
    )
  }

  if (guides.length === 0) {
    return null
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
              Meet Our Guides
            </h2>
            <p className="text-muted-foreground">
              Local experts passionate about sharing their knowledge
            </p>
          </div>
          <Link href="/guides">
            <Button variant="ghost" className="hidden sm:flex">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide) => (
            <PublicGuideCard key={guide.id} guide={guide} />
          ))}
        </div>

        <div className="text-center mt-8 sm:hidden">
          <Link href="/guides">
            <Button variant="outline">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}