"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

const SLIDES = [
  {
    id: "pahar",
    image: "/hero/pahar.jpg",
    label: "Pahar",
    sublabel: "Bandarban Hills",
  },
  {
    id: "somudro",
    image: "/hero/coxsbazar.jpg",
    label: "Somudro",
    sublabel: "Cox's Bazar",
  },
  {
    id: "heritage",
    image: "/hero/poplularplacebd.jpg",
    label: "Heritage",
    sublabel: "All Over Bangladesh",
  },
]

export function HeroSlider() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length)
    }, 4500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border">
      {SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 ease-in-out",
            index === current ? "opacity-100" : "opacity-0"
          )}
        >
          <img
            src={slide.image}
            alt={slide.sublabel}
            className="h-full w-full object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Label */}
          <div className="absolute bottom-5 left-5 text-white">
            <p className="text-xs font-medium uppercase tracking-widest opacity-80">
              {slide.label}
            </p>
            <p className="text-lg font-semibold mt-0.5">{slide.sublabel}</p>
          </div>
        </div>
      ))}

      {/* Dots Navigation */}
      <div className="absolute bottom-5 right-5 flex gap-1.5">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => setCurrent(i)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              i === current
                ? "w-6 bg-white"
                : "w-1.5 bg-white/50 hover:bg-white/80"
            )}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}