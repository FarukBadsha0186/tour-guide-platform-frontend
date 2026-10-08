"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { ReactNode } from "react"
import Link from "next/link"

interface TouristPageWrapperProps {
  children: ReactNode
  title: string
  description?: string
}

export function TouristPageWrapper({
  children,
  title,
  description,
}: TouristPageWrapperProps) {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-lg font-semibold text-emerald-700">
            Tour Guide
          </Link>
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/tourist")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          {description && (
            <p className="text-muted-foreground mt-1">{description}</p>
          )}
        </div>
        {children}
      </div>
    </div>
  )
}