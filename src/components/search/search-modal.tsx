import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Search,
    Car,
    User,
    FileText,
    History,
    Command,
    ArrowRight,
    SearchX
} from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { UserRole, ROLE_COLORS } from '@/types/rbac.types';
import { vehicleService } from '@/features/vehicles/services/vehicle.service';
import { useAuthStore } from '@/stores/auth-store';
import { Loader2 } from 'lucide-react';

interface SearchResult {
    id: string;
    type: 'vin' | 'license' | 'case' | 'user';
    title: string;
    subtitle: string;
    href: string;
}

export const SearchModal = ({ open, setOpen }: { open: boolean, setOpen: (open: boolean) => void }) => {
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const roleColor = (user?.role && ROLE_COLORS[user.role as UserRole]) ? ROLE_COLORS[user.role as UserRole] : ROLE_COLORS[UserRole.DVLA];

    useEffect(() => {
        const handler = setTimeout(async () => {
            if (!query) {
                setResults([]);
                return;
            }

            setIsLoading(true);
            try {
                // Base mock results
                const baseResults: SearchResult[] = ([
                    { id: '1', type: 'vin', title: 'JN1-AZ456-B', subtitle: '2010 Honda Ridgeline - Salvage Intel', href: '/vin-lookup' },
                    { id: '2', type: 'case', title: 'CASE-2024-001', subtitle: 'Under Investigation - EOCO Fraud Registry', href: '/eoco/cases' },
                    { id: '3', type: 'license', title: 'GHA-7788-2', subtitle: 'Driver License: Kwesi Arthur - Active', href: '/vehicle-history' },
                    { id: '4', type: 'vin', title: 'WBA-XYZ-991', subtitle: '2022 BMW M4 - Clean Title Check', href: '/vin-lookup' },
                ] as const).filter(r =>
                    r.title.toLowerCase().includes(query.toLowerCase()) ||
                    r.subtitle.toLowerCase().includes(query.toLowerCase())
                ) as SearchResult[];

                // Live API call if query looks like a potential VIN (min 10 chars usually, but let's allow 5+ for starts)
                if (query.length >= 5) {
                    try {
                        const response = await vehicleService.getVehicleHistory(query.toUpperCase());
                        if (response.data) {
                            const liveResult: SearchResult = {
                                id: `live-${response.data.vin}`,
                                type: 'vin',
                                title: response.data.vin,
                                subtitle: `${response.data.year} ${response.data.make} - Live Registry Record`,
                                href: '/vin-lookup'
                            };
                            // Add only if not already in mock (though mock id is different)
                            setResults([liveResult, ...baseResults.filter(r => r.title !== response.data.vin)]);
                        } else {
                            setResults(baseResults);
                        }
                    } catch (err) {
                        // Silent err, just use mocks
                        setResults(baseResults);
                    }
                } else {
                    setResults(baseResults);
                }
            } finally {
                setIsLoading(false);
            }
        }, 300);

        return () => clearTimeout(handler);
    }, [query]);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen(!open);
            }
        };

        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, [open, setOpen]);

    const handleSelect = (result: SearchResult) => {
        setOpen(false);
        setQuery('');
        if (result.type === 'vin') {
            navigate(result.href, { state: { vin: result.title } });
        } else {
            navigate(result.href);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-2xl p-0 overflow-hidden border-none bg-transparent shadow-2xl">
                <DialogTitle className="sr-only">Global Intelligence Search</DialogTitle>
                <DialogDescription className="sr-only">Search for VINs, Case IDs, or Driver Licenses across all Ghana agencies.</DialogDescription>
                <div className="bg-white rounded-xl overflow-hidden flex flex-col max-h-[80vh]">
                    <div className="relative border-b p-4 flex items-center bg-slate-50">
                        <Search className="w-5 h-5 text-slate-400 ml-2" />
                        <input
                            autoFocus
                            placeholder="Type to search intelligence (VIN, Case, License)..."
                            className="flex-1 bg-transparent border-none outline-none px-4 py-2 text-lg font-medium text-slate-900 placeholder:text-slate-400"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <div className="flex items-center gap-1.5 px-2 py-1 bg-white border rounded text-[10px] font-bold text-slate-400">
                            {isLoading ? <Loader2 className="w-3 h-3 animate-spin text-blue-500" /> : <Command className="w-3 h-3" />}
                            {isLoading ? '...' : 'K'}
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-2 scrollbar-hide min-h-[300px]">
                        {!query && (
                            <div className="p-8 text-center space-y-4">
                                <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mx-auto border border-dashed border-slate-200">
                                    <Search className="w-8 h-8 text-slate-200" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-600 uppercase tracking-widest">Global Intelligence Pulse</p>
                                    <p className="text-xs text-slate-400 mt-1">Cross-referencing databases across all Ghana agencies.</p>
                                </div>
                                <div className="grid grid-cols-2 gap-2 pt-4">
                                    <SearchShortcut label="Search VIN" shortcut="V" icon={Car} />
                                    <SearchShortcut label="Find Case" shortcut="C" icon={FileText} />
                                    <SearchShortcut label="User Intel" shortcut="U" icon={User} />
                                    <SearchShortcut label="Recent" shortcut="R" icon={History} />
                                </div>
                            </div>
                        )}

                        {query && results.length === 0 && (
                            <div className="p-12 text-center">
                                <SearchX className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                                <p className="text-slate-500 font-medium">No records found for "{query}"</p>
                                <p className="text-xs text-slate-400 mt-1">Try searching by full VIN or Case ID.</p>
                            </div>
                        )}

                        {results.length > 0 && (
                            <div className="space-y-1">
                                <p className="px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Intel results found ({results.length})</p>
                                {results.map((result) => (
                                    <button
                                        key={result.id}
                                        onClick={() => handleSelect(result)}
                                        className="w-full flex items-center gap-4 px-4 py-3 hover:bg-slate-50 transition-colors group text-left rounded-lg"
                                    >
                                        <div className={cn(
                                            "w-10 h-10 rounded-lg flex items-center justify-center border transition-colors",
                                            roleColor.bg,
                                            roleColor.border
                                        )}>
                                            <ResultIcon type={result.type} className={cn("w-5 h-5", roleColor.secondary)} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-mono font-bold text-slate-900 truncate uppercase tracking-tighter">{result.title}</p>
                                            <p className="text-xs text-slate-500 font-medium truncate">{result.subtitle}</p>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="p-4 border-t bg-slate-50/50 flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                        <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1"><kbd className="bg-white border px-1 rounded">↵</kbd> Select</span>
                            <span className="flex items-center gap-1"><kbd className="bg-white border px-1 rounded">↑↓</kbd> Navigate</span>
                        </div>
                        <span className="text-slate-500">FraudWall Auto Intel</span>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

const ResultIcon = ({ type, className }: { type: SearchResult['type'], className?: string }) => {
    switch (type) {
        case 'vin': return <Car className={className} />;
        case 'case': return <FileText className={className} />;
        case 'user': return <User className={className} />;
        case 'license': return <Search className={className} />;
        default: return <Command className={className} />;
    }
};

const SearchShortcut = ({ label, shortcut, icon: Icon }: any) => (
    <div className="flex items-center justify-between p-3 bg-white border rounded-lg hover:border-slate-300 transition-colors cursor-pointer group">
        <div className="flex items-center gap-3">
            <Icon className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
            <span className="text-[11px] font-bold text-slate-600">{label}</span>
        </div>
        <kbd className="text-[9px] font-black bg-slate-50 border px-1.5 py-0.5 rounded text-slate-400">{shortcut}</kbd>
    </div>
);
