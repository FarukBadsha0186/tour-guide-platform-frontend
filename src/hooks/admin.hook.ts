import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  approveGuide,
  approvePackage,
  blockGuide,
  blockTourist,
  getAdminBookingById,
  getAdminBookings,
  getAdminGuideById,
  getAdminGuides,
  getAdminPackageById,
  getAdminPackages,
  getAdminPaymentById,
  getAdminPayments,
  getAdminStats,
  getAdminTouristById,
  getAdminTourists,
  unblockGuide,
  unblockTourist,
} from "@/api/admin.api"
import type { PackageStatus } from "@/types/admin.type"

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
// TOURISTS — QUERIES
// ========================================

export function useAdminTourists(params?: ListParams) {
  return useQuery({
    queryKey: ["admin", "tourists", params],
    queryFn: () => getAdminTourists(params),
  })
}

export function useAdminTourist(id: string) {
  return useQuery({
    queryKey: ["admin", "tourist", id],
    queryFn: () => getAdminTouristById(id),
    enabled: !!id,
  })
}

// ========================================
// TOURISTS — MUTATIONS
// ========================================

export function useBlockTourist() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason?: string }) =>
      blockTourist(id, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "tourists"] })
      queryClient.invalidateQueries({ queryKey: ["admin", "stats"] })
    },
  })
}

export function useUnblockTourist() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => unblockTourist(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "tourists"] })
      queryClient.invalidateQueries({ queryKey: ["admin", "stats"] })
    },
  })
}

// ========================================
// GUIDES — QUERIES
// ========================================

export function useAdminGuides(params?: ListParams) {
  return useQuery({
    queryKey: ["admin", "guides", params],
    queryFn: () => getAdminGuides(params),
  })
}

export function useAdminGuide(id: string) {
  return useQuery({
    queryKey: ["admin", "guide", id],
    queryFn: () => getAdminGuideById(id),
    enabled: !!id,
  })
}

// ========================================
// GUIDES — MUTATIONS
// ========================================

export function useApproveGuide() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, isApproved }: { id: string; isApproved: boolean }) =>
      approveGuide(id, isApproved),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "guides"] })
      queryClient.invalidateQueries({ queryKey: ["admin", "stats"] })
    },
  })
}

export function useBlockGuide() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason?: string }) =>
      blockGuide(id, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "guides"] })
      queryClient.invalidateQueries({ queryKey: ["admin", "stats"] })
    },
  })
}

export function useUnblockGuide() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => unblockGuide(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "guides"] })
      queryClient.invalidateQueries({ queryKey: ["admin", "stats"] })
    },
  })
}

// ========================================
// PACKAGES — QUERIES
// ========================================

export function useAdminPackages(params?: ListParams) {
  return useQuery({
    queryKey: ["admin", "packages", params],
    queryFn: () => getAdminPackages(params),
  })
}

export function useAdminPackage(id: string) {
  return useQuery({
    queryKey: ["admin", "package", id],
    queryFn: () => getAdminPackageById(id),
    enabled: !!id,
  })
}

// ========================================
// PACKAGES — MUTATIONS
// ========================================

export function useApprovePackage() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: PackageStatus }) =>
      approvePackage(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "packages"] })
      queryClient.invalidateQueries({ queryKey: ["admin", "stats"] })
    },
  })
}

// ========================================
// BOOKINGS — QUERIES
// ========================================

export function useAdminBookings(params?: ListParams) {
  return useQuery({
    queryKey: ["admin", "bookings", params],
    queryFn: () => getAdminBookings(params),
  })
}

export function useAdminBooking(id: string) {
  return useQuery({
    queryKey: ["admin", "booking", id],
    queryFn: () => getAdminBookingById(id),
    enabled: !!id,
  })
}

// ========================================
// PAYMENTS — QUERIES
// ========================================

export function useAdminPayments(params?: ListParams) {
  return useQuery({
    queryKey: ["admin", "payments", params],
    queryFn: () => getAdminPayments(params),
  })
}

export function useAdminPayment(id: string) {
  return useQuery({
    queryKey: ["admin", "payment", id],
    queryFn: () => getAdminPaymentById(id),
    enabled: !!id,
  })
}

// ========================================
// STATS
// ========================================

export function useAdminStats() {
  return useQuery({
    queryKey: ["admin", "stats"],
    queryFn: getAdminStats,
  })
}