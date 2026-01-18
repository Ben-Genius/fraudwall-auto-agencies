import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const UnauthorizedPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 font-sans focus:outline-none">
            <div className="w-20 h-20 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mb-8">
                <ShieldAlert className="w-10 h-10 text-red-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Access Denied</h1>
            <p className="text-gray-500 mb-8 text-center max-w-md">
                You do not have the required permissions to access this intelligence module.
                Please contact the DVLA administrator if you believe this is an error.
            </p>
            <div className="flex gap-4">
                <Button
                    variant="outline"
                    onClick={() => navigate(-1)}
                    className="rounded-lg h-11 px-6 border-gray-200"
                >
                    Go Back
                </Button>
                <Button
                    onClick={() => navigate('/dashboard')}
                    className="rounded-lg h-11 px-6 bg-gray-900 text-white hover:bg-gray-800"
                >
                    Return to Overview
                </Button>
            </div>
        </div>
    );
};

export default UnauthorizedPage;
