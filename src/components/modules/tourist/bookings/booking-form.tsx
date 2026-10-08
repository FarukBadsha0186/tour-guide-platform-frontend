
"use client"

import { useState } from "react"
import { useForm } from "@tanstack/react-form"
import { format } from "date-fns"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Spinner } from "@/components/ui/spinner"
import { Calendar } from "lucide-react"
import {
  useCreateBooking,
  useInitializePayment,
  useGetMe,
} from "@/hooks"
import { cn } from "@/lib/utils"
import type {
  TouristAvailability,
  TouristPackage,
} from "@/types/tourist.type"

interface BookingFormProps {
  pkg: TouristPackage
  availableSlots: TouristAvailability[]
  onCancel: () => void
}

export function BookingForm({
  pkg,
  availableSlots,
  onCancel,
}: BookingFormProps) {
  const [selectedSlotId, setSelectedSlotId] = useState<string>("")

  const { data: me } = useGetMe()
  const userId = me?.data?.id

  const { mutateAsync: createBooking } = useCreateBooking()
  const { mutate: initPayment, isPending } = useInitializePayment()

  const selectedSlot = availableSlots.find((s) => s.id === selectedSlotId)

  const form = useForm({
    defaultValues: {
      numberOfPeople: pkg.minGroupSize || 1,
      specialRequests: "",
    },
    onSubmit: async ({ value }) => {
      if (!selectedSlot) {
        toast.error("Please select a date")
        return
      }

      if (!userId) {
        toast.error("User not found. Please login again.")
        return
      }

      if (
        value.numberOfPeople < pkg.minGroupSize ||
        value.numberOfPeople > pkg.maxGroupSize
      ) {
        toast.error(
          `Group size must be between ${pkg.minGroupSize} and ${pkg.maxGroupSize}`
        )
        return
      }

      try {
        // Step 1: Create booking
        const bookingRes = await createBooking({
          packageId: pkg.id,
          tourDate: selectedSlot.date,
          numberOfPeople: value.numberOfPeople,
          specialRequests: value.specialRequests || undefined,
        })

        // Step 2: Initialize payment
        initPayment(
          {
            packageId: pkg.id,
            userId,
            numberOfPeople: value.numberOfPeople,
            tourDate: selectedSlot.date,
            specialRequests: value.specialRequests || undefined,
          },
          {
            onSuccess: (paymentRes) => {
              toast.success("Redirecting to bKash...")
              window.location.href = paymentRes.data.bkashURL
            },
            onError: (err) => {
              toast.error("Payment initialization failed", {
                description: err.message || "Something went wrong",
              })
            },
          }
        )
      } catch (err: any) {
        toast.error("Booking failed", {
          description: err.message || "Something went wrong",
        })
      }
    },
  })

  const totalPrice = selectedSlot
    ? form.state.values.numberOfPeople * pkg.pricePerPerson
    : 0

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
      <FieldGroup className="gap-5">
        {/* Date Selection */}
        <div className="space-y-2">
          <p className="text-sm font-medium">
            Select Date <span className="text-destructive">*</span>
          </p>
          <div className="space-y-2 max-h-48 overflow-y-auto border rounded-lg p-2">
            {availableSlots.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                No slots available
              </p>
            ) : (
              availableSlots.map((slot) => {
                const isSelected = selectedSlotId === slot.id
                const isFull = slot.isBooked

                return (
                  <button
                    key={slot.id}
                    type="button"
                    disabled={isFull}
                    onClick={() => setSelectedSlotId(slot.id)}
                    className={cn(
                      "w-full text-left p-3 rounded-md border transition-all flex items-center justify-between",
                      isSelected
                        ? "border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500"
                        : "border-border hover:border-emerald-300 hover:bg-muted/50",
                      isFull && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Calendar
                        className={cn(
                          "h-4 w-4",
                          isSelected
                            ? "text-emerald-600"
                            : "text-muted-foreground"
                        )}
                      />
                      <div>
                        <p className="text-sm font-medium">
                          {format(new Date(slot.date), "EEEE, MMM dd, yyyy")}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {slot.startTime} - {slot.endTime}
                        </p>
                      </div>
                    </div>
                    {isFull && (
                      <span className="text-xs text-destructive font-medium">
                        Booked
                      </span>
                    )}
                  </button>
                )
              })
            )}
          </div>
        </div>

        {/* Number of People */}
        <form.Field name="numberOfPeople">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid} className="gap-2">
                <FieldLabel htmlFor={field.name}>
                  Number of People <span className="text-destructive">*</span>
                </FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  type="number"
                  min={pkg.minGroupSize}
                  max={pkg.maxGroupSize}
                  value={field.state.value}
                  onChange={(e) =>
                    field.handleChange(Number(e.target.value))
                  }
                  onBlur={field.handleBlur}
                  aria-invalid={isInvalid}
                />
                <FieldDescription>
                  Group size: {pkg.minGroupSize} to {pkg.maxGroupSize} people
                </FieldDescription>
                {isInvalid && (
                  <FieldError errors={field.state.meta.errors} />
                )}
              </Field>
            )
          }}
        </form.Field>

        {/* Special Requests */}
        <form.Field name="specialRequests">
          {(field) => (
            <Field className="gap-2">
              <FieldLabel htmlFor={field.name}>Special Requests</FieldLabel>
              <Textarea
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="Any dietary restrictions, accessibility needs..."
                rows={3}
              />
              <FieldDescription>Optional</FieldDescription>
            </Field>
          )}
        </form.Field>

        {/* Price Summary */}
        {selectedSlot && (
          <div className="rounded-lg border bg-emerald-50 border-emerald-200 p-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                ৳ {pkg.pricePerPerson} × {form.state.values.numberOfPeople}{" "}
                people
              </span>
              <span className="font-medium">৳ {totalPrice}</span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-emerald-200">
              <span className="font-semibold">Total</span>
              <span className="text-xl font-bold text-emerald-600">
                ৳ {totalPrice}
              </span>
            </div>
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
          <Button type="submit" disabled={isPending || !selectedSlot}>
            {isPending && <Spinner className="mr-2 h-4 w-4" />}
            Proceed to Payment
          </Button>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          You'll be redirected to bKash to complete payment.
        </p>
      </FieldGroup>
    </form>
  )
}