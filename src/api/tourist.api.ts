import apiClient from "@/lib/apiClient"
import type {
  CreateBookingPayload,
  CreateReviewPayload,
  TouristApiResponse,
  TouristAvailability,
  TouristAvailabilityResponse,
  TouristBooking,
  TouristBookingsResponse,
  TouristPackage,
  TouristPackagesResponse,
  TouristPayment,
  TouristPaymentsResponse,
} from "@/types/tourist.type"

// ========================================
// PACKAGES (Browse)
// ========================================

interface PackageListParams {
  page?: number
  limit?: number
  search?: string
  minPrice?: number
  maxPrice?: number
}

export function getTouristPackages(params?: PackageListParams) {
  return apiClient<TouristPackagesResponse>("tourist/packages", {
    method: "GET",
    query: params,
  })
}

export function getTouristPackageById(id: string) {
  return apiClient<TouristApiResponse<TouristPackage>>(
    `tourist/packages/${id}`,
    { method: "GET" }
  )
}

// ========================================
// AVAILABILITY
// ========================================

interface AvailabilityParams {
  page?: number
  limit?: number
  packageId?: string
}

export function getTouristAvailability(params?: AvailabilityParams) {
  return apiClient<TouristAvailabilityResponse>("tourist/availability", {
    method: "GET",
    query: params,
  })
}

export function getAvailableSlots(params?: AvailabilityParams) {
  return apiClient<TouristAvailabilityResponse>(
    "tourist/availability/available",
    {
      method: "GET",
      query: params,
    }
  )
}

// ========================================
// BOOKINGS
// ========================================

interface BookingListParams {
  page?: number
  limit?: number
  status?: string
}

export function getTouristBookings(params?: BookingListParams) {
  return apiClient<TouristBookingsResponse>("tourist/bookings", {
    method: "GET",
    query: params,
  })
}

export function getTouristBookingById(id: string) {
  return apiClient<TouristApiResponse<TouristBooking>>(
    `tourist/bookings/${id}`,
    { method: "GET" }
  )
}

export function createBooking(payload: CreateBookingPayload) {
  return apiClient<TouristApiResponse<TouristBooking>>(
    "tourist/create/bookings",
    {
      method: "POST",
      body: payload,
    }
  )
}

export function cancelBooking(bookingId: string) {
  return apiClient<TouristApiResponse<TouristBooking>>(
    `tourist/bookings/${bookingId}/cancel`,
    {
      method: "PATCH",
    }
  )
}

// ========================================
// PAYMENTS
// ========================================

interface PaymentListParams {
  page?: number
  limit?: number
  status?: string
}

export function getTouristPayments(params?: PaymentListParams) {
  return apiClient<TouristPaymentsResponse>("tourist/payments", {
    method: "GET",
    query: params,
  })
}

// ========================================
// REVIEWS
// ========================================

export function createReview(payload: CreateReviewPayload) {
  return apiClient<TouristApiResponse<unknown>>("tourist/reviews", {
    method: "POST",
    body: payload,
  })
}