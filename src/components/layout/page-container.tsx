import { cn } from '@/lib/utils';

interface PageContainerProps {
    children: React.ReactNode;
    className?: string;
    isDashboard?: boolean;
}

export const PageContainer = ({
    children,
    className,
    isDashboard = false
}: PageContainerProps) => {
    return (
        <main
            className={cn(
                'flex-1 overflow-y-auto p-6 md:p-10 animate-in scrollbar-none',
                !isDashboard && 'w-full',
                className
            )}
        >
            <div className="max-w-[160rem] mx-auto space-y-8">
                {children}
            </div>
        </main>
    );
};

