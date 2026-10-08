import { useQuery } from "@tanstack/react-query"
import {
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