import React from 'react';
import { PageContainer } from '@/components/layout/page-container';
import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import { AuthGuard } from '@/components/guards/auth-guard';
import {
    Download,
    TrendingUp,
    Smartphone,
    Building2,
    CheckCircle2,
    Clock,
    MoreHorizontal,
    Search,
    ArrowUpRight,
    ArrowDownLeft,
    FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const PaymentsPage: React.FC = () => {
    const transactions = [
        { id: 'TXN-9421', desc: 'VIN Decode Service', amount: 'GH₵ 50.00', status: 'Completed', date: 'Jan 16, 2026', method: 'Mobile Money' },
        { id: 'TXN-9422', desc: 'Vehicle History Report', amount: 'GH₵ 120.00', status: 'Pending', date: 'Jan 15, 2026', method: 'Bank Card' },
        { id: 'TXN-9423', desc: 'Bulk Agency Verification', amount: 'GH₵ 2,500.00', status: 'Completed', date: 'Jan 14, 2026', method: 'Bank Transfer' },
        { id: 'TXN-9424', desc: 'Customs Clearance Check', amount: 'GH₵ 250.00', status: 'Failed', date: 'Jan 12, 2026', method: 'Mobile Money' },
    ];

    return (
        <AuthGuard>
            <div className="flex h-screen overflow-hidden bg-background">
                <Sidebar />
                <div className="flex flex-col flex-1 overflow-hidden font-sans">
                    <Header />
                    <PageContainer>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight">Financial Operations</h1>
                                <p className="text-muted-foreground mt-1">Manage agency credits, service fees, and transaction reconciliation.</p>
                            </div>
                            <Button className="rounded-2xl h-12 px-8 bg-primary hover:bg-primary/90 text-white border-none shadow-lg shadow-primary/20 font-bold group">
                                Purchase Credits
                                <ArrowUpRight className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </Button>
                        </div>

                        {/* Top Cards Section */}
                        <div className="grid gap-6 md:grid-cols-3">
                            <div className="col-span-1 md:col-span-2 bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden group premium-shadow">
                                <div className="absolute right-0 top-0 w-1/3 h-full bg-primary/20 blur-3xl rounded-full" />
                                <div className="relative z-10">
                                    <span className="text-primary font-bold uppercase tracking-[0.2em] text-[10px] mb-4 block animate-in">Agency Balance</span>
                                    <h2 className="text-5xl font-black tracking-tighter mb-8">GH₵ 4,250.00</h2>
                                    <div className="flex gap-4">
                                        <Button className="bg-white text-black hover:bg-white/90 rounded-2xl h-12 px-6 font-bold shadow-xl border-none">
                                            Top Up
                                        </Button>
                                        <Button variant="outline" className="bg-white/10 hover:bg-white/20 border-white/20 text-white rounded-2xl h-12 px-6">
                                            Usage Stats
                                        </Button>
                                    </div>
                                </div>
                                <div className="absolute top-10 right-10">
                                    <TrendingUp className="w-16 h-16 text-primary/30 group-hover:scale-110 transition-transform duration-500" />
                                </div>
                            </div>

                            <div className="bg-card rounded-[2.5rem] p-10 premium-shadow flex flex-col justify-between border-none">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                                        <FileText className="w-8 h-8" />
                                    </div>
                                    <Button variant="ghost" size="icon" className="rounded-xl hover:bg-primary/5">
                                        <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
                                    </Button>
                                </div>
                                <div>
                                    <span className="text-muted-foreground font-bold uppercase tracking-widest text-[10px] block mb-2">Billing Method</span>
                                    <h3 className="text-xl font-bold tracking-tight mb-1">Government Remittance</h3>
                                    <p className="text-muted-foreground font-medium text-sm">Account: GOG-9421-AUTO</p>
                                </div>
                            </div>
                        </div>

                        {/* Transaction History */}
                        <div className="bg-card rounded-[2.5rem] border-none premium-shadow overflow-hidden group">
                            <div className="p-8 border-b border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <h3 className="text-xl font-bold">Billing Activity</h3>
                                <div className="flex items-center gap-3 w-full sm:w-auto">
                                    <div className="relative flex-1 group sm:w-64">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                        <Input placeholder="Search records..." className="pl-10 h-11 bg-secondary/50 border-none rounded-xl" />
                                    </div>
                                    <Button variant="outline" size="icon" className="h-11 w-11 rounded-xl bg-secondary/50 border-none hover:bg-secondary">
                                        <Download className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-secondary/20">
                                            <th className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Description</th>
                                            <th className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Amount</th>
                                            <th className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Channel</th>
                                            <th className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Status</th>
                                            <th className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-widest text-right">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/50">
                                        {transactions.map((tx) => (
                                            <tr key={tx.id} className="hover:bg-secondary/30 transition-colors cursor-pointer group">
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className={cn(
                                                            "w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110",
                                                            tx.status === 'Completed' ? "bg-emerald-500/10 text-emerald-500" : "bg-orange-500/10 text-orange-500"
                                                        )}>
                                                            {tx.status === 'Completed' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="font-bold text-sm group-hover:text-primary transition-colors">{tx.desc}</span>
                                                            <span className="text-[10px] text-muted-foreground font-black uppercase tracking-tighter">{tx.id}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <span className="font-black text-sm">{tx.amount}</span>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-2">
                                                        {tx.method === 'Mobile Money' ? <Smartphone className="w-4 h-4 text-primary" /> : <Building2 className="w-4 h-4 text-blue-500" />}
                                                        <span className="text-sm font-semibold text-muted-foreground">{tx.method}</span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className={cn(
                                                        "inline-flex items-center gap-2 px-4 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-widest",
                                                        tx.status === 'Completed' ? "bg-emerald-500/10 text-emerald-500" :
                                                            tx.status === 'Pending' ? "bg-orange-500/10 text-orange-500" :
                                                                "bg-red-500/10 text-red-500"
                                                    )}>
                                                        {tx.status === 'Completed' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                                                        {tx.status}
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    <span className="text-sm font-medium text-muted-foreground">{tx.date}</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </PageContainer>
                </div>
            </div>
        </AuthGuard>
    );
};

export default PaymentsPage;
