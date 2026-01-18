import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/page-container';
import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import { AuthGuard } from '@/components/guards/auth-guard';
import {
    Plus,
    Search,
    Filter,
    Download,
    CheckCircle,
    Clock,
    AlertCircle,
    FileSearch,
    ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const FraudCasesPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const cases = [
        { id: 'CASE-9421', subject: 'Kofi Mensah', type: 'VIN Tampering', status: 'Active', date: '2026-01-10', priority: 'High', vin: '1H8-AF123-X' },
        { id: 'CASE-8822', subject: 'Abena Mansa', type: 'Stolen Vehicle', status: 'Closed', date: '2026-01-12', priority: 'Medium', vin: 'JN1-AZ456-B' },
        { id: 'CASE-4423', subject: 'Kojo Antwi', type: 'Customs Fraud', status: 'Review', date: '2026-01-14', priority: 'Low', vin: '4S3-BM789-C' },
        { id: 'CASE-2214', subject: 'Ama Serwaa', type: 'Double Registration', status: 'Flagged', date: '2026-01-15', priority: 'High', vin: 'SAL-ER012-K' },
    ];

    return (
        <AuthGuard>
            <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
                <Sidebar />
                <div className="flex flex-col flex-1 overflow-hidden">
                    <Header />
                    <PageContainer>
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                    <h1 className="text-2xl font-semibold text-gray-900">Fraud Investigations</h1>
                                    <p className="text-sm text-gray-500 mt-1">Manage and track active vehicle-related fraud cases within your scope.</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Button variant="outline" className="rounded-md h-10 border-gray-200">
                                        <Download className="w-4 h-4 mr-2" />
                                        Export
                                    </Button>
                                    <Button className="rounded-md h-10 bg-primary hover:bg-primary/90 text-white">
                                        <Plus className="w-4 h-4 mr-2" />
                                        New Case
                                    </Button>
                                </div>
                            </div>

                            {/* Search and Filters */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input
                                        placeholder="Filter by Case ID, VIN, or Subject..."
                                        className="pl-10 h-10 bg-white border-gray-200 rounded-md"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <Button variant="outline" className="h-10 rounded-md border-gray-200">
                                    <Filter className="w-4 h-4 mr-2" />
                                    More Filters
                                </Button>
                            </div>

                            {/* Cases Table */}
                            <div className="bg-white border rounded-md overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className="bg-gray-50 border-b">
                                            <tr>
                                                <th className="px-6 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Case Details</th>
                                                <th className="px-6 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Type</th>
                                                <th className="px-6 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Priority</th>
                                                <th className="px-6 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                                <th className="px-6 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Modified</th>
                                                <th className="px-6 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-right">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y">
                                            {cases.map((item) => (
                                                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <div className="flex flex-col">
                                                            <span className="text-sm font-semibold text-gray-900">{item.vin}</span>
                                                            <span className="text-xs text-gray-500">{item.id} • {item.subject}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="text-sm text-gray-600">{item.type}</span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <PriorityTag priority={item.priority} />
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <StatusBadge status={item.status} />
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-500">
                                                        {item.date}
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <button className="text-blue-600 hover:text-blue-700">
                                                            <ExternalLink className="w-4 h-4" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </PageContainer>
                </div>
            </div>
        </AuthGuard>
    );
};

const PriorityTag = ({ priority }: { priority: string }) => {
    const colors: Record<string, string> = {
        'High': 'text-red-700 bg-red-50 border-red-100',
        'Medium': 'text-orange-700 bg-orange-50 border-orange-100',
        'Low': 'text-blue-700 bg-blue-50 border-blue-100',
    };
    return (
        <span className={cn("px-2 py-0.5 rounded text-[10px] font-semibold border uppercase", colors[priority])}>
            {priority}
        </span>
    );
};

const StatusBadge = ({ status }: { status: string }) => {
    const configs: Record<string, { color: string, icon: any }> = {
        'Active': { color: 'text-blue-600 bg-blue-50 border-blue-100', icon: Clock },
        'Closed': { color: 'text-emerald-700 bg-emerald-50 border-emerald-100', icon: CheckCircle },
        'Review': { color: 'text-indigo-600 bg-indigo-50 border-indigo-100', icon: FileSearch },
        'Flagged': { color: 'text-red-700 bg-red-50 border-red-100', icon: AlertCircle },
    };

    const config = configs[status] || configs['Active'];
    const Icon = config.icon;

    return (
        <div className={cn("inline-flex items-center gap-1.5 px-2 py-0.5 rounded border text-[10px] font-semibold uppercase", config.color)}>
            <Icon className="w-3 h-3" />
            {status}
        </div>
    );
};

export default FraudCasesPage;

