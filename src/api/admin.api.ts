import apiClient from "@/lib/apiClient"
import type {
  AdminBooking,
  AdminGuide,
  AdminPackage,
  AdminPayment,
  AdminStats,
  AdminTourist,
  BookingStatus,
  PackageStatus,
  PaginatedResponse,
  UserStatus,
} from "@/types/admin.type"

// ========================================
// QUERY PARAMS
// ========================================

interface ListParams {
  page?: number
  limit?: number
  status?: string
  search?: string
}

// ========================================
// TOURISTS
// ========================================

export function getAdminTourists(params?: ListParams) {
  return apiClient<PaginatedResponse<AdminTourist>>("admin/tourists", {
    method: "GET",
    query: params,
  })
}

export function getAdminTouristById(id: string) {
  return apiClient<{ success: boolean; data: AdminTourist }>(
    `admin/tourists/${id}`,
    { method: "GET" }
  )
}

export function blockTourist(id: string, reason?: string) {
  return apiClient(`admin/tourists/${id}/block`, {
    method: "PATCH",
    body: { reason },
  })
}

export function unblockTourist(id: string) {
  return apiClient(`admin/tourists/${id}/unblock`, {
    method: "PATCH",
  })
}

// ========================================
// GUIDES
// ========================================

export function getAdminGuides(params?: ListParams) {
  return apiClient<PaginatedResponse<AdminGuide>>("admin/guides", {
    method: "GET",
    query: params,
  })
}

export function getAdminGuideById(id: string) {
  return apiClient<{ success: boolean; data: AdminGuide }>(
    `admin/guides/${id}`,
    { method: "GET" }
  )
}

export function approveGuide(id: string, isApproved: boolean) {
  return apiClient(`admin/guides/${id}/approve`, {
    method: "PATCH",
    body: { isApproved },
  })
}

export function blockGuide(id: string, reason?: string) {
  return apiClient(`admin/guides/${id}/block`, {
    method: "PATCH",
    body: { reason },
  })
}

export function unblockGuide(id: string) {
  return apiClient(`admin/guides/${id}/unblock`, {
    method: "PATCH",
  })
}

// ========================================
// PACKAGES
// ========================================

export function getAdminPackages(params?: ListParams) {
  return apiClient<PaginatedResponse<AdminPackage>>("admin/packages", {
    method: "GET",
    query: params,
  })
}

export function getAdminPackageById(id: string) {
  return apiClient<{ success: boolean; data: AdminPackage }>(
    `admin/packages/${id}`,
    { method: "GET" }
  )
}

export function approvePackage(id: string, status: PackageStatus) {
  return apiClient(`admin/packages/${id}/approve`, {
    method: "PATCH",
    body: { status },
  })
}

// ========================================
// BOOKINGS
// ========================================

export function getAdminBookings(params?: ListParams) {
  return apiClient<PaginatedResponse<AdminBooking>>("admin/bookings", {
    method: "GET",
    query: params,
  })
}

export function getAdminBookingById(id: string) {
  return apiClient<{ success: boolean; data: AdminBooking }>(
    `admin/bookings/${id}`,
    { method: "GET" }
  )
}

// ========================================
// PAYMENTS
// ========================================

export function getAdminPayments(params?: ListParams) {
  return apiClient<PaginatedResponse<AdminPayment>>("admin/payments", {
    method: "GET",
    query: params,
  })
}

export function getAdminPaymentById(id: string) {
  return apiClient<{ success: boolean; data: AdminPayment }>(
    `admin/payments/${id}`,
    { method: "GET" }
  )
}

// ========================================
// STATS
// ========================================

export function getAdminStats() {
  return apiClient<{ success: boolean; data: AdminStats }>("admin/stats", {
    method: "GET",
  })
}