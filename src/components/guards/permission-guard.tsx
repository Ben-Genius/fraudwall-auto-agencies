import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth-store';
import { Permission } from '@/types/rbac.types';

interface PermissionGuardProps {
    children: React.ReactNode;
    requiredPermission: Permission;
    redirectTo?: string;
}

/**
 * Restricts access based on specific user permissions.
 * Redirects to unauthorized page if user lacks required permission.
 */
export const PermissionGuard = ({
    children,
    requiredPermission,
    redirectTo = '/unauthorized'
}: PermissionGuardProps) => {
    const { hasPermission, isAuthenticated } = useAuthStore();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (!hasPermission(requiredPermission)) {
        return <Navigate to={redirectTo} replace />;
    }

    return <>{children}</>;
};
