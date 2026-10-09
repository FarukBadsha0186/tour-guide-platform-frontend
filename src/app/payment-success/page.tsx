"use client"

import { useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import { CheckCircle2, Home, ArrowRight } from "lucide-react"
import Link from "next/link"

function PaymentSuccessContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const bookingId = searchParams.get("bookingId")
  const trxId = searchParams.get("trxId")

  useEffect(() => {
    toast.success("Payment successful!", {
      description: "Your booking is confirmed.",
      duration: 5000,
    })
  }, [])

  return (
    <div className="flex min-h-svh items-center justify-center p-6 bg-gradient-to-br from-emerald-50 to-teal-50">
      <Card className="w-full max-w-md">
        <CardContent className="pt-10 pb-8 text-center space-y-6">
          <div className="flex justify-center">
            <div className="rounded-full bg-emerald-100 p-4">
              <CheckCircle2 className="h-16 w-16 text-emerald-600" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">
              Payment Successful!
            </h1>
            <p className="text-muted-foreground">
              Your booking has been confirmed. You&apos;ll receive a
              confirmation email shortly.
            </p>
          </div>

          {trxId && (
            <div className="rounded-lg border bg-muted/30 p-3 text-sm">
              <p className="text-xs text-muted-foreground">Transaction ID</p>
              <p className="font-mono font-medium">{trxId}</p>
            </div>
          )}

          <div className="flex flex-col gap-2 pt-2">
            <Button
              onClick={() => router.push("/tourist/bookings")}
              className="w-full"
            >
              View My Bookings
              <ArrowRight className="ml-2 h-4 w-4" />
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

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-svh items-center justify-center">
          <Spinner className="h-8 w-8" />
        </div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  )
}