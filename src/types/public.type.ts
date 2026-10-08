export interface PublicPackage {
  id: string
  title: string
  description: string
  durationHours: number
  pricePerPerson: number
  maxGroupSize: number
  minGroupSize: number
  meetingPoint: string | null
  inclusions: string[]
  exclusions: string[]
  itinerary: Record<string, unknown>
  createdAt: string
  guide: {
    id: string
    rating: number
    totalReviews: number
    baseLocation: string
    user: {
      id: string
      name: string
      email: string
      imageUrl: string
    }
  }
  _count?: {
    bookings: number
  }
  availableSlots?: number
}

export interface PublicGuide {
  id: string
  yearsExperience: number
  languages: string[]
  baseLocation: string
  bio: string
  rating: number
  totalReviews: number
  hourlyRate: number | null
  isAvailable: boolean
  totalBookings: number
  user: {
    id: string
    name: string
    email: string
    imageUrl: string
  }
  _count: {
    packages: number
  }
}

export interface PublicPackagesResponse {
  success: boolean
  message: string
  data: PublicPackage[]
  meta: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface PublicGuidesResponse {
  success: boolean
  message: string
  data: PublicGuide[]
  meta: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface PublicPackagesQuery {
  search?: string
  location?: string
  minPrice?: number
  maxPrice?: number
  minDuration?: number
  maxDuration?: number
  sortBy?: "pricePerPerson" | "durationHours" | "createdAt"
  sortOrder?: "asc" | "desc"
  page?: number
  limit?: number
}