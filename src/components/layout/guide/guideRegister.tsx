"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "@tanstack/react-form"
import Link from "next/link"
import { toast } from "sonner"
import { Eye, EyeClosed, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
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
import { Spinner } from "@/components/ui/spinner"
import { useRegisterGuide } from "@/hooks"
import { LANGUAGE_OPTIONS } from "@/constants/guide.constants"
import { X } from "lucide-react"

export function GuideRegisterForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])

  const { mutate: register, isPending } = useRegisterGuide()

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      licenseNumber: "",
      yearsExperience: 0,
      baseLocation: "",
      bio: "",
      hourlyRate: 0,
    },
    onSubmit: ({ value }) => {
      register(
        {
          name: value.name,
          email: value.email,
          password: value.password,
          guide: {
            licenseNumber: value.licenseNumber || undefined,
            yearsExperience: value.yearsExperience || 0,
            languages: selectedLanguages,
            baseLocation: value.baseLocation || undefined,
            bio: value.bio || undefined,
            hourlyRate: value.hourlyRate || null,
          },
        },
        {
          onSuccess: (res: any) => {
            toast.success("OTP sent to your email!", {
              description: "Please check your email and verify.",
            })
           // router.push(`/register/verify-account?email=${res.email}`)
           router.push(`/register/verify-account?email=${res.email}&role=GUIDE`)
          },
          onError: (err: any) => {
            toast.error("Registration failed", {
              description: err.message || "Something went wrong",
            })
          },
        }
      )
    },
  })

  const toggleLanguage = (lang: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(lang)
        ? prev.filter((l) => l !== lang)
        : [...prev, lang]
    )
  }

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="text-center text-2xl">
          Apply As Guide
        </CardTitle>
        <CardDescription className="text-center">
          Register as a guide. Admin approval required after registration.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {/* Info banner */}
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 mb-6 flex gap-2">
          <Info className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
          <p className="text-xs text-blue-800">
            After registration & OTP verification, you'll need to login and
            complete your profile. Admin will then review and approve your
            guide account.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <FieldGroup className="gap-4">
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
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      placeholder="John Doe"
                      aria-invalid={isInvalid}
                      required
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
                      placeholder="m@example.com"
                      aria-invalid={isInvalid}
                      required
                    />
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
                        autoComplete="new-password"
                        aria-invalid={isInvalid}
                        required
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

            {/* License Number */}
            <form.Field name="licenseNumber">
              {(field) => (
                <Field className="gap-2">
                  <FieldLabel htmlFor={field.name}>
                    License Number (Optional)
                  </FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="GUIDE-2024-001"
                  />
                  <FieldDescription>
                    You can add this later from your profile
                  </FieldDescription>
                </Field>
              )}
            </form.Field>

            {/* Years of Experience */}
            <form.Field name="yearsExperience">
              {(field) => (
                <Field className="gap-2">
                  <FieldLabel htmlFor={field.name}>
                    Years of Experience
                  </FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="number"
                    min={0}
                    value={field.state.value}
                    onChange={(e) =>
                      field.handleChange(Number(e.target.value))
                    }
                    onBlur={field.handleBlur}
                  />
                </Field>
              )}
            </form.Field>

            {/* Base Location */}
            <form.Field name="baseLocation">
              {(field) => (
                <Field className="gap-2">
                  <FieldLabel htmlFor={field.name}>Base Location</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="Dhaka, Bangladesh"
                  />
                </Field>
              )}
            </form.Field>

            {/* Languages */}
            <Field className="gap-2">
              <FieldLabel>Languages</FieldLabel>
              <FieldDescription>
                Select languages you can communicate in
              </FieldDescription>

              {selectedLanguages.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {selectedLanguages.map((lang) => (
                    <Badge
                      key={lang}
                      variant="secondary"
                      className="gap-1 pr-1 cursor-pointer"
                      onClick={() => toggleLanguage(lang)}
                    >
                      {lang}
                      <X className="h-3 w-3" />
                    </Badge>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {LANGUAGE_OPTIONS.filter(
                  (l) => !selectedLanguages.includes(l)
                ).map((lang) => (
                  <Badge
                    key={lang}
                    variant="outline"
                    className="cursor-pointer hover:bg-muted"
                    onClick={() => toggleLanguage(lang)}
                  >
                    + {lang}
                  </Badge>
                ))}
              </div>
            </Field>

            {/* Bio */}
            <form.Field name="bio">
              {(field) => (
                <Field className="gap-2">
                  <FieldLabel htmlFor={field.name}>Bio (Optional)</FieldLabel>
                  <Textarea
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="Tell tourists about yourself..."
                    rows={3}
                  />
                </Field>
              )}
            </form.Field>

            {/* Hourly Rate */}
            <form.Field name="hourlyRate">
              {(field) => (
                <Field className="gap-2">
                  <FieldLabel htmlFor={field.name}>
                    Hourly Rate (৳) - Optional
                  </FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="number"
                    min={0}
                    value={field.state.value}
                    onChange={(e) =>
                      field.handleChange(Number(e.target.value))
                    }
                    onBlur={field.handleBlur}
                  />
                </Field>
              )}
            </form.Field>

            {/* Submit */}
            <Button disabled={isPending} type="submit" className="w-full">
              {isPending ? (
                <>
                  <Spinner className="mr-2 h-4 w-4" /> Sending OTP...
                </>
              ) : (
                "Send OTP"
              )}
            </Button>

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