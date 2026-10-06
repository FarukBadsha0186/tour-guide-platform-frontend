"use client"

import { useState } from "react"
import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"
import { X } from "lucide-react"
import { useUpdateGuideProfile } from "@/hooks"
import { LANGUAGE_OPTIONS } from "@/constants/guide.constants"
import type { GuideProfile } from "@/types/guide.type"

interface ProfileFormProps {
  profile: GuideProfile
  onCancel: () => void
  onSuccess: () => void
}

export function ProfileForm({
  profile,
  onCancel,
  onSuccess,
}: ProfileFormProps) {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(
    profile.languages || []
  )

  const { mutate: update, isPending } = useUpdateGuideProfile()

  const form = useForm({
    defaultValues: {
      licenseNumber: profile.licenseNumber || "",
      yearsExperience: profile.yearsExperience || 0,
      baseLocation: profile.baseLocation || "",
      bio: profile.bio || "",
      hourlyRate: profile.hourlyRate || 0,
    },
    onSubmit: ({ value }) => {
      update(
        {
          ...value,
          languages: selectedLanguages,
        },
        {
          onSuccess: () => {
            toast.success("Profile updated successfully")
            onSuccess()
          },
          onError: (err) => {
            toast.error("Update failed", {
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
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
      <FieldGroup className="gap-5">
        {/* License Number */}
        <form.Field name="licenseNumber">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid} className="gap-2">
                <FieldLabel htmlFor={field.name}>
                  License Number
                </FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="GUIDE-2024-001"
                  aria-invalid={isInvalid}
                />
                {isInvalid && (
                  <FieldError errors={field.state.meta.errors} />
                )}
              </Field>
            )
          }}
        </form.Field>

        {/* Years of Experience */}
        <form.Field name="yearsExperience">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid} className="gap-2">
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
                  aria-invalid={isInvalid}
                />
                {isInvalid && (
                  <FieldError errors={field.state.meta.errors} />
                )}
              </Field>
            )
          }}
        </form.Field>

        {/* Base Location */}
        <form.Field name="baseLocation">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid} className="gap-2">
                <FieldLabel htmlFor={field.name}>Base Location</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="Dhaka"
                  aria-invalid={isInvalid}
                />
                {isInvalid && (
                  <FieldError errors={field.state.meta.errors} />
                )}
              </Field>
            )
          }}
        </form.Field>

        {/* Hourly Rate */}
        <form.Field name="hourlyRate">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid} className="gap-2">
                <FieldLabel htmlFor={field.name}>
                  Hourly Rate (৳)
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
                  aria-invalid={isInvalid}
                />
                {isInvalid && (
                  <FieldError errors={field.state.meta.errors} />
                )}
              </Field>
            )
          }}
        </form.Field>

        {/* Languages */}
        <Field className="gap-2">
          <FieldLabel>Languages</FieldLabel>
          <FieldDescription>
            Select all languages you can communicate in
          </FieldDescription>

          {/* Selected */}
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

          {/* Options */}
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
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid} className="gap-2">
                <FieldLabel htmlFor={field.name}>Bio</FieldLabel>
                <Textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="Tell tourists about yourself, your expertise, and what makes you a great guide..."
                  rows={5}
                  aria-invalid={isInvalid}
                />
                {isInvalid && (
                  <FieldError errors={field.state.meta.errors} />
                )}
              </Field>
            )
          }}
        </form.Field>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending && <Spinner className="mr-2 h-4 w-4" />}
            Save Changes
          </Button>
        </div>
      </FieldGroup>
    </form>
  )
}