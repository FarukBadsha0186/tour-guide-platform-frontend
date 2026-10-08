"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Compass, Search } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 p-8 md:p-16 text-white">
          {/* Decorative */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative max-w-2xl mx-auto text-center">
            <Compass className="h-12 w-12 mx-auto mb-6 opacity-90" />

            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Journey?
            </h2>

            <p className="text-lg opacity-90 mb-8">
              Join thousands of travelers exploring Bangladesh with our
              verified local guides.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/login">
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full sm:w-auto bg-white text-emerald-700 hover:bg-white/90"
                >
                  Sign Up Free
                </Button>
              </Link>
              <Link href="/packages">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto bg-transparent border-white text-white hover:bg-white/10 hover:text-white"
                >
                  <Search className="mr-2 h-5 w-5" />
                  Browse Tours
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}