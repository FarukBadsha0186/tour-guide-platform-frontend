


"use client"

import { useState } from "react"
import { Spinner } from "@/components/ui/spinner"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "@tanstack/react-form"
import { useQueryClient } from "@tanstack/react-query" // ✅ Add kora hoyeche
import { Eye, EyeClosed, Shield, User, Compass } from "lucide-react"

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
  TOURIST: "/",
}

const DEMO_CREDENTIALS: Record<UserRole, { email: string; password: string }> = {
  ADMIN: { email: "testeradmin@gmail.com", password: "tester@Admin12345" },
  GUIDE: { email: "testerguide@gmail.com", password: "Tester@guide12345" },
  TOURIST: { email: "testertourist@gmail.com", password: "Tester@tourist12345" },
}

const DEMO_BUTTONS: { role: UserRole; label: string; icon: typeof Shield }[] = [
  { role: "ADMIN", label: "Admin", icon: Shield },
  { role: "TOURIST", label: "Tourist", icon: User },
  { role: "GUIDE", label: "Guide", icon: Compass },
]

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const queryClient = useQueryClient() 

  const { mutate: login, isPending: loginPending } = useLogin()
  const { mutate: googlelogin } = useGoogleOAuth()

  // ✅ Helper function for redirect & cache clearing
  const handleSuccessRedirect = (res: any, fallbackRole?: UserRole) => {
    // 1. Cache clear koro jate Navbar update hoy
    queryClient.invalidateQueries({ queryKey: ["user"] })

    // 2. Role ber koro (jodio response e thake)
    const role = (res?.data?.role || res?.data?.Role || res?.data?.user?.role || fallbackRole) as UserRole

    // 3. Redirect koro
    const redirectPath = role && dashboardRoute[role] ? dashboardRoute[role] : "/"
    
    toast.add({
      title: "Login Successful",
      description: "Welcome back!",
      type: "success",
    })
    
    router.push(redirectPath)
  }

  const form = useForm({
    defaultValues: { email: "", password: "" },
    validators: { onSubmit: loginValidation },
    onSubmit: ({ value }) => {
      const validation = loginValidation.safeParse(value)
      if (!validation.success) {
        toast.add({ title: "Validation Error", description: validation.error.issues[0].message, type: "error" })
        return
      }

      login(value, {
        onSuccess: (res: any) => handleSuccessRedirect(res),
        onError: (err: any) => {
          toast.add({
            title: "Login failed",
            description: err?.data?.message || err?.message || "Invalid credentials.",
            type: "error",
          })
        },
      })
    },
  })

  const handleDemoLogin = (role: UserRole) => {
    const creds = DEMO_CREDENTIALS[role]
    login(creds, {
      onSuccess: (res: any) => handleSuccessRedirect(res, role), // fallbackRole pathano hoyeche
      onError: (err: any) => {
        toast.add({
          title: "Demo login failed",
          description: err?.data?.message || "Demo credentials may not be seeded.",
          type: "error",
        })
      },
    })
  }

  const handleGoogleSuccess = (credentialResponse: { credential?: string }) => {
    const idToken = credentialResponse.credential
    if (!idToken) {
      toast.add({ title: "Credential not found", type: "error" })
      return
    }

    googlelogin({ idToken }, {
      onSuccess: (res: any) => handleSuccessRedirect(res),
      onError: (err: any) => {
        toast.add({
          title: "Google login failed",
          description: err?.data?.message || "Something went wrong.",
          type: "error",
        })
      },
    })
  }

  const handleGoogleError = () => {
    toast.add({ title: "Google Auth failed", description: "Something is wrong, try again", type: "error" })
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); form.handleSubmit() }}>
        <FieldGroup className="gap-5">
          <form.Field name="email">
            {(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
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
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          </form.Field>

          <form.Field name="password">
            {(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
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
                    >
                      {showPassword ? <EyeClosed className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          </form.Field>

          <Button disabled={loginPending} type="submit" className="w-full">
            {loginPending ? <><Spinner /> Submitting...</> : "Login"}
          </Button>
        </FieldGroup>
      </form>

      <FieldSeparator>Or continue with</FieldSeparator>

      <div className="flex justify-center">
        <GoogleLogin theme="outline" shape="pill" onSuccess={handleGoogleSuccess} onError={handleGoogleError} />
      </div>

      {/* DEMO LOGIN SECTION */}
      <div className="rounded-xl border border-dashed border-border bg-muted/40 p-4">
        <p className="mb-3 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          🎭 Try Demo Account
        </p>
        <div className="grid grid-cols-3 gap-2">
          {DEMO_BUTTONS.map(({ role, label, icon: Icon }) => (
            <Button
              key={role}
              type="button"
              variant="outline"
              size="sm"
              disabled={loginPending}
              onClick={() => handleDemoLogin(role)}
              className="flex flex-col gap-1 h-auto py-3 hover:border-primary hover:bg-primary/5 hover:text-primary"
            >
              <Icon className="size-4" />
              <span className="text-xs font-medium">{label}</span>
            </Button>
          ))}
        </div>
      </div>

      <div className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-medium underline underline-offset-4 hover:text-primary">
          Register
        </Link>
      </div>
    </div>
  )
}