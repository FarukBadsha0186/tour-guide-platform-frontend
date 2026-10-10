import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  cancelBooking,
  createBooking,
  createReview,
  getAvailableSlots,
  getTouristAvailability,
  getTouristBookingById,
  getTouristBookings,
  getTouristPackageById,
  getTouristPackages,
  getTouristPayments,
  getTouristProfile,
  initializeBkashPayment,
  updateTouristProfile,
  

       
} from "@/api/tourist.api"
import type {
  CreateBookingPayload,
  CreateReviewPayload,
  InitializePaymentPayload,
  UpdateTouristProfilePayload,
} from "@/types/tourist.type"

// ========================================
// PACKAGES
// ========================================

interface PackageListParams {
  page?: number
  limit?: number
  search?: string
  minPrice?: number
  maxPrice?: number
}

export function useTouristPackages(params?: PackageListParams) {
  return useQuery({
    queryKey: ["tourist", "packages", params],
    queryFn: () => getTouristPackages(params),
  })
}

export function useTouristPackage(id: string) {
  return useQuery({
    queryKey: ["tourist", "package", id],
    queryFn: () => getTouristPackageById(id),
    enabled: !!id,
  })
}

// ========================================
// AVAILABILITY
// ========================================

interface AvailabilityParams {
  page?: number
  limit?: number
  packageId?: string
}

export function useTouristAvailability(params?: AvailabilityParams) {
  return useQuery({
    queryKey: ["tourist", "availability", params],
    queryFn: () => getTouristAvailability(params),
  })
}

export function useTouristAvailableSlots(params?: AvailabilityParams) {
  return useQuery({
    queryKey: ["tourist", "availability", "available", params],
    queryFn: () => getAvailableSlots(params),
    enabled: !!params?.packageId,
  })
}

// ========================================
// BOOKINGS
// ========================================

interface BookingListParams {
  page?: number
  limit?: number
  status?: string
}

export function useTouristBookings(params?: BookingListParams) {
  return useQuery({
    queryKey: ["tourist", "bookings", params],
    queryFn: () => getTouristBookings(params),
  })
}

export function useTouristBooking(id: string) {
  return useQuery({
    queryKey: ["tourist", "booking", id],
    queryFn: () => getTouristBookingById(id),
    enabled: !!id,
  })
}

export function useCreateBooking() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: CreateBookingPayload) => createBooking(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tourist", "bookings"] })
    },
  })
}

export function useCancelBooking() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (bookingId: string) => cancelBooking(bookingId),
    onSuccess: (_, bookingId) => {
      queryClient.invalidateQueries({ queryKey: ["tourist", "bookings"] })
      queryClient.invalidateQueries({
        queryKey: ["tourist", "booking", bookingId],
      })
    },
  })
}

// ========================================
// PAYMENTS
// ========================================

interface PaymentListParams {
  page?: number
  limit?: number
  status?: string
}

export function useTouristPayments(params?: PaymentListParams) {
  return useQuery({
    queryKey: ["tourist", "payments", params],
    queryFn: () => getTouristPayments(params),
  })
}

// ========================================
// REVIEWS
// ========================================

export function useCreateReview() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: CreateReviewPayload) => createReview(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tourist", "bookings"] })
    },
  })
}

export function useTouristDashboard() {
  const bookings = useTouristBookings({ limit: 100 })

  const bookingsData = bookings.data?.data || []

  const stats = {
    totalBookings: bookingsData.length,
    completedBookings: bookingsData.filter((b) => b.status === "COMPLETED")
      .length,
    upcomingBookings: bookingsData.filter(
      (b) =>
        b.status === "PAID" ||
        b.status === "CONFIRMED" ||
        b.status === "PENDING_PAYMENT"
    ).length,
    totalSpent: bookingsData
      .filter((b) => b.status !== "CANCELLED")
      .reduce((sum, b) => sum + b.totalPrice, 0),
  }

  return {
    stats,
    recentBookings: bookingsData.slice(0, 5),
    isLoading: bookings.isLoading,
    isError: bookings.isError,
    refetch: bookings.refetch,
  }
}










export function useInitializePayment() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: InitializePaymentPayload) =>
      initializeBkashPayment(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tourist", "bookings"] })
    },
  })
}


export function useUpdateTouristProfile() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: UpdateTouristProfilePayload) =>
      updateTouristProfile(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tourist", "profile"] })
      queryClient.invalidateQueries({ queryKey: ["user"] })
    },
  })
}


export function useTouristProfile() {
  return useQuery({
    queryKey: ["tourist", "profile"],
    queryFn: getTouristProfile,
  })
}

