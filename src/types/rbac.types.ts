// types/rbac.types.ts

export enum UserRole {
    DVLA = 'dvla',
    EOCO = 'eoco',
    CUSTOMS = 'customs',
    POLICE = 'police',
}

export enum Permission {
    // User Management
    VIEW_USERS = 'VIEW_USERS',
    CREATE_USERS = 'CREATE_USERS',
    UPDATE_USER_ROLE = 'UPDATE_USER_ROLE',
    DELETE_USERS = 'DELETE_USERS',

    // Admin Management
    CREATE_ADMIN = 'CREATE_ADMIN',
    VIEW_ROLES = 'VIEW_ROLES',

    // VIN Operations
    DECODE_VIN = 'DECODE_VIN',

    // Vehicle History
    VIEW_VEHICLE_HISTORY = 'VIEW_VEHICLE_HISTORY',

    // Theft/Stolen Check
    CHECK_STOLEN = 'CHECK_STOLEN',
    FLAG_STOLEN = 'FLAG_STOLEN',

    // Accident/Salvage Check
    CHECK_ACCIDENT = 'CHECK_ACCIDENT',
    FLAG_ACCIDENT = 'FLAG_ACCIDENT',

    // Maintenance Records
    VIEW_MAINTENANCE = 'VIEW_MAINTENANCE',

    // Recalls
    VIEW_RECALLS = 'VIEW_RECALLS',

    // Auction History
    VIEW_AUCTION_HISTORY = 'VIEW_AUCTION_HISTORY',
}

export interface User {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    phone?: string;
    isEmailVerified?: boolean;
    permissions: Permission[];
    createdAt?: string;
    updatedAt?: string;
}


// Role-Permission Mapping based on actual system roles
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
    [UserRole.DVLA]: [
        Permission.VIEW_USERS,
        Permission.CREATE_USERS,
        Permission.UPDATE_USER_ROLE,
        Permission.DELETE_USERS,
        Permission.VIEW_ROLES,
        Permission.DECODE_VIN,
        Permission.VIEW_VEHICLE_HISTORY,
        Permission.CHECK_STOLEN,
        Permission.FLAG_STOLEN,
        Permission.CHECK_ACCIDENT,
        Permission.FLAG_ACCIDENT,
        Permission.VIEW_MAINTENANCE,
        Permission.VIEW_RECALLS,
        Permission.VIEW_AUCTION_HISTORY,
    ],
    [UserRole.EOCO]: [
        Permission.DECODE_VIN,
        Permission.VIEW_VEHICLE_HISTORY,
        Permission.CHECK_STOLEN,
        Permission.FLAG_STOLEN,
        Permission.CHECK_ACCIDENT,
        Permission.FLAG_ACCIDENT,
        Permission.VIEW_AUCTION_HISTORY,
    ],
    [UserRole.CUSTOMS]: [
        Permission.DECODE_VIN,
        Permission.VIEW_VEHICLE_HISTORY,
        Permission.CHECK_STOLEN,
        Permission.CHECK_ACCIDENT,
        Permission.VIEW_AUCTION_HISTORY,
    ],
    [UserRole.POLICE]: [
        Permission.DECODE_VIN,
        Permission.VIEW_VEHICLE_HISTORY,
        Permission.CHECK_STOLEN,
        Permission.FLAG_STOLEN,
        Permission.CHECK_ACCIDENT,
        Permission.FLAG_ACCIDENT,
    ],
};

export const ROLE_DESCRIPTIONS: Record<UserRole, string> = {
    [UserRole.DVLA]: 'Driver & Vehicle Licensing Authority - Full system administration',
    [UserRole.EOCO]: 'Economic and Organized Crime Office - Fraud investigation',
    [UserRole.CUSTOMS]: 'Ghana Revenue Authority - Import/Export verification',
    [UserRole.POLICE]: 'Ghana Police Service - Law enforcement operations',
};

export const ROLE_COLORS: Record<UserRole, { primary: string; secondary: string; border: string; bg: string; text: string; logo: string }> = {
    [UserRole.DVLA]: {
        primary: 'bg-primary-orange',
        secondary: 'text-primary-orange',
        border: 'border-orange-200',
        bg: 'bg-orange-100',
        text: 'text-orange-800',
        logo: '/logos/dvla_logo.png',
    },
    [UserRole.EOCO]: {
        primary: 'bg-primary-orange',
        secondary: 'text-primary-orange',
        border: 'border-orange-200',
        bg: 'bg-orange-50',
        text: 'text-orange-700',
        logo: '/logos/eoco_logo.jpg',
    },
    [UserRole.CUSTOMS]: {
        primary: 'bg-primary-yellow',
        secondary: 'text-yellow-600',
        border: 'border-yellow-200',
        bg: 'bg-yellow-50',
        text: 'text-yellow-700',
        logo: '/logos/customs_logo.png',
    },
    [UserRole.POLICE]: {
        primary: 'bg-primary-red',
        secondary: 'text-primary-red',
        border: 'border-red-200',
        bg: 'bg-red-50',
        text: 'text-red-700',
        logo: '/logos/police_logo.png',
    },
};

