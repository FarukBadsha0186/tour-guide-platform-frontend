import apiClient from "@/lib/apiClient"
import type {
  AvailabilityResponse,
  AvailabilitySlot,
  CreateAvailabilityPayload,
  CreatePackagePayload,
  GuideApiResponse,
  GuideBooking,
  GuideBookingsResponse,
  GuidePackage,
  GuidePackagesResponse,
  GuideProfile,
  UpdateAvailabilityPayload,
  UpdateBookingStatusPayload,
  UpdateGuideProfilePayload,
  UpdatePackagePayload,
} from "@/types/guide.type"
import type { BookingStatus } from "@/types/admin.type"

// ========================================
// PROFILE
// ========================================

export function getGuideProfile() {
  return apiClient<GuideApiResponse<GuideProfile>>("guide/profile", {
    method: "GET",
  })
}

// export function updateGuideProfile(payload: UpdateGuideProfilePayload) {
//   return apiClient<GuideApiResponse<GuideProfile>>("guide/profile/update", {
//     method: "PATCH",
//     body: payload,
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

export function getGuidePackages(params?: PackageListParams) {
  return apiClient<GuidePackagesResponse>("guide/allPackage", {
    method: "GET",
    query: params,
  })
}

export function getGuidePackageById(id: string) {
  return apiClient<GuideApiResponse<GuidePackage>>(`guide/package/${id}`, {
    method: "GET",
  })
}

export function createGuidePackage(payload: CreatePackagePayload) {
  return apiClient<GuideApiResponse<GuidePackage>>("guide/createpackage", {
    method: "POST",
    body: payload,
  })
}

export function updateGuidePackage(
  id: string,
  payload: UpdatePackagePayload
) {
  return apiClient<GuideApiResponse<GuidePackage>>(`guide/package/${id}`, {
    method: "PATCH",
    body: payload,
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

export function getGuideBookings(params?: BookingListParams) {
  return apiClient<GuideBookingsResponse>("guide/allbookings", {
    method: "GET",
    query: params,
  })
}

export function getGuideBookingById(id: string) {
  return apiClient<GuideApiResponse<GuideBooking>>(`guide/bookings/${id}`, {
    method: "GET",
  })
}

export function updateGuideBookingStatus(
  id: string,
  status: BookingStatus
) {
  return apiClient<GuideApiResponse<GuideBooking>>(
    `guide/bookings/${id}/status`,
    {
      method: "PATCH",
      body: { status } as UpdateBookingStatusPayload,
    }
  )
}

// ========================================
// AVAILABILITY
// ========================================

interface AvailabilityListParams {
  page?: number
  limit?: number
  packageId?: string
}

export function getGuideAvailability(params?: AvailabilityListParams) {
  return apiClient<AvailabilityResponse>("guideavailable/availability", {
    method: "GET",
    query: params,
  })
}

export function getAvailableSlots(params?: AvailabilityListParams) {
  return apiClient<AvailabilityResponse>(
    "guideavailable/availability/available",
    {
      method: "GET",
      query: params,
    }
  )
}

export function createAvailability(payload: CreateAvailabilityPayload) {
  return apiClient<GuideApiResponse<AvailabilitySlot[]>>(
    "guideavailable/availability",
    {
      method: "POST",
      body: payload,
    }
  )
}

export function updateAvailability(
  packageId: string,
  payload: UpdateAvailabilityPayload
) {
  return apiClient<GuideApiResponse<AvailabilitySlot[]>>(
    `guideavailable/${packageId}`,
    {
      method: "PATCH",
      body: payload,
    }
  )
}



export function updateAvailabilitySlot(
  slotId: string,
  payload: {
    date?: string
    startTime?: string
    endTime?: string
    packageId?: string
  }
) {
  return apiClient<GuideApiResponse<AvailabilitySlot>>(
    `guideavailable/${slotId}`,
    {
      method: "PATCH",
      body: payload,
    }
  )
}

export function deleteAvailabilitySlot(slotId: string) {
  return apiClient<GuideApiResponse<unknown>>(
    `guideavailable/${slotId}`,
    {
      method: "DELETE",
    }
  )
}

export function updateGuideProfile(payload: {
  licenseNumber?: string
  yearsExperience?: number
  languages?: string[]
  baseLocation?: string
  bio?: string
  hourlyRate?: number | null
}) {
  return apiClient<GuideApiResponse<GuideProfile>>("guide/profile/update", {
    method: "PATCH",
    body: payload,      // ← JSON body
  })
}