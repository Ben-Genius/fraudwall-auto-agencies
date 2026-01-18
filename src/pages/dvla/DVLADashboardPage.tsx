import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/page-container';
import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import { AuthGuard } from '@/components/guards/auth-guard';
import { useAuthStore } from '@/stores/auth-store';
import { UserRole, ROLE_COLORS } from '@/types/rbac.types';
import { useNavigate } from 'react-router-dom';
import {
    Search,
    ShieldAlert,
    Car,
    Globe,
    ArrowRight
} from 'lucide-react';

import { cn } from '@/lib/utils';

const DVLADashboardPage: React.FC = () => {
    const { user } = useAuthStore();
    const navigate = useNavigate();
    const roleColor = user?.role ? ROLE_COLORS[user.role] : ROLE_COLORS[UserRole.DVLA];

    const [stats] = useState({
        internalSearches: '4',
        externalSearches: '2',
        alerts: '2'
    });
    const [recentSearches] = useState([
        { vin: '5FPYK1F50A...', make: 'Honda', year: '2010', time: '2 mins ago', status: 'Salvage', risk: 'High', type: 'external' },
        { vin: 'JN1-AZ456-B', make: 'Nissan', year: '2022', time: '15 mins ago', status: 'Clean', risk: 'Low', type: 'internal' },
        { vin: '4S3-BM789-C', make: 'Subaru', year: '2018', time: '1 hour ago', status: 'Verified', risk: 'Low', type: 'internal' },
        { vin: 'SAL-ER012-K', make: 'Range Rover', year: '2021', time: '3 hours ago', status: 'Rebuilt', risk: 'Medium', type: 'external' },
    ]);

    return (
        <AuthGuard allowedRoles={[UserRole.DVLA]}>
            <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
                <Sidebar />
                <div className="flex flex-col flex-1 overflow-hidden">
                    <Header />
                    <PageContainer>
                        <div className="flex flex-col gap-6">
                            {/* Welcome Area */}
                            <div className={cn(
                                "bg-white border-[1px] p-7 rounded-md border-l-8",
                                roleColor.border,
                                `border-l-${roleColor.secondary.split('-')[1]}-600`
                            )}>
                                <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">
                                    {user?.role} <span className={roleColor.secondary}>Terminal</span>
                                </h1>
                                <p className="text-gray-500 mt-1 font-medium">
                                    Monitoring <span className={cn("font-bold", roleColor.secondary)}>FraudWall Auto</span> data integration and vehicle verification streams.
                                </p>
                            </div>
                            <br />

                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <StatCard
                                    label="Total Internal Searches"
                                    value={stats.internalSearches}
                                    icon={Search}
                                    color={roleColor.secondary}
                                    bg={roleColor.bg}
                                />
                                <StatCard
                                    label="Total External Searches"
                                    value={stats.externalSearches}
                                    icon={Globe}
                                    color="text-emerald-600"
                                    bg="bg-emerald-50"
                                />
                                <StatCard
                                    label="Alerts & Stolen"
                                    value={stats.alerts}
                                    icon={ShieldAlert}
                                    color="text-red-600"
                                    bg="bg-red-50"
                                />
                            </div>
                            <br />

                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                                {/* Recent Searches Table */}
                                <div className="lg:col-span-3 bg-white border-[1px] rounded-xl overflow-hidden">
                                    <div className="px-6 py-5 border-b flex items-center justify-between bg-white">
                                        <div className="flex items-center gap-4">
                                            <div className={cn("w-1.5 h-8 rounded-xl", roleColor.primary)}></div>
                                            <div>
                                                <h3 className="font-semibold text-slate-800 uppercase tracking-wider text-xl leading-none">RECENT VIN SEARCHES</h3>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm text-left">
                                            <thead className="text-[12px] text-slate-600 uppercase bg-slate-50/50 border-y font-bold tracking-widest">
                                                <tr>
                                                    <th className="pl-8 py-4 font-black "> VIN </th>
                                                    <th className="px-6 py-4 font-black">Vehicle Specification</th>
                                                    <th className="px-6 py-4 font-black text-center">Protocol Origin</th>
                                                    <th className="px-6 py-4 font-black">Integrity Status</th>
                                                    <th className="px-6 py-4 font-black text-right">Verification</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100">
                                                {recentSearches.map((search, i) => (
                                                    <tr key={i} className="hover:bg-slate-50/50 transition-all duration-200 group relative">
                                                        <td className="px-6 py-5">
                                                            <div className="flex items-center gap-4">
                                                                <div className={cn(
                                                                    "w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border-[1px] transition-transform group-hover:scale-105",
                                                                    roleColor.border,
                                                                    roleColor.bg
                                                                )}>
                                                                    <Car className={cn("w-5 h-5", roleColor.secondary)} />
                                                                </div>
                                                                <div className="flex flex-col">
                                                                    <p className="font-mono font-semibold text-slate-800 uppercase tracking-widest text-sm">{search.vin}</p>
                                                                    <div className="flex items-center gap-2 mt-0.5">
                                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{search.time}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-5">
                                                            <div>
                                                                <p className="font-semibold text-slate-800 text-sm leading-none">{search.make}</p>
                                                                <p className="text-[11px] text-slate-600  mt-1 uppercase">Series {search.year}</p>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-5 text-center">
                                                            <span className={cn(
                                                                "inline-flex items-center px-3 py-1 rounded text-[10px] font-black uppercase tracking-tighter border shadow-sm",
                                                                search.type === 'internal'
                                                                    ? "bg-white text-slate-600 border-slate-200"
                                                                    : "bg-indigo-50 text-indigo-700 border-indigo-100"
                                                            )}>
                                                                {search.type === 'internal' ? 'Local DB' : 'Global API'}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-5">
                                                            <div className="flex flex-col gap-1.5">
                                                                <div className={cn(
                                                                    "flex items-center gap-2 px-2.5 py-1 rounded-md text-[10px] font-black uppercase w-fit shadow-sm border",
                                                                    search.status === 'Clean' || search.status === 'Verified'
                                                                        ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                                                                        : search.status === 'Rebuilt'
                                                                            ? "bg-amber-50 text-amber-700 border-amber-100"
                                                                            : "bg-red-50 text-red-700 border-red-100"
                                                                )}>
                                                                    <div className={cn(
                                                                        "w-1.5 h-1.5 rounded-full",
                                                                        search.status === 'Clean' || search.status === 'Verified' ? "bg-emerald-500" :
                                                                            search.status === 'Rebuilt' ? "bg-amber-500" : "bg-red-500"
                                                                    )}></div>
                                                                    {search.status}
                                                                </div>
                                                                <div className="flex items-center gap-1 ml-1">
                                                                    <span className="text-[9px] text-slate-400 font-black uppercase tracking-wider opacity-60">Risk Grade:</span>
                                                                    <span className={cn(
                                                                        "text-[9px] font-black uppercase tracking-wider",
                                                                        search.risk === 'Low' ? "text-emerald-600" : search.risk === 'Medium' ? "text-amber-600" : "text-red-600"
                                                                    )}>
                                                                        {search.risk}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-5 text-right">
                                                            <button
                                                                onClick={() => navigate('/vin-lookup', { state: { vin: search.vin } })}
                                                                className={cn(
                                                                    "p-2.5 rounded-lg border-[1px] text-slate-400 transition-all duration-300 group-hover:border-slate-900 group-hover:text-slate-900 hover:text-white hover:shadow-xl hover:-translate-y-0.5 shadow-sm",
                                                                    roleColor.border
                                                                )}
                                                            >
                                                                <ArrowRight className="w-5 h-5" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* Quick Action Grid */}
                                <div className="space-y-6">
                                    <div className="bg-white border-[1px] p-6 rounded-2xl uppercase font-black text-slate-400">
                                        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">Service Operations</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <QuickActionCard
                                                label="Scan VIN"
                                                icon={Search}
                                                onClick={() => navigate('/vin-lookup')}
                                                color={roleColor.secondary}
                                                bg={roleColor.bg}
                                            />
                                            <QuickActionCard
                                                label="Registry"
                                                icon={Car}
                                                onClick={() => navigate('/vehicle-history')}
                                                color="text-emerald-600"
                                                bg="bg-emerald-50"
                                            />
                                            <QuickActionCard
                                                label="Reports"
                                                icon={Globe}
                                                onClick={() => navigate('/reports')}
                                                color="text-amber-600"
                                                bg="bg-amber-50"
                                            />
                                            <QuickActionCard
                                                label="Alerts"
                                                icon={ShieldAlert}
                                                onClick={() => navigate('/police/stolen')}
                                                color="text-red-600"
                                                bg="bg-red-50"
                                            />
                                        </div>
                                    </div>

                                    {/* Security Insight */}
                                    <div className={cn("p-8 rounded-2xl text-white relative overflow-hidden group border-none", roleColor.primary)}>
                                        <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform">
                                            <ShieldAlert className="w-32 h-32" />
                                        </div>
                                        <h3 className="font-bold mb-2 flex items-center gap-2 text-sm uppercase tracking-tight">
                                            Verification Guard
                                        </h3>
                                        <p className="text-[11px] text-white/90 leading-relaxed font-medium">
                                            Cross-check global salvage status before authorizing any local registration.
                                        </p>
                                        <button className="mt-4 w-full py-2 bg-white/20 hover:bg-white/30 text-white rounded-md text-[10px] font-black uppercase tracking-widest transition-colors border border-white/10">
                                            Duty Protocols
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

const StatCard = ({ label, value, icon: Icon, color, bg }: any) => (
    <div className={cn(
        "p-7 rounded-xl relative overflow-hidden group transition-all duration-300",
        bg
    )}>
        {/* Decorative Background Icon */}
        <div className="absolute right-0 bottom-0 opacity-[0.07] group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500">
            <Icon className={cn("w-32 h-32", color)} />
        </div>

        <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
                <div className={cn("w-1.5 h-1.5 rounded-full", color.replace('text-', 'bg-'))}></div>
                <p className="text-[12.5px] font-black text-slate-700 uppercase tracking-[0.2em] leading-none">{label}</p>
            </div>

            <div className="flex items-baseline gap-1">
                <h3 className={cn("text-5xl font-black tracking-tighter leading-none", color)}>
                    {value}
                </h3>
                <span className="text-[11px] font-black text-slate-600 uppercase tracking-widest ml-1">Record Units</span>
            </div>


        </div>
    </div>
);

const QuickActionCard = ({ label, icon: Icon, onClick, color, bg }: any) => (
    <button
        onClick={onClick}
        className="flex flex-col items-center justify-center gap-3 p-4 rounded-2xl border-[1px] bg-slate-50 hover:bg-white hover:border-slate-900 transition-all group aspect-square"
    >
        <div className={cn("p-4 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110", bg)}>
            <Icon className={cn("w-6 h-6", color)} />
        </div>
        <span className="text-[10px] font-black text-slate-500 uppercase tracking-tight text-center">{label}</span>
    </button>
);

export default DVLADashboardPage;
