"use client"

import { useForm } from "@tanstack/react-form"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useState } from "react"
import { Eye, EyeClosed } from "lucide-react"
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
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { touristRegistrationSchema } from "@/validation"
import { useRegisterTourist } from "@/hooks"

export default function RegistrationForm() {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const { mutate: register, isPending } = useRegisterTourist()

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    validators: {
      onSubmit: touristRegistrationSchema,
    },
    onSubmit: ({ value }) => {

       const registrationData = {
        name: value.name,
        email: value.email,
        password: value.password,
      };


    register(registrationData, {
        onSuccess: (res: any) => {
          toast.success("Account created!", {
            description: "Please login to continue",
          })
        
          const params = new URLSearchParams({ email: registrationData.email });
         // router.push(`/register/verify-account?${params.toString()}`)
         router.push(`/register/verify-account?email=${res.email}&role=TOURIST`)
        },
        onError: (err) => {
          toast.error("Registration failed", {
            description: err.message || "Something went wrong",
          })
        },
      })
    },
  })

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-center text-2xl">
          Signup As Tourist
        </CardTitle>
        <CardDescription className="text-center">
          Enter your information below to create your tourist account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <FieldGroup className="gap-5">
            {/* Name */}
            <form.Field name="name">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid} className="gap-2">
                    <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="text"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      aria-invalid={isInvalid}
                      placeholder="John Doe"
                      autoComplete="name"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>

            {/* Email */}
            <form.Field name="email">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid} className="gap-2">
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="email"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      aria-invalid={isInvalid}
                      placeholder="m@example.com"
                      autoComplete="email"
                    />
                    <FieldDescription>
                      We&apos;ll use this to contact you.
                    </FieldDescription>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>

            {/* Password */}
            <form.Field name="password">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid} className="gap-2">
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <div className="relative">
                      <Input
                        id={field.name}
                        name={field.name}
                        type={showPassword ? "text" : "password"}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        aria-invalid={isInvalid}
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <EyeClosed className="size-4" />
                        ) : (
                          <Eye className="size-4" />
                        )}
                      </button>
                    </div>
                    <FieldDescription>
                      Min 8 chars, 1 uppercase, 1 lowercase, 1 number.
                    </FieldDescription>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>

            {/* Submit */}
            <Button disabled={isPending} type="submit" className="w-full">
              {isPending ? (
                <>
                  <Spinner /> Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>

            {/* Guide link */}
            <div className="text-center text-sm">
              <span className="text-muted-foreground">
                Want to become a guide?{" "}
              </span>
              <Link
                href="/register/guide"
                className="font-medium underline underline-offset-4 hover:text-primary"
              >
                Apply As Guide
              </Link>
            </div>

            {/* Login link */}
            <FieldDescription className="text-center">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium underline underline-offset-4 hover:text-primary"
              >
                Sign in
              </Link>
            </FieldDescription>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}