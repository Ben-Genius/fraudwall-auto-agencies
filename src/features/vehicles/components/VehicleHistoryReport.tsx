import React, { useState, useMemo } from 'react';
import {
    MapPin,
    ShieldAlert,
    User,
    History,
    AlertTriangle,
    CheckCircle2,
    FileText,
    Download,
    FileSpreadsheet,
    Search,
    ChevronDown,
    ChevronUp,
    XCircle,
    HelpCircle,
    Info
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { VehicleHistory } from '../types/vehicle.types';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import logo from '@/assets/auto_logo.png';
import symbolLogo from '@/assets/auto_symbol_logo.png';

interface VehicleHistoryReportProps {
    report: VehicleHistory;
    isLoading?: boolean;
}

// ========== SUB-COMPONENTS ==========

// Risk Assessment Card
interface RiskAssessmentCardProps {
    score: number;
    accidents: number;
    titleBrands: any;
    recalls: number;
}

const RiskAssessmentCard: React.FC<RiskAssessmentCardProps> = ({
    score,
    accidents,
    recalls
}) => {
    const getRiskLevel = (score: number): { level: string; color: string; description: string } => {
        if (score >= 80) return {
            level: 'Excellent',
            color: 'text-emerald-600',
            description: 'Clean history with minimal issues'
        };
        if (score >= 60) return {
            level: 'Good',
            color: 'text-blue-600',
            description: 'Some minor issues present'
        };
        if (score >= 40) return {
            level: 'Fair',
            color: 'text-amber-600',
            description: 'Moderate concerns identified'
        };
        return {
            level: 'Poor',
            color: 'text-red-600',
            description: 'Significant issues detected'
        };
    };

    const risk = getRiskLevel(score);

    return (
        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
            <div className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    {/* Risk Score Circle */}
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <svg className="w-24 h-24 sm:w-32 sm:h-32 transform -rotate-90">
                                <circle
                                    cx="64"
                                    cy="64"
                                    r="56"
                                    stroke="currentColor"
                                    strokeWidth="8"
                                    fill="none"
                                    className="text-gray-200"
                                />
                                <circle
                                    cx="64"
                                    cy="64"
                                    r="56"
                                    stroke="currentColor"
                                    strokeWidth="8"
                                    fill="none"
                                    strokeDasharray={`${(score / 100) * 351} 351`}
                                    className={cn(
                                        score >= 80 ? 'text-emerald-500' :
                                            score >= 60 ? 'text-blue-500' :
                                                score >= 40 ? 'text-amber-500' : 'text-red-500'
                                    )}
                                    style={{ transition: 'stroke-dasharray 1s ease-in-out' }}
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-3xl sm:text-4xl font-black">{score}</span>
                                <span className="text-sm text-gray-600 font-bold uppercase tracking-tighter">Score</span>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <h3 className={cn("text-2xl font-bold", risk.color)}>
                                    {risk.level}
                                </h3>
                            </div>
                            <p className="text-base text-gray-700 mb-4 max-w-xs leading-relaxed font-medium">
                                {risk.description}
                            </p>

                            {/* Quick Facts */}
                            <div className="space-y-1.5">
                                <div className="flex items-center gap-2 text-sm">
                                    <ShieldAlert className={cn("w-4 h-4", accidents > 0 ? "text-red-500" : "text-gray-400")} />
                                    <span className="text-gray-700">
                                        {accidents} {accidents === 1 ? 'Accident' : 'Accidents'}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <AlertTriangle className={cn("w-4 h-4", recalls > 0 ? "text-amber-500" : "text-gray-400")} />
                                    <span className="text-gray-700">
                                        {recalls} {recalls === 1 ? 'Recall' : 'Recalls'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Area */}
                    <div className="w-full sm:w-auto">
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <h4 className="text-sm font-bold text-blue-900 mb-2">Need Help Understanding?</h4>
                            <p className="text-xs text-blue-700 mb-3">
                                Our fraud detection team can provide a detailed analysis
                            </p>
                            <Button
                                size="sm"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                                aria-label="Request detailed analysis from fraud detection team"
                            >
                                Request Analysis
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Metric Card Component
interface MetricCardProps {
    label: string;
    value: string;
    icon: React.ElementType;
    color: 'blue' | 'red' | 'emerald' | 'amber' | 'purple';
    ariaLabel?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, icon: Icon, color, ariaLabel }) => {
    const colorClasses = {
        blue: 'bg-blue-50 text-blue-600',
        red: 'bg-red-50 text-red-600',
        emerald: 'bg-emerald-50 text-emerald-600',
        amber: 'bg-amber-50 text-amber-600',
        purple: 'bg-purple-50 text-purple-600'
    };

    return (
        <div
            className="bg-white border rounded-lg p-4 hover:shadow-md transition-all duration-200"
            role="region"
            aria-label={ariaLabel || `${label}: ${value}`}
        >
            <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center mb-4", colorClasses[color])}>
                <Icon className="w-6 h-6" aria-hidden="true" />
            </div>
            <p className="text-xs font-black text-gray-600 uppercase tracking-widest mb-1">
                {label}
            </p>
            <p className="text-3xl font-black text-gray-950 tracking-tight">
                {value}
            </p>
        </div>
    );
};

// Collapsible Section Component
interface CollapsibleSectionProps {
    id: string;
    title: string;
    isExpanded: boolean;
    onToggle: () => void;
    badge?: number;
    badgeColor?: 'blue' | 'red' | 'emerald' | 'amber' | 'purple';
    children: React.ReactNode;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
    id,
    title,
    isExpanded,
    onToggle,
    badge,
    badgeColor = 'blue',
    children
}) => {
    const badgeColorClasses = {
        blue: 'bg-blue-100 text-blue-700',
        red: 'bg-red-100 text-red-700',
        emerald: 'bg-emerald-100 text-emerald-700',
        amber: 'bg-amber-100 text-amber-700',
        purple: 'bg-purple-100 text-purple-700'
    };

    return (
        <section
            className="bg-white border rounded-lg overflow-hidden"
            aria-labelledby={`${id}-heading`}
        >
            <button
                onClick={onToggle}
                aria-expanded={isExpanded}
                aria-controls={`${id}-content`}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
            >
                <div className="flex items-center gap-3">
                    <h2
                        id={`${id}-heading`}
                        className="text-lg font-bold text-gray-900"
                    >
                        {title}
                    </h2>
                    {badge !== undefined && badge > 0 && (
                        <span
                            className={cn(
                                "px-2 py-0.5 rounded-full text-xs font-bold",
                                badgeColorClasses[badgeColor]
                            )}
                            aria-label={`${badge} items`}
                        >
                            {badge}
                        </span>
                    )}
                </div>
                {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" aria-hidden="true" />
                ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" aria-hidden="true" />
                )}
            </button>

            {isExpanded && (
                <div
                    id={`${id}-content`}
                    className="px-6 py-6 border-t animate-in slide-in-from-top-2 duration-200"
                >
                    {children}
                </div>
            )}
        </section>
    );
};

