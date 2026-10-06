// ========================================
// BOOKING STATUS TRANSITIONS (Guide)
// ========================================

import type { BookingStatus } from "@/types/admin.type"

export interface StatusTransition {
  label: string
  nextStatus: BookingStatus
  variant: "default" | "destructive" | "outline"
  description: string
}

/**
 * Guide এর allowed status transitions
 *
 * PAID      → CONFIRMED
 * CONFIRMED → COMPLETED
 * CONFIRMED → CANCELLED
 */
export const GUIDE_BOOKING_TRANSITIONS: Partial<
  Record<BookingStatus, StatusTransition[]>
> = {
  PAID: [
    {
      label: "Confirm Booking",
      nextStatus: "CONFIRMED",
      variant: "default",
      description: "Accept this booking. The tourist will be notified.",
    },
  ],
  CONFIRMED: [
    {
      label: "Mark as Completed",
      nextStatus: "COMPLETED",
      variant: "default",
      description: "Mark this tour as successfully completed.",
    },
    {
      label: "Cancel Booking",
      nextStatus: "CANCELLED",
      variant: "destructive",
      description:
        "Cancel this booking. The tourist will be notified. No refund will be issued.",
    },
  ],
}

// ========================================
// LANGUAGE OPTIONS
// ========================================

export const LANGUAGE_OPTIONS = [
  "English",
  "Bengali",
  "Hindi",
  "Urdu",
  "Arabic",
  "French",
  "German",
  "Spanish",
  "Chinese",
  "Japanese",
] as const

// ========================================
// GUIDE PROFILE FORM
// ========================================

export const GUIDE_PROFILE_DEFAULTS = {
  licenseNumber: "",
  yearsExperience: 0,
  languages: [] as string[],
  baseLocation: "",
  bio: "",
  hourlyRate: 0,
}

// ========================================
// AVAILABILITY TIME OPTIONS
// ========================================

export const TIME_OPTIONS = [
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
] as const

// ========================================
// PACKAGE STATUS FILTER
// ========================================

export const PACKAGE_STATUS_FILTERS = [
  { value: "ALL", label: "All" },
  { value: "PENDING", label: "Pending" },
  { value: "APPROVED", label: "Approved" },
  { value: "REJECTED", label: "Rejected" },
] as const

// ========================================
// BOOKING STATUS FILTER
// ========================================

export const BOOKING_STATUS_FILTERS = [
  { value: "ALL", label: "All" },
  { value: "PENDING_PAYMENT", label: "Pending Payment" },
  { value: "PAID", label: "Paid" },
  { value: "CONFIRMED", label: "Confirmed" },
  { value: "COMPLETED", label: "Completed" },
  { value: "CANCELLED", label: "Cancelled" },
] as const

// ========================================
// PACKAGE FORM DEFAULTS
// ========================================

export const PACKAGE_FORM_DEFAULTS = {
  title: "",
  description: "",
  durationHours: 4,
  pricePerPerson: 1000,
  minGroupSize: 1,
  maxGroupSize: 10,
  meetingPoint: "",
}