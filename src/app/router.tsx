import { createBrowserRouter, Navigate } from 'react-router-dom';
import React, { Suspense } from 'react';
import { AuthGuard } from '@/components/guards/auth-guard';
import { LoadingSpinner } from '@/components/common/loading-spinner';
import { UserRole } from '@/types/rbac.types';
import { useAuthStore } from '@/stores/auth-store';


// Lazy load pages
const LoginPage = React.lazy(() => import('@/features/auth/pages/LoginPage'));
const DashboardPage = React.lazy(() => import('@/pages/DashboardPage'));
const DVLADashboardPage = React.lazy(() => import('@/pages/dvla/DVLADashboardPage'));
const VehicleRegistryPage = React.lazy(() => import('@/pages/VehicleRegistryPage'));
const FraudCasesPage = React.lazy(() => import('@/pages/FraudCasesPage'));
const ProfilePage = React.lazy(() => import('@/pages/ProfilePage'));
const PaymentsPage = React.lazy(() => import('@/pages/PaymentsPage'));
const UnauthorizedPage = React.lazy(() => import('@/pages/UnauthorizedPage'));
const VinDecodingPage = React.lazy(() => import('@/pages/dvla/VinDecodingPage'));
import { GlobalErrorPage } from '@/pages/ErrorPage';


// Placeholder components for other routes
const PlaceholderPage = ({ title }: { title: string }) => (
    <div className="flex items-center justify-center min-h-[400px] font-sans">
        <h2 className="text-2xl font-bold text-gray-400">{title} Coming Soon</h2>
    </div>
);

const DashboardWrapper = () => {
    const { hasRole } = useAuthStore();
    if (hasRole(UserRole.DVLA)) {
        return <DVLADashboardPage />;
    }
    return <DashboardPage />;
};

export const router = createBrowserRouter([
    {
        path: '/',
        errorElement: <GlobalErrorPage />,
        children: [
            {
                index: true,
                element: <LoginPage />,
            },
            {
                path: 'dashboard',
                element: (
                    <Suspense fallback={<LoadingSpinner />}>
                        <AuthGuard>
                            <DashboardWrapper />
                        </AuthGuard>
                    </Suspense>
                ),
            },
            {
                path: 'vin-lookup',
                element: (
                    <Suspense fallback={<LoadingSpinner />}>
                        <AuthGuard allowedRoles={[UserRole.DVLA]}>
                            <VinDecodingPage />
                        </AuthGuard>
                    </Suspense>
                ),
            },
            {
                path: 'vehicle-history',
                element: (
                    <Suspense fallback={<LoadingSpinner />}>
                        <AuthGuard>
                            <VehicleRegistryPage />
                        </AuthGuard>
                    </Suspense>
                ),
            },
            {
                path: 'admin/users',
                element: (
                    <Suspense fallback={<LoadingSpinner />}>
                        <AuthGuard allowedRoles={[UserRole.DVLA]}>
                            <PlaceholderPage title="User Management" />
                        </AuthGuard>
                    </Suspense>
                ),
            },
            {
                path: 'police/stolen',
                element: (
                    <Suspense fallback={<LoadingSpinner />}>
                        <AuthGuard allowedRoles={[UserRole.POLICE, UserRole.DVLA, UserRole.EOCO]}>
                            <PlaceholderPage title="Stolen Vehicles" />
                        </AuthGuard>
                    </Suspense>
                ),
            },
            {
                path: 'customs/imports',
                element: (
                    <Suspense fallback={<LoadingSpinner />}>
                        <AuthGuard allowedRoles={[UserRole.CUSTOMS, UserRole.DVLA]}>
                            <PlaceholderPage title="Import Verification" />
                        </AuthGuard>
                    </Suspense>
                ),
            },
            {
                path: 'eoco/cases',
                element: (
                    <Suspense fallback={<LoadingSpinner />}>
                        <AuthGuard allowedRoles={[UserRole.EOCO, UserRole.DVLA]}>
                            <FraudCasesPage />
                        </AuthGuard>
                    </Suspense>
                ),
            },
            {
                path: 'reports',
                element: (
                    <Suspense fallback={<LoadingSpinner />}>
                        <AuthGuard>
                            <PlaceholderPage title="Reports" />
                        </AuthGuard>
                    </Suspense>
                ),
            },
            {
                path: 'profile',
                element: (
                    <Suspense fallback={<LoadingSpinner />}>
                        <AuthGuard>
                            <ProfilePage />
                        </AuthGuard>
                    </Suspense>
                ),
            },
            {
                path: 'payments',
                element: (
                    <Suspense fallback={<LoadingSpinner />}>
                        <AuthGuard>
                            <PaymentsPage />
                        </AuthGuard>
                    </Suspense>
                ),
            },
            {
                path: 'unauthorized',
                element: (
                    <Suspense fallback={<LoadingSpinner />}>
                        <UnauthorizedPage />
                    </Suspense>
                ),
            },
        ]
    },
    {
        path: '*',
        element: <Navigate to="/" replace />,
    },
], {
    future: {
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation: true,
    },
});


