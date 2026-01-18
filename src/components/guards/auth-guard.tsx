import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth-store';
import { UserRole, Permission } from '@/types/rbac.types';

interface AuthGuardProps {
    children: React.ReactNode;
    allowedRoles?: UserRole[];
    requiredPermission?: Permission;
}

/**
 * Protects routes requiring authentication and authorization.
 */
export const AuthGuard = ({ children, allowedRoles, requiredPermission }: AuthGuardProps) => {
    const { isAuthenticated, user, hasRole, hasPermission } = useAuthStore();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    // Role-based check
    if (allowedRoles && !hasRole(allowedRoles)) {
        return <Navigate to="/unauthorized" replace />;
    }

    // Permission-based check
    if (requiredPermission && !hasPermission(requiredPermission)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <>{children}</>;
};

