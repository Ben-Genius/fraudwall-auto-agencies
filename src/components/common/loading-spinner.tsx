import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
    className?: string;
    size?: number;
}

/**
 * A reusable loading spinner component using Lucide's Loader2.
 */
export const LoadingSpinner = ({ className, size = 24 }: LoadingSpinnerProps) => {
    return (
        <div className="flex h-full w-full items-center justify-center p-4">
            <Loader2
                className={cn('animate-spin text-primary', className)}
                size={size}
            />
        </div>
    );
};
