import { Link } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth-store';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Bell, LogOut, Settings, User, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

import { UserRole, ROLE_COLORS } from '@/types/rbac.types';


export const Header = () => {
    const { user, logout } = useAuthStore();
    const roleColor = user?.role ? ROLE_COLORS[user.role] : ROLE_COLORS[UserRole.DVLA];

    return (
        <header className="sticky top-0 z-20 w-full h-16 bg-white border-b">
            <div className="h-full px-8 flex items-center justify-between">
                {/* Search Bar */}
                <div className="flex-1 max-w-xl hidden md:block">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                            placeholder="Quick search (VIN, License, Case ID)..."
                            className="w-full pl-10 h-10 bg-gray-50 border-gray-200 rounded-md text-sm focus-visible:ring-primary"
                        />
                    </div>
                </div>

                {/* Right side actions */}
                <div className="flex items-center gap-4">
                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-50">
                        <Bell className="w-5 h-5" />
                    </button>

                    <div className="h-6 w-[1px] bg-gray-200" />

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="flex items-center gap-2 p-1 rounded-md hover:bg-gray-50 transition-colors">
                                <div className={cn(
                                    "w-8 h-8 rounded bg-white overflow-hidden flex items-center justify-center border shrink-0",
                                    roleColor.border
                                )}>
                                    <img
                                        src={roleColor.logo}
                                        alt="Agency Logo"
                                        className="w-full h-full object-contain p-0.5"
                                    />
                                </div>
                                <div className="hidden sm:flex flex-col items-start leading-tight">
                                    <span className="text-sm font-medium text-gray-900">{user?.firstName}</span>
                                    <span className={cn("text-[10px] font-bold uppercase", roleColor.secondary)}>
                                        {user?.role}
                                    </span>
                                </div>
                            </button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent className="w-56 mt-1 rounded-md shadow-lg border border-gray-200 bg-white p-1" align="end">
                            <DropdownMenuItem asChild className="rounded-md cursor-pointer px-3 py-2 text-sm">
                                <Link to="/profile" className="flex items-center">
                                    <User className="mr-2 h-4 w-4 text-gray-400" />
                                    <span>Profile Settings</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild className="rounded-md cursor-pointer px-3 py-2 text-sm">
                                <Link to="/security" className="flex items-center">
                                    <Settings className="mr-2 h-4 w-4 text-gray-400" />
                                    <span>Security</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="my-1" />
                            <DropdownMenuItem
                                onClick={logout}
                                className="rounded-md text-red-600 focus:text-red-700 focus:bg-red-50 cursor-pointer px-3 py-2 text-sm"
                            >
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Sign out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
};


