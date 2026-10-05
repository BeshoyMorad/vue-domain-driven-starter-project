import type { LoginRequest, LoginResponse } from '../types';
import { api } from '@/core/lib/api/client';
import { apiRoute } from '@/core/lib/api/endpoints';

export const authServices = {
  login: async (payload: LoginRequest) => {
    const response = await api.post<ApiResponse<LoginResponse>>(apiRoute('auth.login'), payload);
    return response.data;
  },
};
