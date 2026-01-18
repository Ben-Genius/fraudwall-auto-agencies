import { LucideIcon, Inbox } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
    icon?: LucideIcon;
    title: string;
    description?: string;
    actionLabel?: string;
    onAction?: () => void;
}

/**
 * Displayed when a list or page has no data.
 */
export const EmptyState = ({
    icon: Icon = Inbox,
    title,
    description,
    actionLabel,
    onAction,
}: EmptyStateProps) => {
    return (
        <div className="flex h-full min-h-[400px] w-full flex-col items-center justify-center space-y-4 p-8 text-center border-2 border-dashed border-muted rounded-lg">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <Icon className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="space-y-1">
                <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
                {description && (
                    <p className="max-w-[300px] text-muted-foreground text-sm">
                        {description}
                    </p>
                )}
            </div>
            {actionLabel && onAction && (
                <Button onClick={onAction} variant="outline" size="sm">
                    {actionLabel}
                </Button>
            )}
        </div>
    );
};
