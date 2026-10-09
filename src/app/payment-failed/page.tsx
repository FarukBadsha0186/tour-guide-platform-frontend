"use client"

import { useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import { XCircle, Home, RefreshCw } from "lucide-react"
import Link from "next/link"

function PaymentFailedContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const reason = searchParams.get("reason") || "failed"
  const error = searchParams.get("error")

  useEffect(() => {
    toast.error("Payment failed", {
      description:
        reason === "cancelled"
          ? "You cancelled the payment."
          : "Something went wrong. Please try again.",
    })
  }, [reason])

  return (
    <div className="flex min-h-svh items-center justify-center p-6 bg-gradient-to-br from-red-50 to-orange-50">
      <Card className="w-full max-w-md">
        <CardContent className="pt-10 pb-8 text-center space-y-6">
          <div className="flex justify-center">
            <div className="rounded-full bg-red-100 p-4">
              <XCircle className="h-16 w-16 text-red-600" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">
              Payment Failed
            </h1>
            <p className="text-muted-foreground">
              {reason === "cancelled"
                ? "You cancelled the payment."
                : "Your payment could not be completed. Please try again."}
            </p>
            {error && (
              <p className="text-xs text-destructive font-mono bg-destructive/10 p-2 rounded">
                {decodeURIComponent(error)}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <Button
              onClick={() => router.push("/tourist/bookings")}
              className="w-full"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
            <Link href="/">
              <Button variant="outline" className="w-full">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function PaymentFailedPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-svh items-center justify-center">
          <Spinner className="h-8 w-8" />
        </div>
      }
    >
      <PaymentFailedContent />
    </Suspense>
  )
}