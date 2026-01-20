import { Link } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth-store';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Bell, LogOut, Settings, User, Search, UsersIcon, User2 } from 'lucide-react';
import { cn } from '@/lib/utils';

import { UserRole, ROLE_COLORS } from '@/types/rbac.types';
import { SearchModal } from '@/components/search/search-modal';
import { useState } from 'react';
import { NotificationDropdown } from '@/components/notifications/notification-dropdown';
import { Avatar } from '@radix-ui/react-avatar';


export const Header = () => {
    const { user, logout } = useAuthStore();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const roleColor = user?.role ? ROLE_COLORS[user.role] : ROLE_COLORS[UserRole.DVLA];

    return (
        <header className="sticky top-0 z-20 w-full h-[4.75rem] bg-white border-b ">
            <div className="h-full px-8 flex items-center justify-between">
                {/* Search Bar */}
                <div className="flex-1 max-w-xl hidden md:block">
                    <div className="relative group cursor-pointer" onClick={() => setIsSearchOpen(true)}>
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-slate-900 transition-colors" />
                        <div className="w-full pl-10 h-10 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-400 flex items-center group-hover:bg-gray-100 transition-all">
                            Quick search (VIN, License, Case ID)...
                            <div className="ml-auto mr-3 flex items-center gap-1.5 px-1.5 py-0.5 bg-white border rounded text-[10px] font-black text-slate-400">
                                <span className="text-[8px]">⌘</span>K
                            </div>
                        </div>
                    </div>
                </div>

                <SearchModal open={isSearchOpen} setOpen={setIsSearchOpen} />

                {/* Right side actions */}
                <div className="flex items-center gap-4">
                    <NotificationDropdown />

                    <div className="h-6 w-[1px] bg-gray-200" />

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="flex items-center gap-2 p-1 rounded-md hover:bg-gray-50 transition-colors">
                                <div className={cn(
                                    "w-8 h-8 rounded bg-white overflow-hidden flex items-center justify-center border shrink-0",
                                    roleColor.border
                                )}>
                                   <User2 className="w-4 h-4 text-gray-400" />
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


