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