# 🚗 FraudWallAuto - Vehicle Fraud Detection & Management System
## Complete Frontend Development Guide

---

## 📋 TABLE OF CONTENTS

1. [Project Overview](#project-overview)
2. [Backend API Reference](#backend-api-reference)
3. [Frontend Architecture](#frontend-architecture)
4. [Development Phases](#development-phases)
5. [Technical Stack](#technical-stack)
6. [Project Structure](#project-structure)
7. [Core Features & Components](#core-features--components)
8. [API Integration Guide](#api-integration-guide)
9. [State Management](#state-management)
10. [Authentication & Authorization](#authentication--authorization)
11. [Form Handling & Validation](#form-handling--validation)
12. [Routing & Navigation](#routing--navigation)
13. [UI/UX Guidelines](#uiux-guidelines)
14. [Security Best Practices](#security-best-practices)
15. [Performance Optimization](#performance-optimization)
16. [Testing Strategy](#testing-strategy)
17. [Development Workflow](#development-workflow)

---

## 1. PROJECT OVERVIEW

### 1.1 Purpose
A comprehensive digital platform to combat vehicle fraud in Ghana through VIN decoding, vehicle history tracking, stolen vehicle detection, and multi-agency collaboration for regulatory compliance and public safety.

### 1.2 Key Stakeholders
- **DVLA (Driver and Vehicle Licensing Authority)** - Vehicle registration and licensing oversight
- **EOCO (Economic and Organised Crime Office)** - Financial crime investigation
- **Ghana Customs** - Import verification and duty compliance
- **Ghana Police Service** - Stolen vehicle tracking and law enforcement
- **Insurance Companies** - Claims verification and fraud detection
- **Vehicle Dealers** - Inventory management and sales tracking
- **General Public** - Vehicle history checks and verification

### 1.3 System Components
- **Public Portal** - Citizen-facing VIN lookup and vehicle history
- **DVLA Dashboard** - Registration management and compliance
- **EOCO Portal** - Fraud investigation and case management
- **Customs Portal** - Import verification and tracking
- **Police Portal** - Stolen vehicle database and alerts

> **Note**: SuperAdmin backoffice is maintained as a separate project and is not part of this frontend application.

---

## 2. BACKEND API REFERENCE

### 2.1 Base URL
```
Development: https://frauwall-auto-dev.azurewebsites.net
Production: https://fraudwall-auto.azurewebsites.net
```

### 2.2 Authentication
All authenticated endpoints require Bearer token in Authorization header:
```
Authorization: Bearer <access_token>
```

### 2.3 API Modules

#### **Authentication** (Public)
```
POST   /auth/register              # Register new user
GET    /auth/verify-email          # Verify email with token
POST   /auth/login                 # User login
POST   /auth/refresh-token         # Refresh access token
POST   /auth/forgot-password       # Request password reset
POST   /auth/reset-password        # Reset password with token
```

#### **Admin Authentication**
```
POST   /admin/auth/login           # Admin login
POST   /admin/auth/create          # Create SuperAdmin/AgencyAdmin
POST   /admin/auth/forgot-password # Admin password reset request
POST   /admin/auth/reset-password  # Admin password reset
GET    /admin/auth/roles           # Get available roles
```

#### **User Management** (Admin)
```
POST   /users/createUser           # Create new user
GET    /users                      # Get all users
GET    /users/{id}                 # Get single user
DELETE /users/{id}                 # Delete user
PATCH  /users/{id}                 # Update user role
```

#### **VIN Decoding** (Public/Authenticated)
```
GET    /vin/decode/{vin}           # Decode VIN and get vehicle details
```

**Response Structure:**
```typescript
{
  message: string;
  statusCode: number;
  error: object | null;
  data: {
    success: boolean;
    service: string;
    timestamp: string;
    data: {
      vin: string;
      year: number;
      make: string;
      model: string;
      trim: string;
      style: string;
      summary: string;
      price: { base_msrp, delivery_charges, invoice_price, total_price, currency };
      vehicle: { epa_classification, body_type, doors };
      dimensions: [...];
      specifications: [...];
      features: [...];
      warranties: [...];
      safety_ratings: [...];
      recalls: [...];
      maintenance: [...];
    }
  }
}
```

#### **Vehicle History**
```
GET    /vehicle-history/{vin}      # Get comprehensive vehicle history
```

#### **Theft/Stolen Check**
```
GET    /history/theft/{vin}        # Check if vehicle is stolen
```

#### **Salvage/Accident Check**
```
GET    /history/accident           # Check accident/salvage records
```

#### **Maintenance Records**
```
GET    /maintenance/ymm-records    # Get maintenance by year/make/model
```

#### **Recalls**
```
GET    /recalls/ymm-records        # Get recall records by year/make/model
```

#### **Auction History**
```
GET    /auction-history            # Get auction data by VIN
```

---

## 3. FRONTEND ARCHITECTURE

### 3.1 Architecture Pattern
**Feature-Based Architecture with RBAC**

```
┌─────────────────────────────────────────┐
│         Presentation Layer              │
│  (React Components + Role-Based Views)  │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│    Authorization & Permission Layer     │
│  (RBAC + PBAC Guards & HOCs)            │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│         State Management Layer          │
│  (Zustand + React Query)                │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│         API Integration Layer           │
│  (Axios + Service Modules)              │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│         Backend API                     │
│  (REST API on Azure)                    │
└─────────────────────────────────────────┘
```

### 3.2 Design Principles
- **Role-Based Access**: Different UI/UX for each user role
- **Mobile-First**: Responsive design for field operations
- **Component Reusability**: DRY principle for UI components
- **Separation of Concerns**: Business logic separate from presentation
- **Accessibility**: WCAG 2.1 AA compliance
- **Performance**: Code splitting, lazy loading, optimized images
- **Security**: XSS prevention, CSRF protection, secure token storage

---

## 4. DEVELOPMENT PHASES

### Phase 1: Core Platform (6 weeks)
**Goal**: Essential features for all user roles

**Deliverables**:
- Landing page with VIN lookup
- User authentication (public + admin)
- Role-based dashboards (DVLA, EOCO, Customs, Police)
- VIN decoding interface
- Vehicle history display
- Stolen vehicle check
- User management (admin)

**Success Metrics**:
- 1000+ VIN lookups
- All agencies onboarded
- <2s average response time
- Zero critical security issues

---

### Phase 2: Advanced Features (4 weeks)
**Goal**: Enhanced investigation and reporting

**Deliverables**:
- Maintenance records integration
- Recall information display
- Auction history tracking
- Salvage/accident records
- Insurance history
- Mileage verification
- Advanced search and filters

**Success Metrics**:
- 500+ comprehensive reports generated
- 95% data accuracy
- Positive user feedback from agencies

---

### Phase 3: Analytics & Intelligence (4 weeks)
**Goal**: Fraud detection and insights

**Deliverables**:
- Fraud pattern detection
- Analytics dashboards
- Report generation (PDF/CSV)
- Ownership history visualization
- Sales history tracking
- Alerts and notifications
- Bulk operations (CSV upload)

**Success Metrics**:
- 50+ fraud cases detected
- 10+ automated alerts per week
- Agency adoption >80%

---

### Phase 4: Mobile Application (6 weeks)
**Goal**: Field operations support

**Deliverables**:
- iOS and Android apps
- QR code scanning
- Offline mode
- Camera document upload
- Push notifications
- GPS location tracking

**Success Metrics**:
- 40% mobile adoption
- App store rating >4.2
- Field verification time reduced by 60%

---

## 5. TECHNICAL STACK

### 5.1 Core Technologies
```json
{
  "framework": "React 18.2+",
  "language": "TypeScript 5.0+",
  "bundler": "Vite 5.0+",
  "routing": "React Router 6.x",
  "stateManagement": "Zustand 4.x",
  "dataFetching": "TanStack Query (React Query) 5.x",
  "uiLibrary": "Shadcn UI + Radix UI",
  "styling": "Tailwind CSS 3.x",
  "forms": "React Hook Form 7.x",
  "validation": "Zod 3.x",
  "http": "Axios 1.6+",
  "dateHandling": "date-fns 3.x",
  "charts": "Recharts 2.x",
  "tables": "TanStack Table 8.x",
  "notifications": "Sonner",
  "icons": "Lucide React"
}
```

### 5.2 Development Tools
```json
{
  "packageManager": "yarn",
  "linter": "ESLint 8.x",
  "formatter": "Prettier 3.x",
  "testing": "Vitest + React Testing Library",
  "e2e": "Playwright",
  "versionControl": "Git + Azure DevOps",
  "hosting": "Azure Static Web Apps"
}
```

### 5.3 Why These Choices?

**TypeScript**: Type safety, better IDE support, fewer runtime errors

**Vite**: Lightning-fast HMR, optimized production builds

**Zustand**: Lightweight state management, no boilerplate, great DevTools

**TanStack Query**: Powerful data synchronization, caching, background updates

**Shadcn UI**: Copy-paste components, full customization, accessibility built-in

**Tailwind CSS**: Utility-first, rapid development, consistent design system

**React Hook Form**: Performant forms, minimal re-renders

**Zod**: TypeScript-first validation, runtime type safety

---

## 6. PROJECT STRUCTURE

```
fraudwall-auto-agencies/
├── public/
│   ├── favicon.ico
│   ├── logo.svg
│   └── assets/
│       ├── images/
│       └── icons/
│
├── src/
│   ├── app/
│   │   ├── providers.tsx              # App-level providers
│   │   └── router.tsx                 # Route configuration
│   │
│   ├── features/                      # Feature-based modules
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   │   ├── login-form.tsx
│   │   │   │   ├── register-form.tsx
│   │   │   │   ├── password-reset-form.tsx
│   │   │   │   └── otp-input.tsx
│   │   │   ├── pages/
│   │   │   │   ├── login-page.tsx
│   │   │   │   ├── register-page.tsx
│   │   │   │   └── reset-password-page.tsx
│   │   │   ├── api/
│   │   │   │   ├── login.ts
│   │   │   │   ├── register.ts
│   │   │   │   ├── refresh-token.ts
│   │   │   │   └── reset-password.ts
│   │   │   ├── hooks/
│   │   │   │   ├── use-auth.ts
│   │   │   │   └── use-login.ts
│   │   │   ├── stores/
│   │   │   │   └── auth-store.ts
│   │   │   ├── utils/
│   │   │   │   └── token-manager.ts
│   │   │   └── types/
│   │   │       └── auth.types.ts
│   │   │
│   │   ├── vin-lookup/
│   │   │   ├── components/
│   │   │   │   ├── vin-search-form.tsx
│   │   │   │   ├── vehicle-details-card.tsx
│   │   │   │   ├── specifications-table.tsx
│   │   │   │   ├── features-list.tsx
│   │   │   │   ├── safety-ratings.tsx
│   │   │   │   ├── recalls-section.tsx
│   │   │   │   └── maintenance-schedule.tsx
│   │   │   ├── pages/
│   │   │   │   ├── vin-lookup-page.tsx
│   │   │   │   └── vehicle-details-page.tsx
│   │   │   ├── api/
│   │   │   │   ├── decode-vin.ts
│   │   │   │   └── get-vehicle-history.ts
│   │   │   ├── hooks/
│   │   │   │   ├── use-vin-decode.ts
│   │   │   │   └── use-vehicle-history.ts
│   │   │   └── types/
│   │   │       └── vin.types.ts
│   │   │
│   │   ├── vehicle-history/
│   │   │   ├── components/
│   │   │   │   ├── history-timeline.tsx
│   │   │   │   ├── ownership-history.tsx
│   │   │   │   ├── accident-records.tsx
│   │   │   │   ├── theft-check-badge.tsx
│   │   │   │   ├── salvage-records.tsx
│   │   │   │   ├── auction-history.tsx
│   │   │   │   ├── insurance-history.tsx
│   │   │   │   └── mileage-verification.tsx
│   │   │   ├── pages/
│   │   │   │   ├── vehicle-history-page.tsx
│   │   │   │   └── comprehensive-report-page.tsx
│   │   │   ├── api/
│   │   │   │   ├── get-theft-check.ts
│   │   │   │   ├── get-accident-records.ts
│   │   │   │   ├── get-auction-history.ts
│   │   │   │   └── get-insurance-history.ts
│   │   │   └── types/
│   │   │       └── history.types.ts
│   │   │
│   │   ├── dashboards/
│   │   │   ├── dvla/
│   │   │   │   ├── components/
│   │   │   │   │   ├── registration-stats.tsx
│   │   │   │   │   ├── pending-registrations.tsx
│   │   │   │   │   └── compliance-alerts.tsx
│   │   │   │   └── pages/
│   │   │   │       └── dvla-dashboard-page.tsx
│   │   │   │
│   │   │   ├── eoco/
│   │   │   │   ├── components/
│   │   │   │   │   ├── fraud-cases.tsx
│   │   │   │   │   ├── investigation-board.tsx
│   │   │   │   │   └── fraud-patterns.tsx
│   │   │   │   └── pages/
│   │   │   │       └── eoco-dashboard-page.tsx
│   │   │   │
│   │   │   ├── customs/
│   │   │   │   ├── components/
│   │   │   │   │   ├── import-verification.tsx
│   │   │   │   │   ├── duty-compliance.tsx
│   │   │   │   │   └── flagged-imports.tsx
│   │   │   │   └── pages/
│   │   │   │       └── customs-dashboard-page.tsx
│   │   │   │
│   │   │   ├── police/
│   │   │   │   ├── components/
│   │   │   │   │   ├── stolen-vehicles-list.tsx
│   │   │   │   │   ├── active-alerts.tsx
│   │   │   │   │   └── recovery-stats.tsx
│   │   │   │   └── pages/
│   │   │   │       └── police-dashboard-page.tsx
│   │   │   │
│   │   │   └── shared/
│   │   │       ├── components/
│   │   │       │   ├── dashboard-layout.tsx
│   │   │       │   ├── stats-card.tsx
│   │   │       │   ├── recent-activity.tsx
│   │   │       │   └── quick-actions.tsx
│   │   │       └── types/
│   │   │           └── dashboard.types.ts
│   │   │
│   │   ├── users/
│   │   │   ├── components/
│   │   │   │   ├── users-table.tsx
│   │   │   │   ├── user-form.tsx
│   │   │   │   ├── role-badge.tsx
│   │   │   │   └── user-actions-menu.tsx
│   │   │   ├── pages/
│   │   │   │   ├── users-list-page.tsx
│   │   │   │   ├── create-user-page.tsx
│   │   │   │   └── edit-user-page.tsx
│   │   │   ├── api/
│   │   │   │   ├── get-users.ts
│   │   │   │   ├── create-user.ts
│   │   │   │   ├── update-user.ts
│   │   │   │   └── delete-user.ts
│   │   │   └── types/
│   │   │       └── user.types.ts
│   │   │
│   │   ├── reports/
│   │   │   ├── components/
│   │   │   │   ├── report-generator.tsx
│   │   │   │   ├── report-filters.tsx
│   │   │   │   ├── export-buttons.tsx
│   │   │   │   └── report-preview.tsx
│   │   │   ├── pages/
│   │   │   │   └── reports-page.tsx
│   │   │   ├── api/
│   │   │   │   ├── generate-report.ts
│   │   │   │   └── export-report.ts
│   │   │   └── types/
│   │   │       └── report.types.ts
│   │   │
│   │   └── analytics/
│   │       ├── components/
│   │       │   ├── fraud-trends-chart.tsx
│   │       │   ├── agency-activity-chart.tsx
│   │       │   ├── vehicle-stats-chart.tsx
│   │       │   └── heatmap.tsx
│   │       ├── pages/
│   │       │   └── analytics-page.tsx
│   │       └── types/
│   │           └── analytics.types.ts
│   │
│   ├── components/                    # Reusable UI components
│   │   ├── ui/                        # Shadcn UI components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── card.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── table.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── select.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── toast.tsx
│   │   │   └── ... (other UI components)
│   │   │
│   │   ├── forms/
│   │   │   ├── form-input.tsx
│   │   │   ├── form-select.tsx
│   │   │   ├── form-textarea.tsx
│   │   │   ├── form-checkbox.tsx
│   │   │   └── form-date-picker.tsx
│   │   │
│   │   ├── layout/
│   │   │   ├── header.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── sidebar.tsx
│   │   │   ├── navbar.tsx
│   │   │   └── page-container.tsx
│   │   │
│   │   ├── common/
│   │   │   ├── loading-spinner.tsx
│   │   │   ├── error-boundary.tsx
│   │   │   ├── not-found.tsx
│   │   │   ├── empty-state.tsx
│   │   │   └── confirm-dialog.tsx
│   │   │
│   │   └── guards/
│   │       ├── auth-guard.tsx
│   │       ├── role-guard.tsx
│   │       └── permission-guard.tsx
│   │
│   ├── layouts/                       # Page layouts
│   │   ├── public-layout.tsx
│   │   ├── dashboard-layout.tsx
│   │   ├── admin-layout.tsx
│   │   └── auth-layout.tsx
│   │
│   ├── lib/                           # Core utilities
│   │   ├── api-client.ts              # Axios instance
│   │   ├── query-client.ts            # React Query config
│   │   ├── auth.ts                    # Auth utilities
│   │   └── utils.ts                   # Helper functions
│   │
│   ├── hooks/                         # Custom hooks
│   │   ├── use-debounce.ts
│   │   ├── use-local-storage.ts
│   │   ├── use-media-query.ts
│   │   ├── use-pagination.ts
│   │   └── use-permissions.ts
│   │
│   ├── stores/                        # Zustand stores
│   │   ├── auth-store.ts
│   │   ├── ui-store.ts
│   │   └── filters-store.ts
│   │
│   ├── types/                         # Global types
│   │   ├── api.types.ts
│   │   ├── user.types.ts
│   │   └── common.types.ts
│   │
│   ├── config/                        # Configuration
│   │   ├── env.ts
│   │   ├── routes.ts
│   │   ├── roles.ts
│   │   └── permissions.ts
│   │
│   ├── utils/                         # Utility functions
│   │   ├── formatters.ts
│   │   ├── validators.ts
│   │   ├── constants.ts
│   │   └── helpers.ts
│   │
│   ├── styles/                        # Global styles
│   │   └── globals.css
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
│
├── .env.development
├── .env.production
├── .eslintrc.cjs
├── .prettierrc
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts
├── package.json
└── README.md
```

---

## 7. CORE FEATURES & COMPONENTS

### 7.1 VIN Lookup & Decoding

**Components**:
- `VinSearchForm` - Input form with validation
- `VehicleDetailsCard` - Main vehicle information display
- `SpecificationsTable` - Detailed specs in tabular format
- `FeaturesList` - Standard and optional features
- `SafetyRatings` - NHTSA ratings display
- `RecallsSection` - Active recalls with remediation links
- `MaintenanceSchedule` - Recommended maintenance timeline

**User Flow**:
1. User enters VIN (17 characters)
2. System validates VIN format
3. API call to `/vin/decode/{vin}`
4. Display comprehensive vehicle information
5. Option to save report or check history

---

### 7.2 Vehicle History

**Components**:
- `HistoryTimeline` - Chronological event display
- `OwnershipHistory` - Previous owners and transfers
- `AccidentRecords` - Salvage and accident data
- `TheftCheckBadge` - Stolen status indicator
- `AuctionHistory` - Previous auction records
- `InsuranceHistory` - Claims and coverage
- `MileageVerification` - Odometer fraud detection

**Data Sources**:
- `/vehicle-history/{vin}` - Comprehensive history
- `/history/theft/{vin}` - Theft check
- `/history/accident` - Accident records
- `/auction-history` - Auction data

---

### 7.3 Role-Based Dashboards

#### **DVLA Dashboard**
- Registration statistics
- Pending registrations queue
- Compliance alerts
- License renewals
- Import verification status

#### **EOCO Dashboard**
- Active fraud investigations
- Fraud pattern analytics
- Case management board
- Inter-agency collaboration
- Evidence tracking

#### **Customs Dashboard**
- Import verification queue
- Duty compliance status
- Flagged imports
- VIN validation results
- Cross-border tracking

#### **Police Dashboard**
- Stolen vehicles database
- Active alerts and APBs
- Recovery statistics
- Field verification tools
- Inter-agency reports

---

### 7.4 User Management (Admin)

**Components**:
- `UsersTable` - Sortable, filterable user list
- `UserForm` - Create/edit user form
- `RoleBadge` - Visual role indicator
- `UserActionsMenu` - Dropdown actions

**Features**:
- Create users with role assignment
- Update user roles and permissions
- Deactivate/delete users
- Audit log of user actions
- Bulk operations (CSV import)

---

## 8. API INTEGRATION GUIDE

### 8.1 API Client Setup

**File**: `src/lib/api-client.ts`

```typescript
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { toast } from 'sonner';
import { useAuthStore } from '@/stores/auth-store';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - Handle errors
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiErrorResponse>) => {
    const { response } = error;

    if (!response) {
      toast.error('Network error. Please check your connection.');
      return Promise.reject(error);
    }

    switch (response.status) {
      case 401:
        // Unauthorized - logout user
        useAuthStore.getState().logout();
        toast.error('Session expired. Please login again.');
        break;
      case 403:
        toast.error('You do not have permission to perform this action.');
        break;
      case 404:
        toast.error('Resource not found.');
        break;
      case 500:
        toast.error('Server error. Please try again later.');
        break;
      default:
        toast.error(response.data?.message || 'An error occurred.');
    }

    return Promise.reject(error);
  }
);

export interface ApiErrorResponse {
  message: string;
  statusCode: number;
  error: any;
}

export interface ApiSuccessResponse<T = any> {
  message: string;
  statusCode: number;
  error: null;
  data: T;
}
```

---

### 8.2 API Request Pattern

Each API request should follow this pattern:

**File**: `src/features/vin-lookup/api/decode-vin.ts`

```typescript
import { useQuery } from '@tanstack/react-query';
import { apiClient, ApiSuccessResponse } from '@/lib/api-client';
import { VehicleDetails } from '../types/vin.types';

export interface DecodeVinResponse {
  success: boolean;
  service: string;
  timestamp: string;
  data: VehicleDetails;
}

// API function
export const decodeVin = async (vin: string): Promise<DecodeVinResponse> => {
  const { data } = await apiClient.get<ApiSuccessResponse<DecodeVinResponse>>(
    `/vin/decode/${vin}`
  );
  return data.data;
};

// React Query hook
export const useDecodeVin = (vin: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['vin-decode', vin],
    queryFn: () => decodeVin(vin),
    enabled: enabled && vin.length === 17,
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};
```

---

### 8.3 Mutation Pattern (POST/PUT/DELETE)

**File**: `src/features/users/api/create-user.ts`

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient, ApiSuccessResponse } from '@/lib/api-client';
import { toast } from 'sonner';
import { User, CreateUserDto } from '../types/user.types';

// API function
export const createUser = async (userData: CreateUserDto): Promise<User> => {
  const { data } = await apiClient.post<ApiSuccessResponse<User>>(
    '/users/createUser',
    userData
  );
  return data.data;
};

// React Query hook
export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      // Invalidate users list to refetch
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User created successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create user');
    },
  });
};
```

---

## 9. STATE MANAGEMENT

### 9.1 Zustand for Global State

**File**: `src/stores/auth-store.ts`

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  permissions: Permission[];
}

export type UserRole = 'SUPER_ADMIN' | 'DVLA_ADMIN' | 'EOCO_ADMIN' | 
                       'CUSTOMS_ADMIN' | 'POLICE_ADMIN' | 'USER';

export type Permission = 
  | 'VIEW_USERS'
  | 'CREATE_USERS'
  | 'UPDATE_USERS'
  | 'DELETE_USERS'
  | 'VIEW_REPORTS'
  | 'GENERATE_REPORTS'
  | 'VIEW_ANALYTICS'
  | 'MANAGE_STOLEN_VEHICLES'
  | 'VERIFY_IMPORTS';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  hasPermission: (permission: Permission) => boolean;
  hasRole: (role: UserRole | UserRole[]) => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: (user, token) => {
        set({ user, token, isAuthenticated: true });
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },

      updateUser: (userData) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        }));
      },

      hasPermission: (permission) => {
        const { user } = get();
        return user?.permissions.includes(permission) ?? false;
      },

      hasRole: (role) => {
        const { user } = get();
        if (!user) return false;
        return Array.isArray(role) 
          ? role.includes(user.role) 
          : user.role === role;
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
```

---

### 9.2 React Query for Server State

**File**: `src/lib/query-client.ts`

```typescript
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes
    },
    mutations: {
      retry: 0,
    },
  },
});
```

---

## 10. AUTHENTICATION & AUTHORIZATION

### 10.1 Auth Guard Component

**File**: `src/components/guards/auth-guard.tsx`

```typescript
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth-store';
import { LoadingSpinner } from '@/components/common/loading-spinner';

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
```

---

### 10.2 Role Guard Component

**File**: `src/components/guards/role-guard.tsx`

```typescript
import { Navigate } from 'react-router-dom';
import { useAuthStore, UserRole } from '@/stores/auth-store';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  fallback?: React.ReactNode;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({
  children,
  allowedRoles,
  fallback,
}) => {
  const { hasRole } = useAuthStore();

  if (!hasRole(allowedRoles)) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <div className="flex items-center justify-center min-h-screen">
        <Alert variant="destructive" className="max-w-md">
          <AlertDescription>
            You do not have permission to access this page.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return <>{children}</>;
};
```

---

### 10.3 Permission-Based Component

**File**: `src/components/guards/can.tsx`

```typescript
import { useAuthStore, Permission } from '@/stores/auth-store';

interface CanProps {
  permission: Permission;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const Can: React.FC<CanProps> = ({ permission, children, fallback }) => {
  const { hasPermission } = useAuthStore();

  if (!hasPermission(permission)) {
    return fallback ? <>{fallback}</> : null;
  }

  return <>{children}</>;
};
```

**Usage**:
```tsx
<Can permission="DELETE_USERS">
  <Button variant="destructive" onClick={handleDelete}>
    Delete User
  </Button>
</Can>
```

---

## 11. FORM HANDLING & VALIDATION

### 11.1 Form Schema with Zod

**File**: `src/features/auth/schemas/login-schema.ts`

```typescript
import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
```

---

### 11.2 Form Component with React Hook Form

**File**: `src/features/auth/components/login-form.tsx`

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { loginSchema, LoginFormData } from '../schemas/login-schema';
import { useLogin } from '../api/login';

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { mutate: login, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    login(data, {
      onSuccess: () => {
        navigate('/dashboard');
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          {...register('email')}
          disabled={isPending}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          {...register('password')}
          disabled={isPending}
        />
        {errors.password && (
          <p className="text-sm text-destructive">{errors.password.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? 'Logging in...' : 'Login'}
      </Button>
    </form>
  );
};
```

---

## 12. ROUTING & NAVIGATION

### 12.1 Route Configuration

**File**: `src/app/router.tsx`

```typescript
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AuthGuard } from '@/components/guards/auth-guard';
import { RoleGuard } from '@/components/guards/role-guard';

// Layouts
import { PublicLayout } from '@/layouts/public-layout';
import { DashboardLayout } from '@/layouts/dashboard-layout';
import { AuthLayout } from '@/layouts/auth-layout';

// Pages
import { LandingPage } from '@/pages/landing-page';
import { LoginPage } from '@/features/auth/pages/login-page';
import { RegisterPage } from '@/features/auth/pages/register-page';
import { VinLookupPage } from '@/features/vin-lookup/pages/vin-lookup-page';
import { DvlaDashboardPage } from '@/features/dashboards/dvla/pages/dvla-dashboard-page';
import { EocoDashboardPage } from '@/features/dashboards/eoco/pages/eoco-dashboard-page';
import { CustomsDashboardPage } from '@/features/dashboards/customs/pages/customs-dashboard-page';
import { PoliceDashboardPage } from '@/features/dashboards/police/pages/police-dashboard-page';
import { UsersListPage } from '@/features/users/pages/users-list-page';
import { NotFoundPage } from '@/pages/not-found-page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: 'vin-lookup',
        element: <VinLookupPage />,
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard/dvla" replace />,
      },
      {
        path: 'dvla',
        element: (
          <RoleGuard allowedRoles={['SUPER_ADMIN', 'DVLA_ADMIN']}>
            <DvlaDashboardPage />
          </RoleGuard>
        ),
      },
      {
        path: 'eoco',
        element: (
          <RoleGuard allowedRoles={['SUPER_ADMIN', 'EOCO_ADMIN']}>
            <EocoDashboardPage />
          </RoleGuard>
        ),
      },
      {
        path: 'customs',
        element: (
          <RoleGuard allowedRoles={['SUPER_ADMIN', 'CUSTOMS_ADMIN']}>
            <CustomsDashboardPage />
          </RoleGuard>
        ),
      },
      {
        path: 'police',
        element: (
          <RoleGuard allowedRoles={['SUPER_ADMIN', 'POLICE_ADMIN']}>
            <PoliceDashboardPage />
          </RoleGuard>
        ),
      },
      {
        path: 'users',
        element: (
          <RoleGuard allowedRoles={['SUPER_ADMIN']}>
            <UsersListPage />
          </RoleGuard>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
```

---

## 13. UI/UX GUIDELINES

### 13.1 Design System

**Colors** (Tailwind Config):
```javascript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
        },
        success: {
          500: '#22c55e',
          600: '#16a34a',
        },
        warning: {
          500: '#f59e0b',
          600: '#d97706',
        },
        danger: {
          500: '#ef4444',
          600: '#dc2626',
        },
      },
    },
  },
};
```

**Typography**:
- Headings: `font-bold` with appropriate sizes
- Body: `font-normal text-base`
- Small text: `text-sm text-muted-foreground`

**Spacing**:
- Consistent use of Tailwind spacing scale
- Card padding: `p-6`
- Section spacing: `space-y-6`

---

### 13.2 Component Patterns

**Stats Card**:
```tsx
<Card>
  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    <CardTitle className="text-sm font-medium">Total Vehicles</CardTitle>
    <Car className="h-4 w-4 text-muted-foreground" />
  </CardHeader>
  <CardContent>
    <div className="text-2xl font-bold">12,345</div>
    <p className="text-xs text-muted-foreground">
      +20.1% from last month
    </p>
  </CardContent>
</Card>
```

**Data Table with Actions**:
```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>VIN</TableHead>
      <TableHead>Make/Model</TableHead>
      <TableHead>Status</TableHead>
      <TableHead className="text-right">Actions</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {vehicles.map((vehicle) => (
      <TableRow key={vehicle.vin}>
        <TableCell className="font-mono">{vehicle.vin}</TableCell>
        <TableCell>{vehicle.make} {vehicle.model}</TableCell>
        <TableCell>
          <Badge variant={vehicle.isStolen ? 'destructive' : 'success'}>
            {vehicle.isStolen ? 'Stolen' : 'Clear'}
          </Badge>
        </TableCell>
        <TableCell className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem>Generate Report</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

---

## 14. SECURITY BEST PRACTICES

### 14.1 XSS Prevention

**Sanitize User Input**:
```typescript
import DOMPurify from 'dompurify';

export const sanitizeHtml = (dirty: string): string => {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p'],
    ALLOWED_ATTR: ['href'],
  });
};
```

**Usage**:
```tsx
<div dangerouslySetInnerHTML={{ __html: sanitizeHtml(userContent) }} />
```

---

### 14.2 CSRF Protection

- Use `HttpOnly` cookies for tokens
- Implement CSRF tokens for state-changing operations
- Validate origin headers

---

### 14.3 Secure Token Storage

**File**: `src/lib/auth.ts`

```typescript
import Cookies from 'js-cookie';

const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

export const tokenManager = {
  setToken: (token: string) => {
    Cookies.set(TOKEN_KEY, token, {
      secure: true,
      sameSite: 'strict',
      expires: 1, // 1 day
    });
  },

  getToken: (): string | undefined => {
    return Cookies.get(TOKEN_KEY);
  },

  removeToken: () => {
    Cookies.remove(TOKEN_KEY);
    Cookies.remove(REFRESH_TOKEN_KEY);
  },

  setRefreshToken: (token: string) => {
    Cookies.set(REFRESH_TOKEN_KEY, token, {
      secure: true,
      sameSite: 'strict',
      expires: 7, // 7 days
    });
  },

  getRefreshToken: (): string | undefined => {
    return Cookies.get(REFRESH_TOKEN_KEY);
  },
};
```

---

## 15. PERFORMANCE OPTIMIZATION

### 15.1 Code Splitting

```typescript
// Lazy load routes
import { lazy, Suspense } from 'react';
import { LoadingSpinner } from '@/components/common/loading-spinner';

const DvlaDashboardPage = lazy(() => 
  import('@/features/dashboards/dvla/pages/dvla-dashboard-page')
);

// Wrap with Suspense
<Suspense fallback={<LoadingSpinner />}>
  <DvlaDashboardPage />
</Suspense>
```

---

### 15.2 Image Optimization

```tsx
<img
  src="/images/vehicle.webp"
  srcSet="/images/vehicle-320w.webp 320w,
          /images/vehicle-640w.webp 640w,
          /images/vehicle-1280w.webp 1280w"
  sizes="(max-width: 320px) 280px,
         (max-width: 640px) 600px,
         1200px"
  alt="Vehicle"
  loading="lazy"
/>
```

---

### 15.3 React Query Optimization

```typescript
// Prefetch data on hover
const prefetchVehicleDetails = (vin: string) => {
  queryClient.prefetchQuery({
    queryKey: ['vehicle-details', vin],
    queryFn: () => getVehicleDetails(vin),
  });
};

<Link
  to={`/vehicles/${vin}`}
  onMouseEnter={() => prefetchVehicleDetails(vin)}
>
  View Details
</Link>
```

---

## 16. TESTING STRATEGY

### 16.1 Unit Tests (Vitest)

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LoginForm } from './login-form';

describe('LoginForm', () => {
  it('renders email and password fields', () => {
    render(<LoginForm />);
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('shows validation errors for invalid input', async () => {
    const { user } = render(<LoginForm />);
    
    await user.click(screen.getByRole('button', { name: /login/i }));
    
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
  });
});
```

---

### 16.2 E2E Tests (Playwright)

```typescript
import { test, expect } from '@playwright/test';

test('user can login successfully', async ({ page }) => {
  await page.goto('/auth/login');
  
  await page.fill('input[name="email"]', 'test@dvla.gov.gh');
  await page.fill('input[name="password"]', 'password123');
  await page.click('button[type="submit"]');
  
  await expect(page).toHaveURL('/dashboard/dvla');
  await expect(page.locator('h1')).toContainText('DVLA Dashboard');
});
```

---

## 17. DEVELOPMENT WORKFLOW

### 18.1 Git Workflow

```bash
# Feature branch
git checkout -b feature/vin-lookup-ui

# Commit with conventional commits
git commit -m "feat(vin-lookup): add vehicle details display"

# Push and create PR
git push origin feature/vin-lookup-ui
```

---

### 17.2 Code Review Checklist

- [ ] TypeScript types defined
- [ ] Error handling implemented
- [ ] Loading states handled
- [ ] Responsive design verified
- [ ] Accessibility checked
- [ ] Tests written
- [ ] No console errors
- [ ] Performance optimized

---

### 17.3 Build & Release

**Build for production**:
```bash
yarn build
```

**Preview production build**:
```bash
yarn preview
```

**Release Process**:

1. Update version in `package.json`
2. Create release notes
3. Tag release: `git tag v1.0.0`
4. Push to production branch
5. Monitor deployment
6. Verify in production

---

## 📚 ADDITIONAL RESOURCES

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Zustand](https://github.com/pmndrs/zustand)
- [Shadcn UI](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)

---

**Last Updated**: January 2026  
**Version**: 1.0.0  
**Maintained by**: FraudWallAuto Development Team
