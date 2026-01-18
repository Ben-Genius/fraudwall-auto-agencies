import { apiClient, ApiSuccessResponse } from '@/lib/api-client';
import { UserRole } from '@/types/rbac.types';

export interface LoginResponseData {
    accessToken: string;
    refreshToken: string;
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    isEmailVerified: boolean;
    phone: string;
    role: UserRole;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export const authService = {
    login: async (credentials: any): Promise<ApiSuccessResponse<LoginResponseData>> => {
        const response = await apiClient.post<ApiSuccessResponse<LoginResponseData>>('/auth/login', credentials);
        return response.data;
    },
};
