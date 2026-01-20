import { NavLink, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth-store';
import { UserRole, ROLE_COLORS } from '@/types/rbac.types';
import { cn } from '@/lib/utils';
import smallLogo from '@/assets/auto_symbol_logo.png'
import largeLogo from '@/assets/auto_logo.png'
import {
    LayoutDashboard,
    Search,
    Car,
    ShieldAlert,
    Ship,
    FileSearch,
    BarChart3,
    Users,
    ChevronLeft,
    LogOut,
    Settings
} from 'lucide-react';
import { useState } from 'react';

interface NavItem {
    label: string;
    href: string;
    icon: any;
    allowedRoles?: UserRole[];
}

const navItems: NavItem[] = [
    { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { label: 'VIN Decoding', href: '/vin-lookup', icon: Search },
    { label: 'Vehicle Registry', href: '/vehicle-history', icon: Car },
    {
        label: 'User Management',
        href: '/admin/users',
        icon: Users,
        allowedRoles: [UserRole.DVLA]
    },
    {
        label: 'Alerts & Stolen',
        href: '/police/stolen',
        icon: ShieldAlert,
        allowedRoles: [UserRole.POLICE, UserRole.DVLA, UserRole.EOCO]
    },
    {
        label: 'Verifications',
        href: '/customs/imports',
        icon: Ship,
        allowedRoles: [UserRole.CUSTOMS, UserRole.DVLA]
    },
    {
        label: 'Active Cases',
        href: '/eoco/cases',
        icon: FileSearch,
        allowedRoles: [UserRole.EOCO]
    },
    {
        label: 'Analytics',
        href: '/reports',
        icon: BarChart3,
    },
    { label: 'Account Settings', href: '/profile', icon: Settings },
];

export const Sidebar = () => {
    const { hasRole, logout, user } = useAuthStore();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const location = useLocation();

    // Default to DVLA colors if no user/role found
    const roleColor = user?.role ? ROLE_COLORS[user.role] : ROLE_COLORS[UserRole.DVLA];

    const filteredNavItems = navItems.filter(item =>
        !item.allowedRoles || hasRole(item.allowedRoles)
    );

    return (
        <aside
            className={cn(
                'relative flex flex-col h-screen bg-white border-r transition-all duration-300 z-30',
                isCollapsed ? 'w-20' : 'w-72'
            )}
        >
            {/* Brand Section */}
            <div className="flex items-center gap-3 px-6 h-[4.75rem] border-b relative">
                <div className={cn(
                    "flex items-center justify-center mx-auto rounded bg-white  transition-all duration-300",
                    isCollapsed ? "scale-150 " : "scale-100"
                )}>
                    <img
                        src={isCollapsed ? smallLogo : largeLogo}
                        alt="Agency Logo"
                        className={`mx-auto object-contain ${isCollapsed ? 'w-[9rem]' : 'w-[12rem]'}`}
                    />
                </div>

                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className={`absolute -right-4 top-1/2 -translate-y-1/2 ${isCollapsed ? 'w-6 h-6' : 'w-8 h-8'} bg-white border rounded-full flex items-center justify-center shadow-sm text-gray-400 hover:text-gray-900 border-slate-200 z-50 group hover:border-slate-400 transition-all`}
                >
                    <ChevronLeft className={cn('w-6 h-6 transition-transform duration-300', isCollapsed && 'rotate-180 w-4 h-4')} />
                </button>
            </div>

            {/* Nav Section */}
            <div className="flex-1 py-4 space-y-1 overflow-y-auto">
                {filteredNavItems.map((item) => {
                    const isActive = location.pathname === item.href || location.pathname.startsWith(item.href + '/');
                    return (
                        <NavLink
                            key={item.href}
                            to={item.href}
                            className={cn(
                                'flex items-center gap-3 mx-3 px-3 py-2.5 rounded-md transition-colors text-sm font-medium',
                                isActive
                                    ? cn(roleColor.bg, roleColor.secondary)
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                isCollapsed && 'justify-center mx-1 px-0'
                            )}
                        >
                            <item.icon className={cn(
                                'w-5 h-5 shrink-0',
                                isActive ? roleColor.secondary : 'text-gray-400'
                            )} />

                            {!isCollapsed && <span>{item.label}</span>}
                        </NavLink>
                    );
                })}
            </div>

            {/* Profile / Bottom Section */}
            <div className="border-t p-4">



                <button
                    onClick={logout}
                    className={cn(
                        'w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-gray-50 hover:text-gray-900 transition-colors',
                        isCollapsed && 'justify-center'
                    )}
                >
                    <LogOut className="w-5 h-5 shrink-0" />
                    {!isCollapsed && <span>Sign out</span>}
                </button>
            </div>
        </aside>
    );
};


