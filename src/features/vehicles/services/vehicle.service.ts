import { apiClient } from '@/lib/api-client';
import { ApiSuccessResponse } from '@/lib/api-client';
import { VehicleHistory } from '../types/vehicle.types';

export interface VehicleRecord {
    _id?: string;
    vin: string;
    make: string;
    model: string;
    year: number;
    color: string;
    engineNumber: string;
    chassisNumber: string;
    plateNumber?: string;
    ownerName: string;
    ownerIdType: string;
    ownerIdNumber: string;
    registrationDate?: string;
}


export interface VinDecodeResult {
    vin: string;
    make: string;
    model: string;
    year: number;
    bodyStyle?: string;
    engineType?: string;
    transmission?: string;
    driveType?: string;
    fuelType?: string;
    manufacturer?: string;
}

export const vehicleService = {
    decodeVin: async (vin: string): Promise<ApiSuccessResponse<VinDecodeResult>> => {
        const response = await apiClient.get<ApiSuccessResponse<VinDecodeResult>>(`/vehicles/decode/${vin}`);
        return response.data;
    },

    registerVehicle: async (data: VehicleRecord): Promise<ApiSuccessResponse<VehicleRecord>> => {
        const response = await apiClient.post<ApiSuccessResponse<VehicleRecord>>('/vehicles/register', data);
        return response.data;
    },

    getVehicleHistory: async (vin: string): Promise<ApiSuccessResponse<VehicleHistory>> => {
        const response = await apiClient.get<ApiSuccessResponse<VehicleHistory>>(`/vehicle-history/${vin}`);
        return response.data;
    },


    getRecentSearches: async (): Promise<ApiSuccessResponse<any[]>> => {
        const response = await apiClient.get<ApiSuccessResponse<any[]>>('/vehicles/searches/recent');
        return response.data;
    },

    getDashboardStats: async (): Promise<ApiSuccessResponse<any>> => {
        const response = await apiClient.get<ApiSuccessResponse<any>>('/dashboard/dvla/stats');
        return response.data;
    }
};
