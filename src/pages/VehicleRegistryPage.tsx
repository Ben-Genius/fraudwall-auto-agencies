import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/page-container';
import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import { AuthGuard } from '@/components/guards/auth-guard';
import {
    Plus,
    Search,
    Grid2X2,
    List,
    ChevronRight,
    Car,
    Shield,
    Hash,
    MapPin,
    Activity,
    FileText,
    MoreHorizontal
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const VehicleRegistryPage: React.FC = () => {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    const vehicles = [
        { id: 'GH-9421-A', model: 'Toyota Land Cruiser V8', manufacturer: 'Toyota', year: '2023', owner: 'Kofi Mensah', vin: '1H8-AF123-X', region: 'Greater Accra', status: 'Verified' },
        { id: 'GH-8822-B', model: 'Range Rover Sport', manufacturer: 'Land Rover', year: '2022', owner: 'Abena Mansa', vin: 'JN1-AZ456-B', region: 'Ashanti', status: 'Flagged' },
        { id: 'GH-4423-C', model: 'Mercedes-Benz G63', manufacturer: 'Mercedes-Benz', year: '2024', owner: 'Kojo Antwi', vin: '4S3-BM789-C', region: 'Central', status: 'Review' },
        { id: 'GH-2214-D', model: 'Ford Raptor F-150', manufacturer: 'Ford', year: '2023', owner: 'Ama Serwaa', vin: 'SAL-ER012-K', region: 'Western', status: 'Verified' },
        { id: 'GH-1025-E', model: 'Porsche Cayenne', manufacturer: 'Porsche', year: '2021', owner: 'Kwesi Appiah', vin: 'GH-POL-942', region: 'Greater Accra', status: 'Verified' },
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
                                    <h1 className="text-2xl font-semibold text-gray-900">National Vehicle Registry</h1>
                                    <p className="text-sm text-gray-500 mt-1">Unified database for vehicle verification and cross-referencing.</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Button variant="outline" className="rounded-md h-10 border-gray-200">
                                        <FileText className="w-4 h-4 mr-2" />
                                        Export Data
                                    </Button>
                                    <Button className="rounded-md h-10 bg-primary hover:bg-primary/90 text-white">
                                        <Plus className="w-4 h-4 mr-2" />
                                        Register Vehicle
                                    </Button>
                                </div>
                            </div>

                            {/* Filters and View Toggle */}
                            <div className="flex flex-col sm:flex-row gap-4 items-center">
                                <div className="relative flex-1 w-full">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input
                                        placeholder="Search by VIN, Plate, or Owner..."
                                        className="pl-10 h-10 bg-white border-gray-200 rounded-md"
                                    />
                                </div>
                                <div className="flex items-center bg-gray-100 p-1 rounded-md">
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={cn(
                                            "p-1.5 rounded-md transition-colors",
                                            viewMode === 'grid' ? "bg-white text-blue-600 shadow-sm" : "text-gray-500"
                                        )}
                                    >
                                        <Grid2X2 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={cn(
                                            "p-1.5 rounded-md transition-colors",
                                            viewMode === 'list' ? "bg-white text-blue-600 shadow-sm" : "text-gray-500"
                                        )}
                                    >
                                        <List className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Vehicle Grid */}
                            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                                {vehicles.map((v) => (
                                    <div key={v.id} className="bg-white border rounded-md overflow-hidden group">
                                        <div className="px-6 py-4 border-b flex items-center justify-between">
                                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{v.id}</span>
                                            <StatusTag status={v.status} />
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-4">{v.model}</h3>
                                            <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                                                <InfoItem icon={Hash} label="VIN" value={v.vin} />
                                                <InfoItem icon={MapPin} label="Region" value={v.region} />
                                                <InfoItem icon={Shield} label="Year" value={v.year} />
                                                <InfoItem icon={Activity} label="Owner" value={v.owner} />
                                            </div>
                                        </div>
                                        <div className="px-6 py-4 bg-gray-50 border-t flex items-center justify-between">
                                            <button className="text-sm font-medium text-blue-600 hover:text-blue-700 inline-flex items-center gap-1">
                                                Full History
                                                <ChevronRight className="w-4 h-4" />
                                            </button>
                                            <button className="text-gray-400 hover:text-gray-600">
                                                <MoreHorizontal className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </PageContainer>
                </div>
            </div>
        </AuthGuard>
    );
};

const InfoItem = ({ icon: Icon, label, value }: { icon: any, label: string, value: string }) => (
    <div className="flex flex-col">
        <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-tight mb-1">{label}</span>
        <div className="flex items-center gap-2">
            <Icon className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <span className="text-sm font-medium text-gray-700 truncate">{value}</span>
        </div>
    </div>
);

const StatusTag = ({ status }: { status: string }) => {
    const colors: Record<string, string> = {
        'Verified': 'bg-emerald-50 text-emerald-700 border-emerald-100',
        'Review': 'bg-amber-50 text-amber-700 border-amber-100',
        'Flagged': 'bg-red-50 text-red-700 border-red-100',
    };
    return (
        <span className={cn("px-2 py-0.5 rounded text-[10px] font-semibold border uppercase tracking-wider", colors[status] || colors['Verified'])}>
            {status}
        </span>
    );
};

export default VehicleRegistryPage;
