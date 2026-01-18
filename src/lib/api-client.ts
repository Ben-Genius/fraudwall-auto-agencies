import axios, { AxiosError } from 'axios';
import { toast } from 'sonner';
import { useAuthStore } from '@/stores/auth-store';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor - Add auth token
apiClient.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().accessToken;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);


// Response interceptor - Handle errors
apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<ApiErrorResponse>) => {
        const { response } = error;

        if (!response) {
            toast.error('Network error. Please check your connection.');
            return Promise.reject(error);
        }

        const errorMessage = response.data?.error || response.data?.message || 'An error occurred.';

        switch (response.status) {
            case 401:
                useAuthStore.getState().logout();
                toast.error(errorMessage);
                break;
            case 403:
                toast.error(errorMessage || 'You do not have permission to perform this action.');
                break;
            case 404:
                toast.error('Resource not found.');
                break;
            case 500:
                toast.error('Server error. Please try again later.');
                break;
            default:
                toast.error(errorMessage);
        }

        return Promise.reject(error);
    }
);


export interface ApiErrorResponse {
    message: string;
    statusCode: number;
    error: any;
}

export interface ApiSuccessResponse<T = any> {
    message: string;
    statusCode: number;
    error: null;
    data: T;
}
