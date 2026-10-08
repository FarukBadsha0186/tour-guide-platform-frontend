"use client"

import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Spinner } from "@/components/ui/spinner"
import { useUpdateTouristProfile } from "@/hooks"
import type { TouristProfile } from "@/types/tourist.type"
import { format } from "date-fns"

interface ProfileFormProps {
  profile: TouristProfile
  onCancel: () => void
  onSuccess: () => void
}

export function ProfileForm({
  profile,
  onCancel,
  onSuccess,
}: ProfileFormProps) {
  const { mutate: update, isPending } = useUpdateTouristProfile()

  const form = useForm({
    defaultValues: {
      name: profile.user.name || "",
      contactNumber: profile.contactNumber || "",
      address: profile.address || "",
      nationality: profile.nationality || "",
      dateOfBirth: profile.dateOfBirth
        ? format(new Date(profile.dateOfBirth), "yyyy-MM-dd")
        : "",
    },
    onSubmit: ({ value }) => {
      update(value, {
        onSuccess: () => {
          toast.success("Profile updated successfully")
          onSuccess()
        },
        onError: (err) => {
          toast.error("Update failed", {
            description: err.message || "Something went wrong",
          })
        },
      })
    },
  })

  return (
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
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="John Doe"
                  aria-invalid={isInvalid}
                />
                {isInvalid && (
                  <FieldError errors={field.state.meta.errors} />
                )}
              </Field>
            )
          }}
        </form.Field>

        {/* Contact Number */}
        <form.Field name="contactNumber">
          {(field) => (
            <Field className="gap-2">
              <FieldLabel htmlFor={field.name}>Contact Number</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="+880 1XXX-XXXXXX"
              />
            </Field>
          )}
        </form.Field>

        {/* Nationality */}
        <form.Field name="nationality">
          {(field) => (
            <Field className="gap-2">
              <FieldLabel htmlFor={field.name}>Nationality</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="Bangladeshi"
              />
            </Field>
          )}
        </form.Field>

        {/* Date of Birth */}
        <form.Field name="dateOfBirth">
          {(field) => (
            <Field className="gap-2">
              <FieldLabel htmlFor={field.name}>Date of Birth</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                type="date"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />
            </Field>
          )}
        </form.Field>

        {/* Address */}
        <form.Field name="address">
          {(field) => (
            <Field className="gap-2">
              <FieldLabel htmlFor={field.name}>Address</FieldLabel>
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