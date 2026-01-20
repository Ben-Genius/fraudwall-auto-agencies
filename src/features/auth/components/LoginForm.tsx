import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '@/stores/auth-store';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Lock, Mail } from 'lucide-react';
import { authService } from '../services/auth.service';

const loginSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginForm: React.FC = () => {
    const { login } = useAuthStore();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = React.useState(false);

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: LoginFormValues) => {
        setIsLoading(true);
        try {
            const response = await authService.login(data);

            // Pass the 'data' field which contains accessToken, refreshToken and user info
            login(response.data);

            toast({
                title: "Welcome back",
                description: response.message || "FraudWall Auto System successfully authenticated.",
            });
            navigate('/dashboard');
        } catch (error: any) {
            console.error('Login error:', error);
            const apiError = error.response?.data;
            const title = apiError?.message || "Authentication Failed";
            const description = apiError?.error || "Invalid credentials. Please try again.";

            toast({
                variant: "destructive",
                title: title,
                description: description,
            });
        } finally {
            setIsLoading(false);
        }

    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-gray-700">Email Address</Label>
                <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        id="email"
                        type="email"
                        placeholder="you@agency.gov.gh"
                        className="pl-11 h-12 bg-gray-50 border-gray-200 focus:ring-2 focus:ring-primary-orange/20  rounded-lg transition-all"
                        {...form.register("email")}
                    />
                </div>
                {form.formState.errors.email && (
                    <p className="text-xs font-medium text-red-600 mt-1">{form.formState.errors.email.message}</p>
                )}
            </div>

            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm font-semibold text-gray-700">Password</Label>
                    <a href="#" className="text-xs font-semibold text-primary-orange hover:text-primary-red transition-colors">
                        Forgot Password?
                    </a>
                </div>
                <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-11 h-12 bg-gray-50 border-gray-200 focus:ring-2 focus:ring-primary-orange/20  rounded-lg transition-all"
                        {...form.register("password")}
                    />
                </div>
                {form.formState.errors.password && (
                    <p className="text-xs font-medium text-red-600 mt-1">{form.formState.errors.password.message}</p>
                )}
            </div>

            <Button
                type="submit"
                className="w-full h-12 bg-primary-orange hover:bg-primary-red/90 text-white font-bold rounded-lg transition-all active:scale-[0.99] shadow-lg shadow-primary-orange/20"
                disabled={isLoading}
            >
                {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                    </>
                ) : (
                    "Sign in"
                )}
            </Button>
        </form>
    );
};
