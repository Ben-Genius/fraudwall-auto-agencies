export enum NotificationType {
    ALERT = 'ALERT',
    SEARCH_RESULT = 'SEARCH_RESULT',
    SYSTEM = 'SYSTEM'
}

export interface Notification {
    id: string;
    title: string;
    message: string;
    type: NotificationType;
    timestamp: Date;
    isRead: boolean;
    link?: string;
    entityId?: string; // e.g. VIN, Case ID
}
