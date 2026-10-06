import type {
  BookingStatus,
  PackageStatus,
  PaymentStatus,
  UserStatus,
} from "@/types/admin.type"

// ========================================
// STATUS CONFIG
// ========================================

export interface StatusConfig {
  label: string
  className: string
}

export const USER_STATUS_CONFIG: Record<UserStatus, StatusConfig> = {
  ACTIVE: {
    label: "Active",
    className:
      "bg-green-100 text-green-700 border-green-200 hover:bg-green-100",
  },
  PENDING: {
    label: "Pending",
    className:
      "bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-100",
  },
  BLOCKED: {
    label: "Blocked",
    className: "bg-red-100 text-red-700 border-red-200 hover:bg-red-100",
  },
  DELETED: {
    label: "Deleted",
    className: "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-100",
  },
}

export const BOOKING_STATUS_CONFIG: Record<BookingStatus, StatusConfig> = {
  PENDING_PAYMENT: {
    label: "Pending Payment",
    className:
      "bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-100",
  },
  PAID: {
    label: "Paid",
    className: "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100",
  },
  CONFIRMED: {
    label: "Confirmed",
    className:
      "bg-indigo-100 text-indigo-700 border-indigo-200 hover:bg-indigo-100",
  },
  COMPLETED: {
    label: "Completed",
    className:
      "bg-green-100 text-green-700 border-green-200 hover:bg-green-100",
  },
  CANCELLED: {
    label: "Cancelled",
    className: "bg-red-100 text-red-700 border-red-200 hover:bg-red-100",
  },
  REFUNDED: {
    label: "Refunded",
    className: "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-100",
  },
}

export const PAYMENT_STATUS_CONFIG: Record<PaymentStatus, StatusConfig> = {
  INITIATED: {
    label: "Initiated",
    className:
      "bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-100",
  },
  SUCCESS: {
    label: "Success",
    className:
      "bg-green-100 text-green-700 border-green-200 hover:bg-green-100",
  },
  FAILED: {
    label: "Failed",
    className: "bg-red-100 text-red-700 border-red-200 hover:bg-red-100",
  },
  REFUNDED: {
    label: "Refunded",
    className: "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-100",
  },
}

export const PACKAGE_STATUS_CONFIG: Record<PackageStatus, StatusConfig> = {
  PENDING: {
    label: "Pending",
    className:
      "bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-100",
  },
  APPROVED: {
    label: "Approved",
    className:
      "bg-green-100 text-green-700 border-green-200 hover:bg-green-100",
  },
  REJECTED: {
    label: "Rejected",
    className: "bg-red-100 text-red-700 border-red-200 hover:bg-red-100",
  },
}

// ========================================
// AUTH PROVIDER
// ========================================

export const AUTH_PROVIDER_LABELS: Record<string, string> = {
  CREDENTIAL: "Email/Password",
  GOOGLE: "Google",
}

// ========================================
// DEFAULT PAGINATION
// ========================================

export const DEFAULT_PAGE = 1
export const DEFAULT_LIMIT = 10
export const PAGE_SIZE_OPTIONS = [5, 10, 20, 50]