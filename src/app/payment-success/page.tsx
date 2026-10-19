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
    // ✅ Hardcoded gradient er bodole semantic background use kora hoyeche
    <div className="flex min-h-svh items-center justify-center p-6 bg-gradient-to-br from-primary/10 via-background to-background">
      <Card className="w-full max-w-md border-border shadow-lg">
        <CardContent className="pt-10 pb-8 text-center space-y-6">
          <div className="flex justify-center">
            {/* ✅ Hardcoded emerald er bodole primary (Emerald theme) use kora hoyeche */}
            <div className="rounded-full bg-primary/10 p-4">
              <CheckCircle2 className="h-16 w-16 text-primary" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Payment Successful!
            </h1>
            <p className="text-muted-foreground">
              Your booking has been confirmed. You&apos;ll receive a
              confirmation email shortly.
            </p>
          </div>

          {trxId && (
            <div className="rounded-lg border border-border bg-muted/30 p-3 text-sm">
              <p className="text-xs text-muted-foreground">Transaction ID</p>
              <p className="font-mono font-medium text-foreground">{trxId}</p>
            </div>
          )}

          <div className="flex flex-col gap-2 pt-2">
            <Button
              onClick={() => router.push("/tourist/bookings")}
              className="w-full bg-primary hover:bg-primary/90"
            >
              View My Bookings
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Link href="/">
              <Button variant="outline" className="w-full border-border hover:bg-muted">
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
        <div className="flex min-h-svh items-center justify-center bg-background">
          <Spinner className="h-8 w-8" />
        </div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  )
}