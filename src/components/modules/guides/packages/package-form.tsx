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
  FieldDescription,
} from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { Spinner } from "@/components/ui/spinner"
import {
  useCreateGuidePackage,
  useUpdateGuidePackage,
  useGetMe,
} from "@/hooks"
import { PACKAGE_FORM_DEFAULTS } from "@/constants/guide.constants"
import type { GuidePackage } from "@/types/guide.type"

interface PackageFormProps {
  pkg?: GuidePackage
  onSuccess: () => void
  onCancel: () => void
}

export function PackageForm({ pkg, onSuccess, onCancel }: PackageFormProps) {
  const isEdit = !!pkg

  const { data: me } = useGetMe()
  const userId = me?.data?.id

  const { mutate: create, isPending: isCreating } = useCreateGuidePackage()
  const { mutate: update, isPending: isUpdating } = useUpdateGuidePackage()

  const isPending = isCreating || isUpdating

  const form = useForm({
    defaultValues: pkg
      ? {
          title: pkg.title,
          description: pkg.description,
          durationHours: pkg.durationHours,
          pricePerPerson: pkg.pricePerPerson,
          minGroupSize: pkg.minGroupSize,
          maxGroupSize: pkg.maxGroupSize,
          meetingPoint: pkg.meetingPoint || "",
        }
      : PACKAGE_FORM_DEFAULTS,
    onSubmit: ({ value }) => {
      if (isEdit && pkg) {
        update(
          { id: pkg.id, payload: value },
          {
            onSuccess: () => {
              toast.success("Package updated successfully")
              onSuccess()
            },
            onError: (err) => {
              toast.error("Update failed", {
                description: err.message || "Something went wrong",
              })
            },
          }
        )
      } else {
        if (!userId) {
          toast.error("User not found")
          return
        }

        create(
          { ...value, userId },
          {
            onSuccess: () => {
              toast.success("Package created!", {
                description: "Admin approval required before it goes live.",
              })
              onSuccess()
            },
            onError: (err) => {
              toast.error("Creation failed", {
                description: err.message || "Something went wrong",
              })
            },
          }
        )
      }
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
        {/* Title */}
        <form.Field name="title">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid} className="gap-2">
                <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="Historical Dhaka Tour"
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

        {/* Description */}
        <form.Field name="description">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid} className="gap-2">
                <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                <Textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="Explore the rich history of old Dhaka city..."
                  rows={4}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Duration */}
          <form.Field name="durationHours">
            {(field) => (
              <Field className="gap-2">
                <FieldLabel htmlFor={field.name}>
                  Duration (hours)
                </FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  type="number"
                  min={1}
                  value={field.state.value}
                  onChange={(e) =>
                    field.handleChange(Number(e.target.value))
                  }
                  onBlur={field.handleBlur}
                  required
                />
              </Field>
            )}
          </form.Field>

          {/* Price */}
          <form.Field name="pricePerPerson">
            {(field) => (
              <Field className="gap-2">
                <FieldLabel htmlFor={field.name}>
                  Price / Person (৳)
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
                  required
                />
              </Field>
            )}
          </form.Field>

          {/* Min Group */}
          <form.Field name="minGroupSize">
            {(field) => (
              <Field className="gap-2">
                <FieldLabel htmlFor={field.name}>
                  Min Group Size
                </FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  type="number"
                  min={1}
                  value={field.state.value}
                  onChange={(e) =>
                    field.handleChange(Number(e.target.value))
                  }
                  onBlur={field.handleBlur}
                  required
                />
              </Field>
            )}
          </form.Field>

          {/* Max Group */}
          <form.Field name="maxGroupSize">
            {(field) => (
              <Field className="gap-2">
                <FieldLabel htmlFor={field.name}>
                  Max Group Size
                </FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  type="number"
                  min={1}
                  value={field.state.value}
                  onChange={(e) =>
                    field.handleChange(Number(e.target.value))
                  }
                  onBlur={field.handleBlur}
                  required
                />
              </Field>
            )}
          </form.Field>
        </div>

        {/* Meeting Point */}
        <form.Field name="meetingPoint">
          {(field) => (
            <Field className="gap-2">
              <FieldLabel htmlFor={field.name}>Meeting Point</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="Shahbagh Square, Dhaka"
              />
              <FieldDescription>
                Where tourists will meet you before the tour
              </FieldDescription>
            </Field>
          )}
        </form.Field>

        {/* Info banner (create only) */}
        {!isEdit && (
          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> After submission, admin will review and
              approve your package before it becomes visible to tourists.
            </p>
          </div>
        )}

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
            {isEdit ? "Update Package" : "Create Package"}
          </Button>
        </div>
      </FieldGroup>
    </form>
  )
}