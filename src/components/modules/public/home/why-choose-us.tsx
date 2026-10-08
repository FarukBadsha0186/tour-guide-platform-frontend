"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ShieldCheck, Award, Wallet, Headphones } from "lucide-react"

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Verified Guides",
    description:
      "Every guide is background-checked and approved by our admin team.",
    color: "text-emerald-600",
    bg: "bg-emerald-100",
  },
  {
    icon: Award,
    title: "Authentic Experiences",
    description:
      "Local guides who know the hidden gems and untold stories.",
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    icon: Wallet,
    title: "Secure Payments",
    description:
      "Pay safely via bKash. Money is held securely until your tour ends.",
    color: "text-purple-600",
    bg: "bg-purple-100",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description:
      "Our support team is always ready to help you before, during, and after.",
    color: "text-orange-600",
    bg: "bg-orange-100",
  },
]

export function WhyChooseUs() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            Why Choose Us?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We make your travel experience safe, authentic, and unforgettable.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature) => {
            const Icon = feature.icon
            return (
              <Card
                key={feature.title}
                className="hover:shadow-md transition-shadow border-0 bg-white"
              >
                <CardContent className="pt-6">
                  <div
                    className={`w-12 h-12 rounded-full ${feature.bg} flex items-center justify-center mb-4`}
                  >
                    <Icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}