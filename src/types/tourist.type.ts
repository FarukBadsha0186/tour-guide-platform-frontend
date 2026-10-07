import type { BookingStatus, PaymentStatus } from "./admin.type"

// ========================================
// TOURIST PROFILE
// ========================================

export interface TouristUser {
  id: string
  name: string
  email: string
  imageUrl: string
}

export interface TouristProfile {
  id: string
  name: string | null
  email: string | null
  userId: string
  contactNumber: string
  address: string
  nationality: string
  dateOfBirth: string | null
  user: TouristUser
}

// ========================================
// PUBLIC PACKAGE (Tourist view)
// ========================================

export interface TouristPackage {
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
  status: string
  isDeleted: boolean
  deletedAt: string | null
  createdAt: string
  updatedAt: string
  guide: {
    id: string
    rating: number
    totalReviews: number
    baseLocation: string
    yearsExperience: number
    languages: string[]
    user: {
      id: string
      name: string
      email: string
      imageUrl: string
    }
  }
  _count: {
    bookings: number
  }
}

// ========================================
// AVAILABILITY
// ========================================

export interface TouristAvailability {
  id: string
  guideId: string
  date: string
  startTime: string
  endTime: string
  isBooked: boolean
  packageId: string
  guide: {
    id: string
    rating: number
    totalReviews: number
    baseLocation: string
    yearsExperience: number
    languages: string[]
    hourlyRate: number
    isAvailable: boolean
    user: {
      id: string
      name: string
      email: string
      imageUrl: string
    }
  }
}

// ========================================
// TOURIST BOOKING
// ========================================

export interface TouristBooking {
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
  guide: {
    id: string
    userId: string
    licenseNumber: string
    yearsExperience: number
    languages: string[]
    baseLocation: string
    rating: number
    totalReviews: number
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
    status: PaymentStatus
    bKashTrxId: string | null
    paidAt: string | null
  } | null
  review: {
    id: string
    rating: number
    comment: string
  } | null
}

// ========================================
// CREATE BOOKING
// ========================================

export interface CreateBookingPayload {
  packageId: string
  tourDate: string
  numberOfPeople: number
  specialRequests?: string
}

// ========================================
// CREATE REVIEW
// ========================================

export interface CreateReviewPayload {
  bookingId: string
  rating: number
  comment: string
  images?: string[]
}

// ========================================
// TOURIST PAYMENT
// ========================================

export interface TouristPayment {
  id: string
  bookingId: string
  amount: number
  bKashTrxId: string | null
  paymentMethod: string
  status: PaymentStatus
  commissionFee: number
  guideEarning: number
  platformFee: number
  paidAt: string | null
  refundedAt: string | null
  refundReason: string | null
  createdAt: string
  updatedAt: string
  booking: {
    id: string
    bookingReference: string
    tourDate: string
    numberOfPeople: number
    totalPrice: number
    status: BookingStatus
    package: {
      id: string
      title: string
    } | null
    guide: {
      id: string
      user: {
        name: string
        imageUrl: string
      }
    } | null
  } | null
}

// ========================================
// RESPONSES
// ========================================

export interface TouristApiResponse<T> {
  success: boolean
  statusCode?: number
  message: string
  data: T
}

export interface TouristPackagesResponse {
  success: boolean
  message: string
  data: TouristPackage[]
  meta: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface TouristAvailabilityResponse {
  success: boolean
  message: string
  data: TouristAvailability[]
  meta: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface TouristBookingsResponse {
  success: boolean
  message: string
  data: TouristBooking[]
  meta: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface TouristPaymentsResponse {
  success: boolean
  message: string
  data: TouristPayment[]
  meta: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}