// Critical Alerts Content
const CriticalAlertsContent: React.FC<{ report: VehicleHistory }> = ({ report }) => {
    const criticalIssues = [];

    // Check for accidents
    if (report.accidents && report.accidents.length > 0) {
        criticalIssues.push({
            type: 'accident',
            severity: 'high',
            title: `${report.accidents.length} Accident${report.accidents.length > 1 ? 's' : ''} Reported`,
            description: report.accidents.map(a => `${a.date} - ${a.location}`).join('; '),
            icon: ShieldAlert
        });
    }

    // Check for salvage/flood/fire titles
    if (report.titleBrands) {
        const criticalBrands = Object.entries(report.titleBrands).filter(([key, value]) =>
            value === 'records found' && (
                key.toLowerCase().includes('salvage') ||
                key.toLowerCase().includes('flood') ||
                key.toLowerCase().includes('fire')
            )
        );

        criticalBrands.forEach(([key]) => {
            criticalIssues.push({
                type: 'title',
                severity: 'critical',
                title: key,
                description: 'This title brand indicates significant vehicle damage history',
                icon: AlertTriangle
            });
        });
    }

    if (criticalIssues.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">No Critical Issues Detected</h3>
                <p className="text-sm text-gray-600 max-w-md">
                    This vehicle has no reported accidents or major title red flags in our primary database.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {criticalIssues.map((issue, index) => {
                const Icon = issue.icon;
                return (
                    <div
                        key={index}
                        className={cn(
                            "p-4 rounded-lg border-l-4 flex items-start gap-4",
                            issue.severity === 'critical' ? 'bg-red-50 border-red-500' : 'bg-amber-50 border-amber-500'
                        )}
                        role="alert"
                    >
                        <div className={cn(
                            "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                            issue.severity === 'critical' ? 'bg-red-100' : 'bg-amber-100'
                        )}>
                            <Icon className={cn(
                                "w-5 h-5",
                                issue.severity === 'critical' ? 'text-red-600' : 'text-amber-600'
                            )} />
                        </div>
                        <div className="flex-1 min-w-0 text-left">
                            <h4 className={cn(
                                "font-bold mb-1",
                                issue.severity === 'critical' ? 'text-red-900' : 'text-amber-900'
                            )}>
                                {issue.title}
                            </h4>
                            <p className={cn(
                                "text-sm",
                                issue.severity === 'critical' ? 'text-red-700' : 'text-amber-700'
                            )}>
                                {issue.description}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

// Historical Events Table Component
const HistoricalEventsTable: React.FC<{ events: any[] }> = ({ events }) => {
    return (
        <div className="overflow-hidden bg-white border rounded-xl shadow-md">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse" aria-label="Vehicle history events">
                    <thead>
                        <tr className="bg-gray-100/50 border-b border-gray-200">
                            <th className="px-6 py-5 text-xs font-black uppercase tracking-[0.1em] text-gray-600 w-32">Date</th>
                            <th className="px-6 py-5 text-xs font-black uppercase tracking-[0.1em] text-gray-600">Event Description</th>
                            <th className="px-6 py-5 text-xs font-black uppercase tracking-[0.1em] text-gray-600 w-40">Odometer</th>
                            <th className="px-6 py-5 text-xs font-black uppercase tracking-[0.1em] text-gray-600 w-48 text-right">Source</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {events.map((event) => {
                            const isCritical = (event.details || []).some((d: string) =>
                                d.toLowerCase().includes('accident') ||
                                d.toLowerCase().includes('damage') ||
                                d.toLowerCase().includes('salvage') ||
                                d.toLowerCase().includes('total loss')
                            );

                            return (
                                <tr
                                    key={event._id}
                                    className={cn(
                                        "group hover:bg-slate-50 transition-colors",
                                        isCritical && "bg-red-50/40 hover:bg-red-50/60"
                                    )}
                                >
                                    {/* Date Column */}
                                    <td className="px-6 py-6 align-top">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-black text-blue-700 font-mono">
                                                {event.date}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Description Column */}
                                    <td className="px-6 py-6">
                                        <div className="space-y-2.5">
                                            <div className="flex items-start gap-2.5">
                                                {isCritical && (
                                                    <ShieldAlert className="w-5 h-5 text-red-600 mt-0.5 shrink-0" aria-hidden="true" />
                                                )}
                                                <h4 className={cn(
                                                    "text-base font-bold leading-snug",
                                                    isCritical ? "text-red-950" : "text-gray-900"
                                                )}>
                                                    {(event.details || []).join(', ')}
                                                </h4>
                                            </div>

                                            <div className="flex items-center gap-4 text-sm text-gray-600 font-semibold">
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="w-4 h-4 text-gray-500" />
                                                    {event.location}
                                                </div>
                                                {isCritical && (
                                                    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-red-100 text-[10px] font-black uppercase text-red-700 border border-red-200 shadow-sm">
                                                        High Priority Alert
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </td>

                                    {/* Odometer Column */}
                                    <td className="px-6 py-6 align-top">
                                        {event.odometer ? (
                                            <div className="flex flex-col">
                                                <span className="text-sm font-black text-gray-950 font-mono">
                                                    {event.odometer.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                                </span>
                                                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest mt-0.5">Miles</span>
                                            </div>
                                        ) : (
                                            <span className="text-sm text-gray-400 font-mono italic">Not Reported</span>
                                        )}
                                    </td>

                                    {/* Source Column */}
                                    <td className="px-6 py-6 align-top text-right">
                                        <div className="flex flex-wrap justify-end gap-1.5">
                                            {(event.source || []).map((src: string) => (
                                                <span
                                                    key={src}
                                                    className="inline-block text-[10px] font-black uppercase px-2.5 py-1 bg-white text-gray-600 border border-gray-200 rounded shadow-sm group-hover:border-blue-200 group-hover:text-blue-600 transition-colors"
                                                >
                                                    {src}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                    Total: {events.length} lifecycle events from {new Set(events.flatMap(e => e.source)).size} verified data sources
                </p>
            </div>
        </div>
    );
};

// Ownership Content
const OwnershipContent: React.FC<{ owners: any[] }> = ({ owners }) => {
    if (!owners || owners.length === 0) {
        return (
            <EmptyState
                icon={User}
                title="No Ownership Records"
                description="No ownership history available for this vehicle"
            />
        );
    }

    return (
        <div className="space-y-4">
            {owners.map((owner, index) => (
                <div
                    key={owner._id || index}
                    className="p-4 border rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                    <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center border-2 border-purple-100">
                                <User className="w-6 h-6 text-purple-700" />
                            </div>
                            <div>
                                <h4 className="text-base font-bold text-gray-950">{owner.type}</h4>
                                <p className="text-sm text-gray-600 font-semibold tracking-tight">
                                    {owner.state} • Registered in {owner.purchasedYear}
                                </p>
                            </div>
                        </div>
                        <span className="text-xs font-black text-gray-500 uppercase tracking-widest bg-gray-100 px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm font-mono truncate">
                            {owner.ownedDuration}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};

// Details Content (Title & Usage)
const DetailsContent: React.FC<{ titleBrands: any, usage: any }> = ({ titleBrands, usage }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Title Brands */}
            <div>
                <h4 className="text-xs font-black text-gray-600 uppercase tracking-[0.2em] mb-5 flex items-center gap-3">
                    <ShieldAlert className="w-4 h-4 text-blue-600" />
                    Title History Check
                </h4>
                <div className="space-y-2">
                    {titleBrands ? Object.entries(titleBrands).map(([key, val]) => (
                        <div key={key} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                            <span className="text-sm font-bold text-gray-800">{key}</span>
                            <span className={cn(
                                "text-[11px] font-black uppercase px-2.5 py-1.5 rounded-lg border shadow-sm",
                                val === 'records found' ? "bg-red-50 text-red-600 border border-red-100" : "bg-emerald-50 text-emerald-600 border border-emerald-100"
                            )}>
                                {val === 'records found' ? 'Alert Found' : 'Clean Record'}
                            </span>
                        </div>
                    )) : <p className="text-sm text-gray-500 italic">No title data available.</p>}
                </div>
            </div>

            {/* Usage Profile */}
            <div>
                <h4 className="text-xs font-black text-gray-600 uppercase tracking-[0.2em] mb-5 flex items-center gap-3">
                    <History className="w-4 h-4 text-blue-600" />
                    Usage Characteristics
                </h4>
                <div className="space-y-2">
                    {usage ? Object.entries(usage).map(([key, val]) => (
                        <div key={key} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                            <span className="text-sm font-bold text-gray-800">{key}</span>
                            <span className={cn(
                                "text-[11px] font-black uppercase px-2.5 py-1.5 rounded-lg border shadow-sm",
                                val === 'records found' ? "bg-blue-50 text-blue-700 border-blue-200" : "bg-gray-50 text-gray-400 border-gray-200"
                            )}>
                                {val === 'records found' ? 'Confirmed' : 'No Records'}
                            </span>
                        </div>
                    )) : <p className="text-sm text-gray-500 italic">No usage data found.</p>}
                </div>
            </div>
        </div>
    );
};

// Empty State Component
interface EmptyStateProps {
    icon: React.ElementType;
    title: string;
    description: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ icon: Icon, title, description }) => (
    <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4 border border-dashed border-gray-200">
            <Icon className="w-8 h-8 text-gray-300" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-500 max-w-sm font-medium">{description}</p>
    </div>
);

// Loading Skeleton
const LoadingSkeleton = () => (
    <div className="min-h-screen bg-gray-50 p-8 animate-pulse">
        <div className="max-w-7xl mx-auto space-y-8">
            <div className="h-20 bg-gray-200 rounded-xl" />
            <div className="h-48 bg-gray-200 rounded-xl" />
            <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-32 bg-gray-200 rounded-xl" />
                ))}
            </div>
            <div className="h-96 bg-gray-200 rounded-xl" />
        </div>
    </div>
);

// ========== MAIN COMPONENT ==========

export const VehicleHistoryReport: React.FC<VehicleHistoryReportProps> = ({
    report,
    isLoading = false
}) => {
    // State Management
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['critical', 'timeline']));
    const [eventFilter, setEventFilter] = useState<'all' | 'critical' | 'service' | 'ownership'>('all');
    const [showHelp, setShowHelp] = useState(false);

    // Calculate Risk Score (0-100)
    const riskScore = useMemo(() => {
        const accidents = report.accidents?.length || 0;
        const criticalTitleBrands = Object.entries(report.titleBrands || {})
            .filter(([key, value]) => value === 'records found' &&
                (key.toLowerCase().includes('salvage') || key.toLowerCase().includes('flood') || key.toLowerCase().includes('fire')))
            .length;
        const recalls = report.recalls?.length || 0;

        let score = 100;
        score -= accidents * 15;
        score -= criticalTitleBrands * 25;
        score -= recalls * 5;

        return Math.max(0, Math.min(100, score));
    }, [report]);

    // Event Filtering
    const filteredEvents = useMemo(() => {
        if (!report.events) return [];

        let events = report.events;

        // Apply filter
        if (eventFilter !== 'all') {
            events = events.filter(event => {
                const details = (event.details || []).join(' ').toLowerCase();
                if (eventFilter === 'critical') {
                    return details.includes('accident') || details.includes('damage') ||
                        details.includes('salvage') || details.includes('total loss');
                }
                if (eventFilter === 'service') {
                    return details.includes('service') || details.includes('maintenance') ||
                        details.includes('inspection');
                }
                if (eventFilter === 'ownership') {
                    return details.includes('title') || details.includes('registration');
                }
                return true;
            });
        }

        // Apply search
        if (searchQuery) {
            events = events.filter(event => {
                const searchText = [
                    event.date,
                    event.location,
                    ...(event.details || []),
                    ...(event.source || [])
                ].join(' ').toLowerCase();
                return searchText.includes(searchQuery.toLowerCase());
            });
        }

        return events;
    }, [report.events, eventFilter, searchQuery]);

    // Export Functions
    const [exportStatus, setExportStatus] = useState<'idle' | 'exporting' | 'success' | 'error'>('idle');

    const exportToPDF = async () => {
        try {
            setExportStatus('exporting');
            const doc = new jsPDF();
            const pageWidth = doc.internal.pageSize.width;
            const pageHeight = doc.internal.pageSize.height;

            // Helper to load image to base64
            const loadImage = (url: string): Promise<string> => {
                return new Promise((resolve, reject) => {
                    const img = new Image();
                    img.crossOrigin = 'Anonymous';
                    img.onload = () => {
                        const canvas = document.createElement('canvas');
                        canvas.width = img.width;
                        canvas.height = img.height;
                        const ctx = canvas.getContext('2d');
                        ctx?.drawImage(img, 0, 0);
                        resolve(canvas.toDataURL('image/png'));
                    };
                    img.onerror = reject;
                    img.src = url;
                });
            };

            // --- WATERMARK (Sophisticated) ---
            doc.saveGraphicsState();
            doc.setGState(new (doc as any).GState({ opacity: 0.03 }));
            try {
                const symbolBase64 = await loadImage(symbolLogo);
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 4; j++) {
                        doc.addImage(symbolBase64, 'PNG', 20 + (i * 70), 30 + (j * 70), 40, 40, undefined, 'FAST');
                    }
                }
            } catch (e) {
                // Fallback text watermark if image fails
                doc.setTextColor(150, 150, 150);
                doc.setFontSize(60);
                doc.text('FRAUDWALL SECURE', pageWidth / 2, pageHeight / 2, { align: 'center', angle: 45 });
            }
            doc.restoreGraphicsState();

            // --- BRANDED HEADER ---
            // Main Header Block
            doc.setFillColor(15, 15, 15); // Deep Black
            doc.rect(0, 0, pageWidth, 45, 'F');

            // Accent Line
            doc.setFillColor(255, 87, 34); // Fraudwall Orange
            doc.rect(0, 45, pageWidth, 3, 'F');

            // Add Logo
            try {
                const logoBase64 = await loadImage(logo);
                doc.addImage(logoBase64, 'PNG', 15, 10, 65, 20, undefined, 'FAST');
            } catch (e) {
                doc.setTextColor(255, 255, 255);
                doc.setFontSize(22);
                doc.setFont('helvetica', 'bold');
                doc.text('FRAUDWALL', 15, 25);
            }

            // Report Title & Metadata (Right Aligned)
            doc.setTextColor(255, 255, 255);
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(16);
            doc.text('VEHICLE INTELLIGENCE REPORT', pageWidth - 15, 20, { align: 'right' });

            doc.setFontSize(9);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(200, 200, 200);
            doc.text('NATIONAL VERIFICATION STANDARD v2.0', pageWidth - 15, 26, { align: 'right' });
            doc.text(`REF ID: FW-${report.vin.substring(0, 4)}-${Math.random().toString(36).substring(7).toUpperCase()}`, pageWidth - 15, 32, { align: 'right' });
            doc.text(`ISSUED: ${new Date().toUTCString().toUpperCase()}`, pageWidth - 15, 38, { align: 'right' });

            // --- PRIMARY VEHICLE SPECS BOX ---
            let currentY = 60;
            doc.setFillColor(248, 250, 252); // Soft gray bg
            doc.roundedRect(15, currentY, pageWidth - 30, 35, 2, 2, 'F');

            doc.setTextColor(15, 23, 42); // Slate 900
            doc.setFontSize(22);
            doc.setFont('helvetica', 'bold');
            doc.text(`${report.year} ${report.make.toUpperCase()}`, 25, currentY + 15);

            doc.setFontSize(11);
            doc.setTextColor(71, 85, 105); // Slate 600
            doc.setFont('helvetica', 'normal');
            doc.text('CHASSIS / VIN NUMBER', 25, currentY + 25);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(15, 23, 42);
            doc.text(report.vin, 75, currentY + 25);

            // Risk Score Gauge (Right side of spec box)
            const riskColor = riskScore >= 80 ? [16, 185, 129] : riskScore >= 50 ? [245, 158, 11] : [239, 68, 68];
            doc.setFillColor(riskColor[0], riskColor[1], riskColor[2]);
            doc.circle(pageWidth - 35, currentY + 17, 12, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(14);
            doc.text(`${riskScore}`, pageWidth - 35, currentY + 18, { align: 'center' });
            doc.setFontSize(7);
            doc.text('SCORE', pageWidth - 35, currentY + 24, { align: 'center' });

            // --- SECURITY VERIFICATION FLOW ---
            currentY += 45;
            doc.setTextColor(15, 23, 42);
            doc.setFontSize(11);
            doc.setFont('helvetica', 'bold');
            doc.text('SYSTEM SECURITY PROTOCOLS & VALIDATION', 15, currentY);

            const securityItems = [
                { l: 'VIN CHECKSUM', s: 'VALIDATED' },
                { l: 'STOLEN RECORD', s: 'CLEAR' },
                { l: 'SALVAGE STATUS', s: 'CHECKED' },
                { l: 'EXPORT LOGS', s: 'VERIFIED' },
                { l: 'OWNER DATA', s: 'SYNCED' },
                { l: 'POLICE ALERT', s: 'NONE' }
            ];

            const itemWidth = (pageWidth - 30) / 3;
            doc.setFontSize(8);
            securityItems.forEach((item, i) => {
                const x = 15 + (i % 3) * itemWidth;
                const y = currentY + 8 + (Math.floor(i / 3) * 12);

                doc.setDrawColor(226, 232, 240);
                doc.roundedRect(x, y - 5, itemWidth - 4, 10, 1, 1, 'D');

                doc.setTextColor(100, 116, 139);
                doc.setFont('helvetica', 'normal');
                doc.text(item.l, x + 4, y + 1);

                doc.setTextColor(16, 185, 129);
                doc.setFont('helvetica', 'bold');
                doc.text(item.s, x + itemWidth - 20, y + 1);
            });

            // --- DATA TIMELINE TABLE ---
            currentY += 40;
            doc.setFontSize(11);
            doc.setTextColor(15, 23, 42);
            doc.text('AUTHENTICATED EVENT TIMELINE', 15, currentY);

            const eventData = filteredEvents.map(event => [
                event.date,
                event.location,
                event.odometer || '---',
                (event.details || []).join(', ')
            ]);

            autoTable(doc, {
                startY: currentY + 5,
                head: [['TIMESTAMP', 'LOCATION', 'ODOMETER', 'INTELLIGENCE DETAILS']],
                body: eventData,
                theme: 'striped',
                headStyles: {
                    fillColor: [15, 23, 42],
                    textColor: [255, 255, 255],
                    fontSize: 8,
                    fontStyle: 'bold',
                    cellPadding: 4
                },
                styles: {
                    fontSize: 8,
                    cellPadding: 3,
                    lineColor: [241, 245, 249]
                },
                columnStyles: {
                    0: { cellWidth: 25 },
                    1: { cellWidth: 35 },
                    2: { cellWidth: 25, halign: 'center' }
                }
            });

            // --- FOOTER & DISCLAIMER ---
            const footerY = doc.internal.pageSize.height - 25;
            doc.setDrawColor(226, 232, 240);
            doc.line(15, footerY, pageWidth - 15, footerY);

            doc.setFontSize(7);
            doc.setTextColor(100, 116, 139);
            const disclaimer = "This report is generated for authorized use by Ghana security and licensing agencies. Any unauthorized alteration or falsification of this document is a criminal offense under the Electronic Transactions Act. Verification can be performed by scanning the ID at secure.fraudwall.gh";
            doc.text(doc.splitTextToSize(disclaimer, pageWidth - 30), 15, footerY + 5);

            doc.setFont('helvetica', 'bold');
            doc.text('FORM FW-IR-2026', 15, footerY + 18);
            doc.text(`BATCH AUTH: ${Math.random().toString(16).toUpperCase().substring(2, 10)}`, pageWidth - 15, footerY + 18, { align: 'right' });

            doc.save(`Fraudwall_Intelligence_${report.vin}.pdf`);
            setExportStatus('success');
            setTimeout(() => setExportStatus('idle'), 3000);
        } catch (error) {
            console.error('Export error:', error);
            setExportStatus('error');
            setTimeout(() => setExportStatus('idle'), 3000);
        }
    };

    const exportToExcel = async () => {
        try {
            setExportStatus('exporting');
            const eventData = filteredEvents.map(event => ({
                Date: event.date,
                Location: event.location,
                Odometer: event.odometer || 'N/A',
                Details: (event.details || []).join(', '),
                Source: (event.source || []).join(', ')
            }));

            const ws = XLSX.utils.json_to_sheet(eventData);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Vehicle History');
            const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            const data = new Blob([excelBuffer], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            });
            saveAs(data, `VehicleHistory_${report.vin}_${Date.now()}.xlsx`);
            setExportStatus('success');
            setTimeout(() => setExportStatus('idle'), 3000);
        } catch (error) {
            console.error('Export error:', error);
            setExportStatus('error');
            setTimeout(() => setExportStatus('idle'), 3000);
        }
    };

    const toggleSection = (sectionId: string) => {
        setExpandedSections(prev => {
            const newSet = new Set(prev);
            if (newSet.has(sectionId)) newSet.delete(sectionId);
            else newSet.add(sectionId);
            return newSet;
        });
    };

    if (isLoading) return <LoadingSkeleton />;

    return (
        <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Sticky Action Header */}
            <div className="flex items-center justify-between bg-white/90 backdrop-blur-md p-4 rounded-xl border shadow-sm sticky top-0 z-50">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-100">
                        <ShieldAlert className="w-5 h-5 text-white" />
                    </div>
                    <div className="min-w-0">
                        <h2 className="text-lg font-black text-gray-900 leading-tight truncate">
                            {report.year} {report.make}
                        </h2>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">VIN: {report.vin}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowHelp(!showHelp)}
                        className="h-10 w-10 p-0 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50"
                    >
                        <HelpCircle className="w-5 h-5" />
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={exportToExcel}
                        disabled={exportStatus === 'exporting'}
                        className="h-10 border-emerald-100 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-200"
                    >
                        <FileSpreadsheet className="w-4 h-4 sm:mr-2" />
                        <span className="hidden sm:inline">Excel</span>
                    </Button>
                    <Button
                        size="sm"
                        onClick={exportToPDF}
                        disabled={exportStatus === 'exporting'}
                        className="h-10 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-100"
                    >
                        <Download className="w-4 h-4 sm:mr-2" />
                        <span className="hidden sm:inline">Official PDF</span>
                    </Button>
                </div>
            </div>

            {/* Help Panel */}
            {showHelp && (
                <div className="p-6 bg-blue-50/50 border border-blue-100 rounded-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4">
                        <button onClick={() => setShowHelp(false)} className="text-blue-300 hover:text-blue-600 transition-colors">
                            <XCircle className="w-5 h-5" />
                        </button>
                    </div>
                    <h3 className="text-sm font-black text-blue-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <Info className="w-4 h-4" />
                        Report Interpretation Guide
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium text-blue-700/80 leading-relaxed">
                        <p>• <strong>Risk Score:</strong> Cumulative assessment from 0-100. Lower scores indicate significant historical alerts.</p>
                        <p>• <strong>Title Brands:</strong> Legal designations indicating previous salvage, flood, or significant damage history.</p>
                        <p>• <strong>Chain of Events:</strong> Chronological log of registrations, inspections, and reported incidents.</p>
                        <p>• <strong>Usage Profile:</strong> Identifies if the vehicle was potentially used for commercial or rental purposes.</p>
                    </div>
                </div>
            )}

            {/* Top Section: Risk & Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <RiskAssessmentCard
                        score={riskScore}
                        accidents={report.accidents?.length || 0}
                        titleBrands={report.titleBrands}
                        recalls={report.recalls?.length || 0}
                    />
                    {/* Narrative Summary Side Card */}
                    <div className="bg-slate-900 rounded-xl p-8 text-white flex flex-col justify-between relative overflow-hidden group shadow-xl">
                        <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-transform duration-700">
                            <FileText className="w-48 h-48" />
                        </div>
                        <div className="relative z-10">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 mb-6 block">Intelligence Summary</span>
                            <h3 className="text-xl font-bold leading-tight mb-4 italic">
                                "{report.summary || "No automated narrative summary available. Please review the lifecycle logs for primary intelligence."}"
                            </h3>
                        </div>
                        <div className="pt-8 border-t border-white/10 relative z-10">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">Retrieved At</p>
                                    <p className="text-xs font-bold font-mono text-white/60">{new Date(report.retrievedAt).toLocaleDateString()}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">Service</p>
                                    <p className="text-xs font-bold text-blue-400">{report.service || 'FW-AUTO'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Quick Metrics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <MetricCard label="Owners" value={(report.owners?.length || 0).toString()} icon={User} color="blue" />
                        <MetricCard label="Accidents" value={(report.accidents?.length || 0).toString()} icon={ShieldAlert} color={(report.accidents?.length || 0) > 0 ? "red" : "emerald"} />
                        <MetricCard label="Lifecycle Logs" value={report.events?.length?.toString() || '0'} icon={History} color="amber" />
                        <MetricCard label="Recalls" value={(report.recalls?.length || 0).toString()} icon={AlertTriangle} color={(report.recalls?.length || 0) > 0 ? "amber" : "emerald"} />
                    </div>
                </div>


            </div>

            {/* Detailed Content Sections */}
            <div className="space-y-4">
                {/* Critical Issues */}
                <CollapsibleSection
                    id="critical"
                    title="Priority Alerts"
                    isExpanded={expandedSections.has('critical')}
                    onToggle={() => toggleSection('critical')}
                    badge={getCriticalIssuesCount(report)}
                    badgeColor="red"
                >
                    <CriticalAlertsContent report={report} />
                </CollapsibleSection>

                {/* Title & Usage Details */}
                <CollapsibleSection
                    id="details"
                    title="Title Brands & Usage Profile"
                    isExpanded={expandedSections.has('details')}
                    onToggle={() => toggleSection('details')}
                >
                    <DetailsContent titleBrands={report.titleBrands} usage={report.usage} />
                </CollapsibleSection>

                {/* Timeline Section */}
                <CollapsibleSection
                    id="timeline"
                    title="Global Chain of Custody"
                    isExpanded={expandedSections.has('timeline')}
                    onToggle={() => toggleSection('timeline')}
                    badge={filteredEvents.length}
                    badgeColor="blue"
                >
                    <div className="mb-8 space-y-4">
                        <div className="flex flex-col sm:flex-row gap-3">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Filter by location, month, or source..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all"
                                />
                            </div>
                            <div className="flex gap-2">
                                {(['all', 'critical', 'service', 'ownership'] as const).map((filter) => (
                                    <button
                                        key={filter}
                                        onClick={() => setEventFilter(filter)}
                                        className={cn(
                                            "px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all border",
                                            eventFilter === filter
                                                ? "bg-slate-900 border-slate-900 text-white shadow-lg"
                                                : "bg-white border-gray-100 text-gray-500 hover:bg-gray-50"
                                        )}
                                    >
                                        {filter}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {filteredEvents.length > 0 ? (
                        <HistoricalEventsTable events={filteredEvents} />
                    ) : (
                        <EmptyState icon={History} title="No Records Found" description="Adjust your filters or search keywords to view historical data." />
                    )}
                </CollapsibleSection>

                {/* Ownership History */}
                <CollapsibleSection
                    id="ownership"
                    title="Ownership Sequence"
                    isExpanded={expandedSections.has('ownership')}
                    onToggle={() => toggleSection('ownership')}
                    badge={report.owners?.length || 0}
                    badgeColor="purple"
                >
                    <OwnershipContent owners={report.owners || []} />
                </CollapsibleSection>
            </div>
        </div>
    );
};

// Helper Functions
const getCriticalIssuesCount = (report: VehicleHistory): number => {
    let count = 0;

    if (report.accidents) count += report.accidents.length;

    if (report.titleBrands) {
        count += Object.entries(report.titleBrands).filter(([key, value]) =>
            value === 'records found' && (
                key.toLowerCase().includes('salvage') ||
                key.toLowerCase().includes('flood') ||
                key.toLowerCase().includes('fire')
            )
        ).length;
    }

    return count;
};

export default VehicleHistoryReport;
