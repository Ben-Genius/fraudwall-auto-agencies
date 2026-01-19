import { cn } from '@/lib/utils';
import { Loader } from 'lucide-react';

interface LoadingSpinnerProps {
    className?: string;
    size?: number;
}

/**
 * A reusable loading spinner component using Lucide's Loader2.
 */
export const LoadingSpinner = ({ className, size = 28 }: LoadingSpinnerProps) => {
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Loader
                className={cn('animate-spin text-primary', className)}
                size={size}
            />
        </div>
    );
};
