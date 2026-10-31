import apiClient from "@/lib/apiClient"
import type {
  PublicGuidesResponse,
  PublicPackagesQuery,
  PublicPackagesResponse,
} from "@/types/public.type"

// ========================================
// PACKAGES
// ========================================

export function getPublicPackages(params?: PublicPackagesQuery) {
  return apiClient<PublicPackagesResponse>("public/packages", {
    method: "GET",
    query: params,
  })
}

export function searchPublicPackages(params?: PublicPackagesQuery) {
  return apiClient<PublicPackagesResponse>("public/packages/search", {
    method: "GET",
    query: params,
  })
}

// ========================================
// GUIDES
// ========================================

interface GuideListParams {
  page?: number
  limit?: number
}

export function getPublicGuides(params?: GuideListParams) {
  return apiClient<PublicGuidesResponse>("public/guides", {
    method: "GET",
    query: params,
  })
}

export function getGuideReviews(
  guideId: string,
  params?: { page?: number; limit?: number }
) {
  const qs = new URLSearchParams()
  if (params?.page) qs.append("page", params.page.toString())
  if (params?.limit) qs.append("limit", params.limit.toString())
  return apiClient(`public/reviews/guide/${guideId}?${qs.toString()}`)
}

// src/api/public.api.ts (add at the end)

export function getPackageReviews(
  packageId: string,
  params?: { page?: number; limit?: number }
) {
  const qs = new URLSearchParams()
  if (params?.page) qs.append("page", params.page.toString())
  if (params?.limit) qs.append("limit", params.limit.toString())
  return apiClient(`public/reviews/package/${packageId}?${qs.toString()}`)
}