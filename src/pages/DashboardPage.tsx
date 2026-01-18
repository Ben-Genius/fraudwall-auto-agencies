import React from 'react';
import { PageContainer } from '@/components/layout/page-container';
import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import { AuthGuard } from '@/components/guards/auth-guard';
import { useAuthStore } from '@/stores/auth-store';
import { UserRole, ROLE_COLORS } from '@/types/rbac.types';
import {
    Activity,
    Search,
    ShieldAlert,
    Car,
    FileText,
    BarChart3,
    CheckCircle,
    AlertTriangle,
    Clock,
    User,
    ShipIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';

const DashboardPage: React.FC = () => {
    const { user, hasRole } = useAuthStore();
    const roleColor = user?.role ? ROLE_COLORS[user.role] : ROLE_COLORS[UserRole.DVLA];

    // Mock data for different roles
    const getStats = () => {
        if (hasRole(UserRole.POLICE)) {
            return [
                { label: 'Active Alerts', value: '1,284', icon: ShieldAlert, color: 'text-red-600' },
                { label: 'Recovered Vehicles', value: '452', icon: CheckCircle, color: 'text-emerald-600' },
                { label: 'Active Investigations', value: '89', icon: Activity, color: 'text-blue-600' },
            ];
        }
        if (hasRole(UserRole.DVLA)) {
            return [
                { label: 'Pending Registrations', value: '3,412', icon: FileText, color: 'text-blue-600' },
                { label: 'Verified VINs', value: '1.2M', icon: CheckCircle, color: 'text-emerald-600' },
                { label: 'Compliance Rate', value: '94%', icon: BarChart3, color: 'text-indigo-600' },
            ];
        }
        if (hasRole(UserRole.CUSTOMS)) {
            return [
                { label: 'Import Verifications', value: '528', icon: ShipIcon, color: 'text-amber-600' },
                { label: 'Duty Exceptions', value: '12', icon: AlertTriangle, color: 'text-red-600' },
                { label: 'Clearing Agents', value: '84', icon: User, color: 'text-blue-600' },
            ];
        }
        return [
            { label: 'VIN Lookups', value: '24,592', icon: Search, color: 'text-blue-600' },
            { label: 'Flagged Activity', value: '84', icon: AlertTriangle, color: 'text-orange-600' },
            { label: 'System Requests', value: '156', icon: Clock, color: 'text-slate-600' },
        ];
    };

    const stats = getStats();

    return (
        <AuthGuard>
            <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
                <Sidebar />
                <div className="flex flex-col flex-1 overflow-hidden">
                    <Header />
                    <PageContainer>
                        <div className="flex flex-col gap-6">
                            {/* Welcome Area */}
                            <div className="bg-white border p-6 rounded-md">
                                <h1 className="text-2xl font-semibold text-gray-900">
                                    Welcome back, {user?.firstName}
                                </h1>
                                <p className="text-gray-500 mt-1">
                                    You are logged into the <span className={cn("font-bold", roleColor.secondary)}>FraudWall Auto</span> platform.
                                    Everything looks good for your current shift.
                                </p>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {stats.map((stat, i) => (
                                    <div key={i} className="bg-white border p-6 rounded-md flex items-center justify-between shadow-sm">
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                                            <h3 className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</h3>
                                        </div>
                                        <div className={cn("p-3 rounded", stat.color.replace('text-', 'bg-').replace('600', '50'))}>
                                            <stat.icon className={cn("w-6 h-6", stat.color)} />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Activity Feed */}
                                <div className="lg:col-span-2 bg-white border rounded-md overflow-hidden shadow-sm">
                                    <div className="px-6 py-4 border-b flex items-center justify-between">
                                        <h3 className="font-semibold text-gray-900">Recent Activity</h3>
                                        <button className={cn("text-sm font-medium hover:underline", roleColor.secondary)}>View all</button>
                                    </div>
                                    <div className="divide-y text-sm">
                                        {[1, 2, 3, 4].map((_, i) => (
                                            <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center">
                                                        <Car className="w-5 h-5 text-gray-400" />
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-900">VIN: 1H8-AF123-X</p>
                                                        <p className="text-xs text-gray-500">Toyota Land Cruiser • Accra, GH</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <span className={cn("px-2 py-1 text-[10px] font-bold rounded border uppercase tracking-tight", roleColor.bg, roleColor.secondary, roleColor.border)}>Verified</span>
                                                    <p className="text-[10px] text-gray-400 mt-1">2 mins ago</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Quick Tools */}
                                <div className="space-y-6">
                                    <div className="bg-white border p-6 rounded-md shadow-sm text-sm">
                                        <h3 className="font-semibold text-gray-900 mb-4">Quick Tools</h3>
                                        <div className="grid grid-cols-2 gap-3">
                                            {[
                                                { label: 'Track VIN', icon: Search },
                                                { label: 'Verify ID', icon: User },
                                                { label: 'Reports', icon: BarChart3 },
                                                { label: 'Alerts', icon: ShieldAlert },
                                            ].map((tool, i) => (
                                                <button key={i} className="flex flex-col items-center gap-2 p-4 rounded-md border bg-gray-50 hover:bg-gray-100 transition-colors group">
                                                    <tool.icon className={cn("w-5 h-5 text-gray-400 group-hover:", roleColor.secondary.replace('text-', 'text-'))} />
                                                    <span className="text-xs font-medium text-gray-600">{tool.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className={cn("p-6 rounded-md text-white shadow-lg shadow-black/5", roleColor.primary)}>
                                        <h3 className="font-semibold mb-2 flex items-center gap-2">
                                            <ShieldAlert className="w-5 h-5" />
                                            Safety Protocol
                                        </h3>
                                        <p className="text-sm text-white/90 leading-relaxed font-medium">
                                            Remember to verify all credentials against the national registry before authorizing clearance.
                                        </p>
                                        <button className="mt-4 w-full py-2 bg-white/20 hover:bg-white/30 text-white rounded-md text-sm font-semibold transition-colors border border-white/20">
                                            Review Guidelines
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </PageContainer>
                </div>
            </div>
        </AuthGuard>
    );
};

export default DashboardPage;

