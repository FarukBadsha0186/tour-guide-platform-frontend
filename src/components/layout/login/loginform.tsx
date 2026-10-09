


"use client"

import { useState } from "react"
import { Spinner } from "@/components/ui/spinner"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "@tanstack/react-form"
import { Eye, EyeClosed } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { loginValidation } from "@/validation"
import { useGoogleOAuth, useLogin } from "@/hooks"
import { GoogleLogin } from "@react-oauth/google"
import { toast } from "@/components/ui/toast"
import { UserRole } from "@/types"

const dashboardRoute: Record<UserRole, string> = {
  ADMIN: "/admin",
  GUIDE: "/guide",
  TOURIST: "/tourist_home",
}

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const { mutate: login, isPending: loginPending } = useLogin()
  const { mutate: googlelogin } = useGoogleOAuth()

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: loginValidation,
    },
    onSubmit: ({ value }) => {
      login(value, {
        onSuccess: (res: any) => {
          toast.add({
            title: "Login Successful",
            description: "Welcome back!",
            type: "success",
          })

          const role = res.data?.Role as UserRole
          const redirectPath = role ? dashboardRoute[role] : "/"
          router.push(redirectPath)
        },
        onError: (err: any) => {
          toast.add({
            title: "Login failed",
            description: err.message || "Invalid credentials",
            type: "error",
          })
        },
      })
    },
  })

  const handleGoogleSuccess = (credentialResponse: {
    credential?: string
  }) => {
    const idToken = credentialResponse.credential

    if (!idToken) {
      toast.add({
        title: "Credential not found",
        description: "Please try again",
        type: "error",
      })
      return
    }

    googlelogin(
      { idToken },
      {
        onSuccess: (res: any) => {
          toast.add({
            title: "Google Sign In Successful",
            description: "Welcome back!",
            type: "success",
          })

          const role = res.data?.Role as UserRole
          const redirectPath = role ? dashboardRoute[role] : "/"
          router.push(redirectPath)
        },
        onError: () => {
          toast.add({
            title: "Google login failed",
            description: "Something went wrong. Try again.",
            type: "error",
          })
        },
      }
    )
  }

  const handleGoogleError = () => {
    toast.add({
      title: "Google Auth failed",
      description: "Something is wrong, try again",
      type: "error",
    })
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">
          Login to your account
        </h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
      >
        <FieldGroup className="gap-5">
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
                    autoComplete="email"
                    aria-invalid={isInvalid}
                    placeholder="m@example.com"
                  />
                  {isInvalid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              )
            }}
          </form.Field>

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
                      autoComplete="current-password"
                      aria-invalid={isInvalid}
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
                  {isInvalid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              )
            }}
          </form.Field>

          <Button disabled={loginPending} type="submit" className="w-full">
            {loginPending ? (
              <>
                <Spinner /> Submitting...
              </>
            ) : (
              "Login"
            )}
          </Button>
        </FieldGroup>
      </form>

      <FieldSeparator>Or continue with</FieldSeparator>

      <div className="flex justify-center">
        <GoogleLogin
          theme="outline"
          shape="pill"
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
        />
      </div>

      <div className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-medium underline underline-offset-4 transition-colors hover:text-primary"
        >
          Register
        </Link>
      </div>
    </div>
  )
}