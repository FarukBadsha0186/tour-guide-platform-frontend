import type { BookingStatus, PackageStatus } from "./admin.type"

// ========================================
// GUIDE PROFILE
// ========================================

export interface GuideUser {
  name: string
  email: string
  imageUrl: string
}

export interface GuideProfile {
  id: string
  userId: string
  licenseNumber: string
  yearsExperience: number
  languages: string[]
  baseLocation: string
  latitude: number | null
  longitude: number | null
  bio: string
  isApproved: boolean
  rating: number
  totalReviews: number
  hourlyRate: number | null
  isAvailable: boolean
  totalEarnings: number
  totalBookings: number
  user: GuideUser
}

export interface UpdateGuideProfilePayload {
  licenseNumber?: string
  yearsExperience?: number
  languages?: string[]
  baseLocation?: string
  bio?: string
  hourlyRate?: number
}

// ========================================
// GUIDE PACKAGE
// ========================================

export interface GuidePackage {
  id: string
  guideId: string
  title: string
  description: string
  durationHours: number
  pricePerPerson: number
  maxGroupSize: number
  minGroupSize: number
  itinerary: Record<string, unknown>
  inclusions: string[]
  exclusions: string[]
  meetingPoint: string | null
  status: PackageStatus
  isDeleted: boolean
  deletedAt: string | null
  createdAt: string
  updatedAt: string
  guide: {
    id: string
    userId: string
    licenseNumber: string
    yearsExperience: number
    languages: string[]
    baseLocation: string
    latitude: number | null
    longitude: number | null
    bio: string
    isApproved: boolean
    rating: number
    totalReviews: number
    hourlyRate: number | null
    isAvailable: boolean
    totalEarnings: number
    totalBookings: number
    user: GuideUser
  }
}

export interface CreatePackagePayload {
  userId: string
  title: string
  description: string
  durationHours: number
  pricePerPerson: number
  maxGroupSize: number
  minGroupSize: number
  meetingPoint?: string
}

export interface UpdatePackagePayload {
  title?: string
  description?: string
  durationHours?: number
  pricePerPerson?: number
  maxGroupSize?: number
  minGroupSize?: number
  meetingPoint?: string
}

// ========================================
// GUIDE BOOKING
// ========================================

export interface GuideBooking {
  id: string
  bookingReference: string
  touristId: string
  guideId: string
  packageId: string
  tourDate: string
  numberOfPeople: number
  totalPrice: number
  specialRequests: string | null
  status: BookingStatus
  paymentDeadline: string | null
  completedAt: string | null
  cancelledAt: string | null
  cancellationReason: string | null
  createdAt: string
  updatedAt: string
  tourist: {
    id: string
    name: string | null
    email: string | null
    userId: string
    contactNumber: string
    address: string
    nationality: string
    dateOfBirth: string | null
    user: {
      id: string
      name: string
      email: string
      imageUrl: string
    }
  } | null
  package: {
    id: string
    title: string
    meetingPoint: string | null
    durationHours: number
    pricePerPerson: number
  } | null
  payment: {
    id: string
    amount: number
    status: string
    bKashTrxId: string | null
    guideEarning: number
    commissionFee: number
    paidAt: string | null
  } | null
  review: Record<string, unknown> | null
}

export interface UpdateBookingStatusPayload {
  status: BookingStatus
}

// ========================================
// AVAILABILITY
// ========================================

export interface AvailabilitySlot {
  id: string
  isBooked: boolean
  date: string
  startTime: string
  endTime: string
  packageId: string
}

export interface CreateAvailabilityPayload {
  dates: string[]
  startTime: string
  endTime: string
  packageId: string
}

export interface UpdateAvailabilityPayload {
  dates: string[]
  startTime: string
  endTime: string
  packageId: string
}

// ========================================
// RESPONSES
// ========================================

export interface GuideApiResponse<T> {
  success: boolean
  statusCode?: number
  message: string
  data: T
}

// Packages response — nested data
export interface GuidePackagesResponse {
  success: boolean
  message: string
  data: {
    data: GuidePackage[]
    meta: {
      page: number
      limit: number
      total: number
      totalPages: number
    }
  }
}

// Bookings response — direct data
export interface GuideBookingsResponse {
  success: boolean
  message: string
  data: GuideBooking[]
  meta: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Availability response
export interface AvailabilityResponse {
  success: boolean
  message: string
  data: AvailabilitySlot[]
  meta: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Dashboard stats (calculated)
export interface GuideDashboardStats {
  totalEarnings: number
  totalBookings: number
  rating: number
  totalReviews: number
  totalPackages: number
  pendingPackages: number
  approvedPackages: number
  recentBookings: GuideBooking[]
}