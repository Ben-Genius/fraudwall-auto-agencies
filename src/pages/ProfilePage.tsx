import React from 'react';
import { PageContainer } from '@/components/layout/page-container';
import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import { AuthGuard } from '@/components/guards/auth-guard';
import { useAuthStore } from '@/stores/auth-store';
import { UserRole, ROLE_COLORS } from '@/types/rbac.types';
import {
    User,
    Shield,
    Key,
    Smartphone,
    Globe,
    History,
    Edit2,
    Lock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const ProfilePage: React.FC = () => {
    const { user } = useAuthStore();
    const roleColor = user?.role ? ROLE_COLORS[user.role] : ROLE_COLORS[UserRole.DVLA];

    return (
        <AuthGuard>
            <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
                <Sidebar />
                <div className="flex flex-col flex-1 overflow-hidden">
                    <Header />
                    <PageContainer>
                        <div className="flex flex-col gap-6 max-w-8xl mx-auto">
                            {/* Profile Header */}
                            <div className="bg-white border rounded-md p-8 flex flex-col md:flex-row items-center gap-8 shadow-sm">
                                <div className={cn(
                                    "w-24 h-24 rounded-md bg-white overflow-hidden flex items-center justify-center border shrink-0",
                                    roleColor.border
                                )}>
                                    <img
                                        src={roleColor.logo}
                                        alt="Agency Logo"
                                        className="w-full h-full object-contain p-2"
                                    />
                                </div>

                                <div className="flex-1 text-center md:text-left">
                                    <h1 className="text-2xl font-semibold text-gray-900">{user?.firstName} {user?.lastName}</h1>
                                    <p className="text-gray-500 font-medium">
                                        <span className={cn("font-bold uppercase", roleColor.secondary)}>{user?.role}</span> • Ghana National Service
                                    </p>
                                    <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                                        <div className="flex items-center gap-1.5 text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded border">
                                            <Shield className="w-3.5 h-3.5" />
                                            Module Access: Verified
                                        </div>
                                        <div className="flex items-center gap-1.5 text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded border">
                                            <Globe className="w-3.5 h-3.5" />
                                            Active Session
                                        </div>
                                    </div>
                                </div>
                                <Button variant="outline" className="rounded-md border-gray-200">
                                    <Edit2 className="w-4 h-4 mr-2" />
                                    Edit Profile
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Account Information */}
                                <div className="bg-white border rounded-md p-6 shadow-sm">
                                    <h3 className="font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                        <User className={cn("w-4 h-4", roleColor.secondary)} />
                                        Personal Information
                                    </h3>
                                    <div className="space-y-4">
                                        <ProfileItem label="Full Name" value={`${user?.firstName} ${user?.lastName}`} />
                                        <ProfileItem label="Official Email" value={user?.email || 'N/A'} />
                                        <ProfileItem label="Agency Role" value={user?.role || 'N/A'} />
                                        <ProfileItem label="Employee ID" value="FW-2026-9421" />
                                    </div>
                                </div>

                                {/* Security Settings */}
                                <div className="bg-white border rounded-md p-6 shadow-sm">
                                    <h3 className="font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                        <Lock className={cn("w-4 h-4", roleColor.secondary)} />
                                        Security & Access
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-3 bg-gray-50 border rounded-md">
                                            <div className="flex items-center gap-3">
                                                <Key className="w-4 h-4 text-gray-400" />
                                                <span className="text-sm font-medium text-gray-700">Change Password</span>
                                            </div>
                                            <Button variant="ghost" size="sm" className={roleColor.secondary}>Update</Button>
                                        </div>
                                        <div className="flex items-center justify-between p-3 bg-gray-50 border rounded-md">
                                            <div className="flex items-center gap-3">
                                                <Smartphone className="w-4 h-4 text-gray-400" />
                                                <span className="text-sm font-medium text-gray-700">Two-Factor Auth</span>
                                            </div>
                                            <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded border uppercase", roleColor.bg, roleColor.secondary, roleColor.border)}>Enabled</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Activity */}
                            <div className="bg-white border rounded-md p-6 shadow-sm">
                                <h3 className="font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                    <History className={cn("w-4 h-4", roleColor.secondary)} />
                                    Account Activities
                                </h3>
                                <div className="space-y-4">
                                    <ActivityRow
                                        action="VIN Lookup"
                                        details="Verified 1H8-AF123-X (Toyota Land Cruiser)"
                                        time="14 mins ago"
                                        roleColor={roleColor}
                                    />
                                    <ActivityRow
                                        action="Access Module"
                                        details="Accessed National Intelligence Dashboard"
                                        time="2 hours ago"
                                        roleColor={roleColor}
                                    />
                                    <ActivityRow
                                        action="Login"
                                        details="System access from IP 197.251.x.x"
                                        time="10 hours ago"
                                        roleColor={roleColor}
                                    />
                                </div>
                            </div>
                        </div>
                    </PageContainer>
                </div>
            </div>
        </AuthGuard>
    );
};

const ProfileItem = ({ label, value }: { label: string; value: string }) => (
    <div className="flex flex-col gap-1">
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</span>
        <span className="text-sm font-semibold text-gray-900">{value}</span>
    </div>
);

const ActivityRow = ({ action, details, time, roleColor }: { action: string; details: string; time: string; roleColor: any }) => (
    <div className="flex items-center justify-between p-4 border rounded-md bg-gray-50 hover:bg-gray-100 transition-colors">
        <div className="flex items-center gap-4">
            <div className={cn("w-8 h-8 rounded flex items-center justify-center", roleColor.bg)}>
                <History className={cn("w-4 h-4", roleColor.secondary)} />
            </div>
            <div>
                <p className="text-sm font-semibold text-gray-900">{action}</p>
                <p className="text-xs text-gray-500">{details}</p>
            </div>
        </div>
        <span className="text-[10px] font-medium text-gray-400">{time}</span>
    </div>
);

export default ProfilePage;

