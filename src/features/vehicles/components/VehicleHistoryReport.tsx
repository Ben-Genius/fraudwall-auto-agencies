import React, { useState } from 'react';
import {
    Calendar,
    MapPin,
    ShieldAlert,
    User,
    History,
    AlertTriangle,
    CheckCircle2,
    FileText,
    Download,
    FileSpreadsheet,
    ArrowRight,
    Info
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { VehicleHistory } from '../types/vehicle.types';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

interface VehicleHistoryReportProps {
    report: VehicleHistory;
}

export const VehicleHistoryReport: React.FC<VehicleHistoryReportProps> = ({ report }) => {
    const [eventView, setEventView] = useState<'timeline' | 'list'>('timeline');

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(20);
        doc.text('Vehicle History Report', 14, 22);
        doc.setFontSize(12);
        doc.text(`VIN: ${report.vin}`, 14, 32);
        doc.text(`Vehicle: ${report.year} ${report.make}`, 14, 40);
        doc.text(`Report Date: ${new Date().toLocaleDateString()}`, 14, 48);

        // Events Table
        const eventData = (report.events || []).map(event => [
            event.date,
            event.location,
            event.odometer || 'N/A',
            (event.details || []).join(', ')
        ]);

        autoTable(doc, {
            startY: 60,
            head: [['Date', 'Location', 'Odometer', 'Details']],
            body: eventData,
        });

        doc.save(`VehicleHistory_${report.vin}.pdf`);
    };

    const exportToExcel = () => {
        const eventData = (report.events || []).map(event => ({
            Date: event.date,
            Location: event.location,
            Odometer: event.odometer,
            Details: (event.details || []).join(', '),
            Source: (event.source || []).join(', ')
        }));

        const ws = XLSX.utils.json_to_sheet(eventData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'History');
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
        saveAs(data, `VehicleHistory_${report.vin}.xlsx`);
    };

    return (
        <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Action Bar */}
            <div className="flex items-center justify-between bg-white p-4 rounded-md border shadow-sm sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100">
                        <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">Official History Report</h2>
                        <p className="text-xs text-gray-500 font-medium">Source: FraudWall Auto Intelligence</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" onClick={exportToExcel} className="h-10 text-emerald-600 border-emerald-200 hover:bg-emerald-50">
                        <FileSpreadsheet className="w-4 h-4 mr-2" />
                        Excel
                    </Button>
                    <Button onClick={exportToPDF} className="h-10 bg-blue-600 hover:bg-blue-700">
                        <Download className="w-4 h-4 mr-2" />
                        Export PDF
                    </Button>
                </div>
            </div>

            {/* Hero Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-md border shadow-sm overflow-hidden">
                        <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 text-white flex justify-between items-start">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400 mb-2 block">Vehicle Identity</span>
                                <h1 className="text-4xl font-black tracking-tight">
                                    {report.year && report.make ? `${report.year} ${report.make}` : 'Unknown Vehicle Specification'}
                                </h1>
                                <div className="mt-4 flex flex-col gap-1">
                                    <p className="text-slate-400 text-sm font-medium">Unique VIN Identifier</p>
                                    <p className="text-2xl font-mono font-bold tracking-widest text-white selection:bg-blue-500">{report.vin || 'INVALID_VIN'}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
                                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                    <span className="text-[10px] font-bold uppercase tracking-wider">Live System Data</span>
                                </div>
                                <p className="mt-4 text-[10px] text-slate-400 font-bold uppercase">Report Generated</p>
                                <p className="text-sm font-semibold">{new Date(report.retrievedAt).toLocaleString()}</p>
                            </div>
                        </div>
                        <div className="p-8">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Info className="w-3.5 h-3.5" />
                                Vehicle Narrative Summary
                            </h3>
                            <p className="text-gray-700 leading-relaxed font-medium italic">
                                {report.summary || "No automated summary narrative available for this vehicle specification. Please review the lifecycle logs below for primary intelligence."}
                            </p>
                        </div>
                    </div>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <QuickStat label="Owners" value={(report.owners?.length || 0).toString()} icon={User} color="text-blue-600" bg="bg-blue-50" />
                        <QuickStat label="Accidents" value={(report.accidents?.length || 0).toString()} icon={ShieldAlert} color={(report.accidents?.length || 0) > 0 ? "text-red-600" : "text-emerald-600"} bg={(report.accidents?.length || 0) > 0 ? "bg-red-50" : "bg-emerald-50"} />
                        <QuickStat label="Sales Records" value={(report.salesHistory?.length || 0).toString()} icon={History} color="text-amber-600" bg="bg-amber-50" />
                        <QuickStat label="Service Recalls" value={(report.recalls?.length || 0).toString()} icon={AlertTriangle} color={(report.recalls?.length || 0) > 0 ? "text-amber-600" : "text-emerald-600"} bg={(report.recalls?.length || 0) > 0 ? "bg-amber-50" : "bg-emerald-50"} />
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Title Brands & Usage */}
                    <div className="bg-white rounded-md border shadow-sm p-6 overflow-hidden">
                        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-6 flex items-center justify-between">
                            Status Indicators
                            <span className="px-2 py-0.5 rounded bg-gray-100 text-[10px]">Title Check</span>
                        </h3>
                        <div className="space-y-3">
                            {report.titleBrands ? (
                                <>
                                    {Object.entries(report.titleBrands).filter(([_, val]) => val === 'records found').map(([key]) => (
                                        <StatusBadge key={key} label={key} type="alert" />
                                    ))}
                                    {Object.entries(report.titleBrands).filter(([key, val]) => val !== 'records found' && key.includes('No')).slice(0, 5).map(([key]) => (
                                        <StatusBadge key={key} label={key} type="success" />
                                    ))}
                                </>
                            ) : (
                                <div className="p-4 rounded bg-slate-50 border border-dashed text-center">
                                    <p className="text-[10px] font-black text-slate-400 uppercase">No Title Brands Reported</p>
                                </div>
                            )}

                            <div className="pt-4 border-t mt-4">
                                <h4 className="text-[10px] font-bold text-gray-400 uppercase mb-3">Usage Profile</h4>
                                {report.usage ? Object.entries(report.usage).map(([key, val]) => (
                                    <div key={key} className="flex items-center justify-between py-1">
                                        <span className="text-xs font-medium text-gray-600">{key}</span>
                                        <span className={cn(
                                            "text-[10px] font-bold uppercase",
                                            val === 'records found' ? "text-blue-600" : "text-gray-300"
                                        )}>{val === 'records found' ? 'Confirmed' : 'None'}</span>
                                    </div>
                                )) : (
                                    <p className="text-[10px] text-slate-400 italic">No usage data found.</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-600 rounded-md shadow-lg p-6 text-white relative overflow-hidden group">
                        <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform">
                            <ShieldAlert className="w-32 h-32" />
                        </div>
                        <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                            Fraud Detection Core
                        </h3>
                        <p className="text-sm text-blue-100 leading-relaxed font-medium">
                            System analyzed {((report.accidents?.length || 0) + (report.events?.length || 0) + (report.owners?.length || 0) + (report.recalls?.length || 0) + (report.salesHistory?.length || 0)) || 'multiple'} data points. {(report.accidents?.length || 0) > 0 ? "Identified accident history in registry." : "No critical active fraud flags detected in current lifecycle."}
                        </p>
                        <Button className="mt-6 w-full bg-white text-blue-600 hover:bg-blue-50 font-bold uppercase tracking-widest text-[10px]">
                            Download Audit Certificate
                        </Button>
                    </div>
                </div>
            </div>

            {/* Event Timeline */}
            <div className="bg-white rounded-md border shadow-sm overflow-hidden mb-12">
                <div className="px-8 py-6 border-b bg-gray-50/50 flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 tracking-tight">Comprehensive Chain of Events</h3>
                        <p className="text-xs text-gray-500 font-medium mt-1 uppercase tracking-wider">Detailed lifecycle tracking from first registration</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex bg-slate-100 p-1 rounded-lg">
                            <button
                                onClick={() => setEventView('timeline')}
                                className={cn(
                                    "px-4 py-1.5 text-[10px] font-black uppercase transition-all rounded-md",
                                    eventView === 'timeline' ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                                )}
                            >
                                Timeline
                            </button>
                            <button
                                onClick={() => setEventView('list')}
                                className={cn(
                                    "px-4 py-1.5 text-[10px] font-black uppercase transition-all rounded-md",
                                    eventView === 'list' ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                                )}
                            >
                                List View
                            </button>
                        </div>
                    </div>
                </div>
                <div className="p-8">
                    {report.events && report.events.length > 0 ? (
                        eventView === 'timeline' ? (
                            <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                                {report.events.map((event) => (
                                    <div key={event._id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                                        {/* Dot */}
                                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-200 group-hover:bg-blue-600 group-hover:text-white text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-colors duration-300">
                                            {(event.details?.[0] || '').includes('Title') ? <FileText className="w-4 h-4" /> : <Calendar className="w-4 h-4" />}
                                        </div>
                                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-md border bg-white shadow-sm group-hover:border-blue-200 transition-colors">
                                            <div className="flex items-center justify-between mb-1">
                                                <div className="font-bold text-slate-900">{(event.details || []).join(', ')}</div>
                                                <time className="font-mono text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{event.date}</time>
                                            </div>
                                            <div className="flex items-center gap-4 mt-2">
                                                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                                    <MapPin className="w-3 h-3" />
                                                    {event.location}
                                                </div>
                                                {event.odometer && (
                                                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                                        <History className="w-3 h-3" />
                                                        {event.odometer} mi
                                                    </div>
                                                )}
                                            </div>
                                            <div className="mt-3 pt-3 border-t border-dashed flex items-center justify-between">
                                                <div className="flex gap-1">
                                                    {(event.source || []).map(src => (
                                                        <span key={src} className="text-[9px] font-bold uppercase text-slate-400 border px-1.5 rounded">{src}</span>
                                                    ))}
                                                </div>
                                                <button className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                                                    Details <ArrowRight className="w-3 h-3" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="overflow-hidden border rounded-xl">
                                <table className="w-full text-sm text-left">
                                    <thead className="text-[11px] text-slate-400 uppercase bg-slate-50/50 border-b font-black tracking-widest">
                                        <tr>
                                            <th className="px-6 py-4">Date</th>
                                            <th className="px-6 py-4">Event Description</th>
                                            <th className="px-6 py-4">Location</th>
                                            <th className="px-6 py-4">Odometer</th>
                                            <th className="px-6 py-4">Verification Sources</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 italic font-medium">
                                        {report.events.map((event) => (
                                            <tr key={event._id} className="hover:bg-slate-50/50 transition-colors group">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="font-mono text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-1 rounded">{event.date}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-slate-900 font-bold">{(event.details || []).join(', ')}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2 text-slate-500">
                                                        <MapPin className="w-3 h-3" />
                                                        {event.location}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {event.odometer ? (
                                                        <span className="text-slate-600 font-black">{event.odometer} mi</span>
                                                    ) : (
                                                        <span className="text-slate-300">N/A</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-wrap gap-1">
                                                        {(event.source || []).map(src => (
                                                            <span key={src} className="text-[9px] font-black uppercase text-slate-400 border px-1.5 py-0.5 rounded bg-white">{src}</span>
                                                        ))}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mb-4 border-2 border-dashed">
                                <History className="w-10 h-10 text-slate-200" />
                            </div>
                            <h4 className="text-lg font-black text-slate-900 uppercase tracking-tighter">Chain of Custody Empty</h4>
                            <p className="text-sm text-slate-500 max-w-sm mt-2 font-medium">
                                No historical lifecycle events found in the global registry for this VIN identifier.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const QuickStat = ({ label, value, icon: Icon, color, bg }: any) => (
    <div className="bg-white border p-5 rounded-md flex flex-col gap-3 shadow-sm hover:translate-y-[-2px] transition-all">
        <div className={cn("w-10 h-10 rounded flex items-center justify-center", bg)}>
            <Icon className={cn("w-5 h-5", color)} />
        </div>
        <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</p>
            <h4 className="text-xl font-black text-gray-900 mt-0.5">{value}</h4>
        </div>
    </div>
);

const StatusBadge = ({ label, type }: { label: string, type: 'alert' | 'success' }) => (
    <div className={cn(
        "flex items-center gap-2 p-2 rounded border text-xs font-semibold",
        type === 'alert' ? "bg-red-50 text-red-700 border-red-100" : "bg-emerald-50 text-emerald-700 border-emerald-100"
    )}>
        {type === 'alert' ? <ShieldAlert className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
        <span className="truncate flex-1">{label}</span>
    </div>
);
