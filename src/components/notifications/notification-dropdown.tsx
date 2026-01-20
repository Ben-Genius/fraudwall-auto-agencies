import { useState } from 'react';
import { Bell, Check, ExternalLink, AlertTriangle, Search, Info } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { Notification, NotificationType } from '@/types/notification.types';
import { Link } from 'react-router-dom';

// Mock Data
const MOCK_NOTIFICATIONS: Notification[] = [
    {
        id: '1',
        title: 'Stolen Vehicle Match',
        message: 'VIN GH-8829-22 matches a reported stolen vehicle from Interpol database.',
        type: NotificationType.ALERT,
        timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 mins ago
        isRead: false,
        link: '/police/stolen/123'
    },
    {
        id: '2',
        title: 'External Search Result',
        message: 'Completed search for VIN JP-992-X on National Insurance Database.',
        type: NotificationType.SEARCH_RESULT,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        isRead: false,
        link: '/vin-lookup/JP-992-X'
    },
    {
        id: '3',
        title: 'System Maintenance',
        message: 'Scheduled maintenance tonight at 02:00 AM UTC.',
        type: NotificationType.SYSTEM,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        isRead: true
    }
];

export const NotificationDropdown = () => {
    const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
    const [isOpen, setIsOpen] = useState(false);

    const unreadCount = notifications.filter(n => !n.isRead).length;

    const markAsRead = (id: string) => {
        setNotifications(prev => prev.map(n =>
            n.id === id ? { ...n, isRead: true } : n
        ));
    };

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    };

    const getIcon = (type: NotificationType) => {
        switch (type) {
            case NotificationType.ALERT:
                return <AlertTriangle className="w-4 h-4 text-red-500" />;
            case NotificationType.SEARCH_RESULT:
                return <Search className="w-4 h-4 text-blue-500" />;
            case NotificationType.SYSTEM:
            default:
                return <Info className="w-4 h-4 text-gray-500" />;
        }
    };

    const formatTime = (date: Date) => {
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        return `${days}d ago`;
    };

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <button className="relative p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-50 outline-none transition-colors">
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
                    )}
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 p-0 bg-white border border-gray-200 shadow-xl rounded-lg">
                <div className="flex items-center justify-between px-4 py-3 border-b bg-gray-50/50 rounded-t-lg">
                    <h4 className="text-sm font-semibold text-gray-900">Notifications</h4>
                    {unreadCount > 0 && (
                        <button
                            onClick={markAllAsRead}
                            className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                        >
                            <Check className="w-3 h-3" /> Mark all read
                        </button>
                    )}
                </div>

                <div className="max-h-[24rem] overflow-y-auto py-1">
                    {notifications.length === 0 ? (
                        <div className="px-4 py-8 text-center text-gray-500 text-sm">
                            <Bell className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                            <p>No notifications yet</p>
                        </div>
                    ) : (
                        notifications.map((notification) => (
                            <DropdownMenuItem
                                key={notification.id}
                                className={cn(
                                    "flex items-start gap-3 px-4 py-3 cursor-pointer outline-none focus:bg-gray-50",
                                    !notification.isRead && "bg-blue-50/30"
                                )}
                                onClick={() => markAsRead(notification.id)}
                            >
                                <div className={cn(
                                    "mt-0.5 w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                                    notification.type === NotificationType.ALERT && "bg-red-100",
                                    notification.type === NotificationType.SEARCH_RESULT && "bg-blue-100",
                                    notification.type === NotificationType.SYSTEM && "bg-gray-100",
                                )}>
                                    {getIcon(notification.type)}
                                </div>
                                <div className="flex-1 space-y-1">
                                    <div className="flex items-start justify-between gap-2">
                                        <p className={cn(
                                            "text-sm font-medium text-gray-900",
                                            !notification.isRead && "font-semibold"
                                        )}>
                                            {notification.title}
                                        </p>
                                        <span className="text-[10px] text-gray-400 whitespace-nowrap">
                                            {formatTime(notification.timestamp)}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                                        {notification.message}
                                    </p>
                                    {notification.link && (
                                        <Link
                                            to={notification.link}
                                            className="inline-flex items-center gap-1 text-[10px] font-medium text-blue-600 hover:underline mt-1.5"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            View Details <ExternalLink className="w-2.5 h-2.5" />
                                        </Link>
                                    )}
                                </div>
                                {!notification.isRead && (
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
                                )}
                            </DropdownMenuItem>
                        ))
                    )}
                </div>

                <DropdownMenuSeparator className="my-0" />
                <div className="p-2 text-center bg-gray-50 rounded-b-lg">
                    <Link to="/notifications" className="text-xs font-medium text-gray-600 hover:text-gray-900">
                        View all activity
                    </Link>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
