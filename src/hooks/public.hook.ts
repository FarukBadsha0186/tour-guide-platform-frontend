import { useQuery } from "@tanstack/react-query"
import {
  getGuideReviews,
  getPublicGuides,
  getPublicPackages,
  searchPublicPackages,
} from "@/api/public.api"
import type { PublicPackagesQuery } from "@/types/public.type"

// ========================================
// PACKAGES
// ========================================

export function usePublicPackages(params?: PublicPackagesQuery) {
  return useQuery({
    queryKey: ["public", "packages", params],
    queryFn: () => getPublicPackages(params),
  })
}

export function useSearchPublicPackages(params?: PublicPackagesQuery) {
  return useQuery({
    queryKey: ["public", "packages", "search", params],
    queryFn: () => searchPublicPackages(params),
  })
}

// ========================================
// GUIDES
// ========================================

interface GuideListParams {
  page?: number
  limit?: number
}

export function usePublicGuides(params?: GuideListParams) {
  return useQuery({
    queryKey: ["public", "guides", params],
    queryFn: () => getPublicGuides(params),
  })
}




export function useGuideReviews(
  guideId: string,
  params?: { page?: number; limit?: number }
) {
  return useQuery({
    queryKey: ["guide-reviews", guideId, params],
    queryFn: () => getGuideReviews(guideId, params),
    enabled: !!guideId,
  })
}


// src/hooks/public.hook.ts (add at the end)

import { getPackageReviews } from "@/api/public.api"

export function usePackageReviews(
  packageId: string,
  params?: { page?: number; limit?: number }
) {
  return useQuery({
    queryKey: ["package-reviews", packageId, params],
    queryFn: () => getPackageReviews(packageId, params),
    enabled: !!packageId,
  })
}