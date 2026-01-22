// pages/LoginPage.tsx
import React from 'react';
import { LoginForm } from '../components/LoginForm';
import logo from '@/assets/auto_logo.png';

const LoginPage: React.FC = () => {
    return (
        <div className="min-h-screen w-full flex bg-white font-sans">
            {/* Left Side: Image Section */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-gray-500 via-gray-700 to-gray-900 overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img
                        src="/images/ghana_vehicle_security_bg.png"
                        alt="Background"
                        className="w-full h-full object-cover opacity-40"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-between p-6 text-white w-full">
                    {/* Logo */}
                    <div className="flex items-center gap-3">

                        {/* <span className="text-xl font-semibold">FraudWall Auto</span> */}
                    </div>

                    {/* Main Text */}
                    <div className="space-y-8 max-w-lg">
                        <h1 className="text-5xl font-bold leading-tight">
                            Vehicle Intelligence & Verification Platform
                        </h1>
                        <p className="text-lg text-gray-300 leading-relaxed">
                            Comprehensive vehicle information, verification services, and fraud detection
                            powered by real-time data integration.
                        </p>
                        {/* Footer */}
                        <div>
                            <p className="text-gray-400 text-sm">
                                © 2026 FraudWall Auto. All rights reserved.
                            </p>
                        </div>
                    </div>


                </div>
            </div>

            {/* Right Side: Login Form */}
            <div className="flex-1 flex items-center justify-center p-8 lg:p-12">
                <div className="w-full max-w-md space-y-8">
                    {/* Mobile Logo */}
                    <div className="lg:hidden flex flex-col items-center gap-3 mb-8">
                        <div className="h-14 w-14 bg-gray-100 rounded-xl flex items-center justify-center">
                            <img src="/favicon.png" alt="Logo" className="w-8 h-8 object-contain" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">FraudWall Auto</h2>
                    </div>
                    <div className="p-2 w-[20rem] bg-white rounded-lg flex items-center justify-center">
                        <img src={logo} alt="Logo" className="object-contain" />
                    </div>
                    {/* Header */}
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold text-gray-900">
                            Sign in
                        </h2>
                        <p className="text-gray-600">
                            Enter your credentials to access your account
                        </p>
                    </div>

                    {/* Login Form */}
                    <LoginForm />

                    {/* Footer Links */}
                    <div className="pt-8 flex items-center justify-between text-sm border-t border-gray-100">
                        <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                            Privacy Policy
                        </a>
                        <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                            Terms of Service
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;