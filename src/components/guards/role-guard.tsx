import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth-store';
import { UserRole } from '@/types/rbac.types';

interface RoleGuardProps {
    children: React.ReactNode;
    allowedRoles: UserRole | UserRole[];
    redirectTo?: string;
}

/**
 * Restricts access based on user role.
 * Redirects to unauthorized page if user role doesn't match.
 */
export const RoleGuard = ({
    children,
    allowedRoles,
    redirectTo = '/unauthorized'
}: RoleGuardProps) => {
    const { hasRole, isAuthenticated } = useAuthStore();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (!hasRole(allowedRoles)) {
        return <Navigate to={redirectTo} replace />;
    }

    return <>{children}</>;
};
