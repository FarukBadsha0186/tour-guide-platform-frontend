



export type UserStatus = "ACTIVE" | "BLOCKED" | "DELETED" | "PENDING"

export type AuthProvider = "GOOGLE" | "CREDENTIAL"

export type BookingStatus =
  | "PENDING_PAYMENT"
  | "PAID"
  | "CONFIRMED"
  | "COMPLETED"
  | "CANCELLED"
  | "REFUNDED"

export type PaymentStatus = "INITIATED" | "SUCCESS" | "FAILED" | "REFUNDED"

export type PackageStatus = "PENDING" | "APPROVED" | "REJECTED"

// ========================================
// PAGINATION
// ========================================

export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface PaginatedResponse<T> {
  success: boolean
  message: string
  data: T[]
  meta: PaginationMeta
}

// ========================================
// TOURIST
// ========================================

export interface AdminTourist {
  id: string
  name: string
  email: string
  imageUrl: string
  role: "TOURIST"
  status: UserStatus
  emailVerified: boolean
  authProvider: AuthProvider
  createdAt: string
  updatedAt: string
  tourist: {
    id: string
    contactNumber: string
    address: string
    nationality: string
    dateOfBirth: string | null
    _count: {
      bookings: number
    }
  } | null
}

// ========================================
// GUIDE
// ========================================

export interface AdminGuide {
  id: string
  name: string
  email: string
  imageUrl: string
  role: "GUIDE"
  status: UserStatus
  emailVerified: boolean
  authProvider: AuthProvider
  createdAt: string
  updatedAt: string
  guide: {
    id: string
    licenseNumber: string
    yearsExperience: number
    languages: string[]
    baseLocation: string
    bio: string
    isApproved: boolean
    rating: number
    totalReviews: number
    hourlyRate: number | null
    isAvailable: boolean
    totalEarnings: number
    totalBookings: number
    _count: {
      packages: number
      bookings: number
    }
  } | null
}

// ========================================
// BOOKING
// ========================================

export interface AdminBooking {
  id: string
  bookingReference: string
  tourDate: string
  numberOfPeople: number
  totalPrice: number
  status: BookingStatus
  tourist: {
    id: string
    user: {
      id: string
      name: string
      email: string
      imageUrl: string
    }
  } | null
  guide: {
    id: string
    user: {
      id: string
      name: string
      email: string
      imageUrl: string
    }
  } | null
  createdAt: string
}

// ========================================
// PAYMENT
// ========================================

export interface AdminPayment {
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
  paymentData: Record<string, unknown> | null
  createdAt: string
  updatedAt: string
  booking?: AdminBooking
}

// ========================================
// PACKAGE
// ========================================

export interface AdminPackage {
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
  meetingPoint: string
  status: PackageStatus
  isDeleted: boolean
  deletedAt: string | null
  createdAt: string
  updatedAt: string
  guide?: {
    id: string
    user: {
      name: string
      email: string
      imageUrl: string
    }
  }
}

// ========================================
// STATS
// ========================================

export interface AdminStats {
  totalTourists: number
  activeTourists: number
  totalGuides: number
  pendingGuides: number
  totalPackages: number
  pendingPackages: number
  totalBookings: number
  totalRevenue: number
}