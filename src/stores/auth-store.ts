import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, UserRole, Permission, ROLE_PERMISSIONS } from '@/types/rbac.types';
import { queryClient } from '@/lib/query-client';


interface AuthState {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    login: (data: any) => void;
    logout: () => void;
    updateUser: (user: Partial<User>) => void;
    hasPermission: (permission: Permission) => boolean;
    hasRole: (role: UserRole | UserRole[]) => boolean;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,

            login: (data) => {
                const { accessToken, refreshToken, ...userData } = data;

                // Ensure permissions are attached based on role if they don't exist
                const userWithPermissions: User = {
                    ...userData,
                    permissions: ROLE_PERMISSIONS[userData.role as UserRole] || [],
                };

                set({
                    user: userWithPermissions,
                    accessToken,
                    refreshToken,
                    isAuthenticated: true
                });
            },

            logout: () => {
                // Clear state
                set({ user: null, accessToken: null, refreshToken: null, isAuthenticated: false });

                // Clear all web storage for security
                localStorage.clear();
                sessionStorage.clear();

                // Reset TanStack Query cache
                queryClient.clear();

                // Hard reload to ensure all memory state is purged
                window.location.href = '/';
            },

            updateUser: (userData) => {
                set((state) => ({
                    user: state.user ? { ...state.user, ...userData } as User : null,
                }));
            },

            hasPermission: (permission) => {
                const { user } = get();
                return user?.permissions.includes(permission) ?? false;
            },

            hasRole: (role) => {
                const { user } = get();
                if (!user) return false;
                return Array.isArray(role) ? role.includes(user.role) : user.role === role;
            },
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({
                user: state.user,
                accessToken: state.accessToken,
                refreshToken: state.refreshToken,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);

