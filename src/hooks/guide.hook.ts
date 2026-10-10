import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  createAvailability,
  createGuidePackage,
  deleteAvailabilitySlot,
  getAvailableSlots,
  getGuideAvailability,
  getGuideBookingById,
  getGuideBookings,
  getGuidePackageById,
  getGuidePackages,
  getGuideProfile,
  updateAvailability,
  updateAvailabilitySlot,
  updateGuideBookingStatus,
  updateGuidePackage,
  updateGuideProfile,
} from "@/api/guide.api"
import type {
  CreateAvailabilityPayload,
  CreatePackagePayload,
  UpdateAvailabilityPayload,
  UpdateGuideProfilePayload,
  UpdatePackagePayload,
} from "@/types/guide.type"
import type { BookingStatus } from "@/types/admin.type"

// ========================================
// PROFILE
// ========================================

export function useGuideProfile() {
  return useQuery({
    queryKey: ["guide", "profile"],
    queryFn: getGuideProfile,
  })
}

// export function useUpdateGuideProfile() {
//   const queryClient = useQueryClient()
//   return useMutation({
//     mutationFn: (payload: UpdateGuideProfilePayload) =>
//       updateGuideProfile(payload),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["guide", "profile"] })
//     },
//   })
// }

// ========================================
// PACKAGES
// ========================================

interface PackageListParams {
  page?: number
  limit?: number
  status?: string
  search?: string
}

export function useGuidePackages(params?: PackageListParams) {
  return useQuery({
    queryKey: ["guide", "packages", params],
    queryFn: () => getGuidePackages(params),
  })
}

export function useGuidePackage(id: string) {
  return useQuery({
    queryKey: ["guide", "package", id],
    queryFn: () => getGuidePackageById(id),
    enabled: !!id,
  })
}

export function useCreateGuidePackage() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: CreatePackagePayload) =>
      createGuidePackage(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["guide", "packages"] })
    },
  })
}

export function useUpdateGuidePackage() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string
      payload: UpdatePackagePayload
    }) => updateGuidePackage(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["guide", "packages"] })
      queryClient.invalidateQueries({
        queryKey: ["guide", "package", variables.id],
      })
    },
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

export function useGuideBookings(params?: BookingListParams) {
  return useQuery({
    queryKey: ["guide", "bookings", params],
    queryFn: () => getGuideBookings(params),
  })
}

export function useGuideBooking(id: string) {
  return useQuery({
    queryKey: ["guide", "booking", id],
    queryFn: () => getGuideBookingById(id),
    enabled: !!id,
  })
}

export function useUpdateGuideBookingStatus() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string
      status: BookingStatus
    }) => updateGuideBookingStatus(id, status),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["guide", "bookings"] })
      queryClient.invalidateQueries({
        queryKey: ["guide", "booking", variables.id],
      })
      queryClient.invalidateQueries({ queryKey: ["guide", "profile"] })
    },
  })
}

// ========================================
// AVAILABILITY
// ========================================

interface AvailabilityListParams {
  page?: number
  limit?: number
  packageId?: string
}

export function useGuideAvailability(params?: AvailabilityListParams) {
  return useQuery({
    queryKey: ["guide", "availability", params],
    queryFn: () => getGuideAvailability(params),
  })
}

export function useAvailableSlots(params?: AvailabilityListParams) {
  return useQuery({
    queryKey: ["guide", "availability", "available", params],
    queryFn: () => getAvailableSlots(params),
  })
}

export function useCreateAvailability() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: CreateAvailabilityPayload) =>
      createAvailability(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["guide", "availability"] })
    },
  })
}

export function useUpdateAvailability() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      packageId,
      payload,
    }: {
      packageId: string
      payload: UpdateAvailabilityPayload
    }) => updateAvailability(packageId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["guide", "availability"] })
    },
  })
}


// ========================================
// DASHBOARD (Computed)
// ========================================

import type { GuideDashboardStats } from "@/types/guide.type"

export function useGuideDashboard() {
  const profile = useGuideProfile()
  const packages = useGuidePackages({ limit: 100 })
  const bookings = useGuideBookings({ limit: 5 })

  const isLoading =
    profile.isLoading || packages.isLoading || bookings.isLoading

  const isError = profile.isError || packages.isError || bookings.isError

  const profileData = profile.data?.data
  const packagesData = packages.data?.data?.data || []
  const bookingsData = bookings.data?.data || []

  const stats: GuideDashboardStats = {
    totalEarnings: profileData?.totalEarnings || 0,
    totalBookings: profileData?.totalBookings || 0,
    rating: profileData?.rating || 0,
    totalReviews: profileData?.totalReviews || 0,
    totalPackages: packagesData.length,
    pendingPackages: packagesData.filter((p) => p.status === "PENDING").length,
    approvedPackages: packagesData.filter((p) => p.status === "APPROVED").length,
    recentBookings: bookingsData,
  }

  return {
    stats,
    isLoading,
    isError,
    refetch: () => {
      profile.refetch()
      packages.refetch()
      bookings.refetch()
    },
  }
}

export function useUpdateAvailabilitySlot() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      slotId,
      payload,
    }: {
      slotId: string
      payload: {
        date?: string
        startTime?: string
        endTime?: string
        packageId?: string
      }
    }) => updateAvailabilitySlot(slotId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["guide", "availability"] })
    },
  })
}

export function useDeleteAvailabilitySlot() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (slotId: string) => deleteAvailabilitySlot(slotId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["guide", "availability"] })
    },
  })
}

export function useUpdateGuideProfile() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: {
      licenseNumber?: string
      yearsExperience?: number
      languages?: string[]
      baseLocation?: string
      bio?: string
      hourlyRate?: number | null
    }) => updateGuideProfile(payload),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ["guide", "profile"] })
      queryClient.invalidateQueries({ queryKey: ["user"] })
    },
  })
}