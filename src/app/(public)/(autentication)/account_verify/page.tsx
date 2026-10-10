import { Suspense } from "react"

import { Spinner } from "@/components/ui/spinner"
import { VerifyOtpForm } from "@/components/layout/registration/verify-otp-form"

export default function AccountVerifyPage() {
  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <Suspense
        fallback={
          <div className="flex justify-center">
            <Spinner className="h-8 w-8" />
          </div>
        }
      >
        <VerifyOtpForm />
      </Suspense>
    </div>
  )
}