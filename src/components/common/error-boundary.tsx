import { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

interface Props {
    children?: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

/**
 * Error boundary component to catch and display UI errors gracefully.
 */
export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="flex min-h-[400px] w-full flex-col items-center justify-center space-y-4 p-8 text-center">
                    <AlertCircle className="h-12 w-12 text-destructive" />
                    <h2 className="text-2xl font-bold tracking-tight">Something went wrong</h2>
                    <p className="max-w-[500px] text-muted-foreground">
                        We apologize for the inconvenience. An unexpected error occurred.
                    </p>
                    <Button
                        onClick={() => window.location.reload()}
                        variant="outline"
                    >
                        Reload page
                    </Button>
                </div>
            );
        }

        return this.props.children;
    }
}
