# 🌍 Tour Guide Platform — Frontend

A modern, full-featured tour booking platform built with **Next.js 16 (App Router)**, **TypeScript**, and **shadcn/ui**. Connect tourists with verified local guides, manage tour packages, and handle secure payments — all in one place.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed-Vercel-black?logo=vercel)](https://tour-guide-platform-frontend.vercel.app)

---

## 🔗 Live Links

| Resource | URL |
|----------|-----|
| 🌐 Live Frontend | [tour-guide-platform-frontend.vercel.app](https://tour-guide-platform-frontend.vercel.app) |
| 🔌 Backend API | [tour-guide-platform-backend.vercel.app](https://tour-guide-platform-backend.vercel.app) |
| 📦 Backend Repository | [tour-guide-platform-backend](#) |

---

## ✨ Features

### 👤 Public (No Login Required)
- **Modern Landing Page** — Hero, Featured Tours, Why Choose Us, CTA
- **Browse Tour Packages** — Search, filter by price, sort
- **Package Detail** — Full itinerary, inclusions, exclusions, guide profile
- **Meet Our Guides** — Browse verified local guides
- **Register as Tourist or Guide** — With email OTP verification
- **Login** — Email/Password or Google OAuth

### 🎒 Tourist Dashboard
- **Overview** — Stats (total bookings, completed, spent)
- **Browse Tours** — Full catalog with availability
- **Book Tours** — Select date from available slots, choose group size
- **Payments** — bKash payment integration (sandbox)
- **My Bookings** — View, track, and cancel bookings
- **Payment History** — Transaction records
- **Profile** — Manage personal info

### 🧑‍🏫 Guide Dashboard
- **Overview** — Earnings, bookings, rating stats
- **Profile** — License, experience, languages, bio, hourly rate
- **Tour Packages** — Create, edit, delete packages
- **Manage Availability** — Add/edit/delete time slots per package
- **Bookings** — Confirm, complete, or cancel incoming bookings
- **Earnings** — Track total earnings and per-booking breakdown

### 🛡️ Admin Dashboard
- **Overview** — Platform-wide metrics
- **Tourists Management** — List, view, block/unblock
- **Guides Approval** — Approve/block guides (profile must be complete)
- **Packages Approval** — Approve/reject tour packages
- **Bookings** — Monitor all platform bookings
- **Payments** — Track all transactions

### 🔐 Authentication & Authorization
- Email + Password with OTP verification
- Google OAuth 2.0 login
- **Role-based access control (RBAC)** — Admin / Guide / Tourist
- **Middleware protection** for all dashboard routes
- **RoleGuard** for UI-level authorization

---

## 🔄 Complete User Flow

Understanding how roles interact is key to this platform. Here's the end-to-end journey:
┌─────────────────────────────────────────────────────────────┐
│ STEP 1: Guide Registers (with license, experience, bio) │
│ ↓ │
│ STEP 2: Admin Approves Guide (profile must be complete) │
│ ↓ │
│ STEP 3: Guide Creates Tour Package │
│ ↓ │
│ STEP 4: Admin Approves Package │
│ ↓ │
│ STEP 5: Guide Adds Availability Slots (dates + times) │
│ ↓ │
│ STEP 6: Tourist Browses & Books a Tour │
│ ↓ │
│ STEP 7: bKash Payment → CONFIRMED → COMPLETED → Review │
└─────────────────────────────────────────────────────────────┘

text

### 🧑‍🏫 Guide Journey
1. Register with extra fields (license, experience, languages, bio)
2. Verify email via OTP
3. Complete profile — **required before admin approval**
4. Admin approves guide account
5. Create packages — status starts as `PENDING`
6. Wait for admin approval of packages
7. Add availability — multiple dates with time slots
8. Manage bookings — Confirm → Complete → Cancel
9. Track earnings per booking

### 🎒 Tourist Journey
1. Register (simple — name, email, password)
2. Verify email via OTP
3. Browse packages (public — no login needed)
4. Search & filter by price, duration, location
5. View package detail with available dates
6. Book a tour — select date, people count, requests
7. Pay via bKash — real sandbox integration
8. Track bookings — view, cancel if needed
9. Leave review after tour completion

### 🛡️ Admin Journey
1. Login with demo credentials
2. Monitor dashboard — platform-wide metrics
3. Approve guides — validate profile completeness
4. Approve packages — ensure quality
5. Block/Unblock users (tourists + guides)
6. Monitor bookings and payments

### 🔗 Inter-Role Dependencies

| Step | Who Acts | What Happens |
|:----:|----------|--------------|
| 1 | Guide | Registers with profile data |
| 2 | **Admin** | Approves guide (validates profile) |
| 3 | Guide | Creates tour package |
| 4 | **Admin** | Approves package (validates content) |
| 5 | Guide | Adds availability slots |
| 6 | Tourist | Books a tour |
| 7 | **Backend** | Auto-confirms on payment |
| 8 | Guide | Marks booking completed |
| 9 | Tourist | Reviews the guide |

### 📊 Booking Status Transitions
PENDING_PAYMENT ──(payment success)──→ CONFIRMED
│ │
│ ├──→ COMPLETED (guide marks)
│ │
└──(timeout)──→ CANCELLED └──→ CANCELLED (guide/user)


> **Key Insight:** The approval chain requires 4 layered validations:
> Guide profile → Guide account → Tour package → Tourist's booking.
> This ensures quality control at every stage.

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 4 |
| **UI Components** | shadcn/ui + Base UI |
| **Icons** | Lucide React |
| **Forms** | TanStack Form + Zod |
| **State / Data** | TanStack Query (React Query) |
| **Auth** | JWT (httpOnly cookies) + Google OAuth |
| **Payment** | bKash Payment Gateway (Sandbox) |
| **Toast** | Sonner |
| **Date Utility** | date-fns |
| **Linting** | Biome |

---

## 📂 Project Structure
src/
├── app/
│ ├── (public)/ # Public routes
│ │ ├── (authentication)/ # Login, Register, OTP
│ │ └── (marketing)/ # Home, Packages, Guides, About
│ ├── (dashboard)/ # Protected routes
│ │ ├── admin/ # Admin panel
│ │ ├── guide/ # Guide panel
│ │ └── tourist/ # Tourist panel
│ ├── payment-success/ # Payment callback success
│ ├── payment-failed/ # Payment callback failure
│ ├── layout.tsx # Root layout
│ └── globals.css
│
├── components/
│ ├── ui/ # shadcn/ui primitives
│ ├── auth/ # AuthGuard, RoleGuard
│ ├── dashboard/ # Sidebar, Shell
│ ├── layout/ # Header, Footer, Layouts
│ └── modules/
│ ├── admin/ # Admin feature components
│ ├── guide/ # Guide feature components
│ ├── tourist/ # Tourist feature components
│ └── public/ # Public feature components
│
├── hooks/ # TanStack Query hooks
├── api/ # API layer functions
├── types/ # TypeScript types
├── validation/ # Zod schemas
├── routes/ # Sidebar route configs
├── constants/ # App constants
├── providers/ # React context providers
└── lib/
├── apiClient.ts # ofetch instance
└── utils.ts # cn() helper
