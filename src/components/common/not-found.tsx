import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FileQuestion } from 'lucide-react';

/**
 * Standard 404 Not Found component.
 */
export const NotFound = () => {
    return (
        <div className="flex h-[80vh] w-full flex-col items-center justify-center space-y-6 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                <FileQuestion className="h-10 w-10 text-muted-foreground" />
            </div>
            <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tight">404 - Page Not Found</h1>
                <p className="text-muted-foreground">
                    The page you are looking for doesn't exist or has been moved.
                </p>
            </div>
            <Button asChild>
                <Link to="/">Return to Dashboard</Link>
            </Button>
        </div>
    );
};
