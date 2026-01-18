import React from 'react';
import { useRouteError, useNavigate } from 'react-router-dom';
import { AlertCircle, RotateCcw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const GlobalErrorPage: React.FC = () => {
    const error: any = useRouteError();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 font-sans">
            <div className="max-w-md w-full bg-white rounded-xl shadow-2xl border border-red-100 overflow-hidden">
                <div className="p-8 text-center">
                    <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <AlertCircle className="w-10 h-10 text-red-600" />
                    </div>

                    <h1 className="text-2xl font-black text-slate-900 tracking-tight mb-2">
                        Intelligence Stream Interrupted
                    </h1>

                    <p className="text-slate-500 font-medium mb-8">
                        We encountered an unexpected error while processing the vehicle data stream.
                        Our engineering team has been notified.
                    </p>

                    <div className="bg-slate-50 rounded-lg p-4 mb-8 text-left border border-slate-100">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Error Diagnostics</p>
                        <p className="text-xs font-mono text-red-600 break-all leading-relaxed">
                            {error?.message || "Unknown System Exception"}
                        </p>
                    </div>

                    <div className="flex flex-col gap-3">
                        <Button
                            onClick={() => window.location.reload()}
                            className="w-full bg-slate-900 hover:bg-slate-800 h-12 font-bold flex items-center justify-center gap-2"
                        >
                            <RotateCcw className="w-4 h-4" />
                            Retry Operation
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => navigate('/dashboard')}
                            className="w-full h-12 font-bold flex items-center justify-center gap-2"
                        >
                            <Home className="w-4 h-4" />
                            Return to Command Center
                        </Button>
                    </div>
                </div>

                <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 text-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        FraudWall Auto Security Protocol v1.0
                    </p>
                </div>
            </div>
        </div>
    );
};
