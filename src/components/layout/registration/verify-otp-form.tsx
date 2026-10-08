"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Spinner } from "@/components/ui/spinner"
import { REGEXP_ONLY_DIGITS } from "input-otp"
import { useVerifyAccount } from "@/hooks"

export function VerifyOtpForm() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const email = searchParams.get("email")
  const role = searchParams.get("role") || "TOURIST" // ← URL থেকে role

  const [otp, setOtp] = useState("")
  const [isInvalid, setIsInvalid] = useState(false)

  const { mutate: verify, isPending } = useVerifyAccount()

  if (!email) {
    router.push("/")
    return null
  }

  const handleVerify = () => {
    if (otp.length !== 7) {
      setIsInvalid(true)
      toast.error("Invalid OTP", {
        description: "Please enter the 7-digit code",
      })
      return
    }

    verify(
      { email, otp },
      {
        onSuccess: (res: any) => {
          setIsInvalid(false)

          if (role === "GUIDE" || res.guide) {
            toast.success("Account verified!", {
              description:
                "Now login and complete your profile. Admin will review and approve your guide account.",
              duration: 8000,
            })
          } else {
            toast.success("Account verified!", {
              description: "You can now login to your account.",
            })
          }

          setTimeout(() => {
            router.push("/login")
          }, 2000)
        },
        onError: (err: any) => {
          setIsInvalid(true)
          toast.error("Verification failed", {
            description: err.message || "Invalid OTP",
          })
        },
      }
    )
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-center text-2xl">
          Verify Your Account
        </CardTitle>
        <CardDescription className="text-center">
          We&apos;ve sent a 7-digit OTP to <strong>{email}</strong>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            handleVerify()
          }}
        >
          <FieldGroup className="gap-5">
            <Field data-invalid={isInvalid} className="gap-2">
              <FieldLabel htmlFor="otp">Enter OTP</FieldLabel>
              <InputOTP
                maxLength={7}
                value={otp}
                onChange={(value) => setOtp(value)}
                autoComplete="off"
                name="otp"
                id="otp"
                pattern={REGEXP_ONLY_DIGITS}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                  <InputOTPSlot index={6} />
                </InputOTPGroup>
              </InputOTP>
              {isInvalid && (
                <FieldError
                  errors={[{ message: "Invalid OTP. Please try again." }]}
                />
              )}
            </Field>

            <Button disabled={isPending} type="submit" className="w-full">
              {isPending ? (
                <>
                  <Spinner className="mr-2 h-4 w-4" /> Verifying...
                </>
              ) : (
                "Verify Account"
              )}
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}