import { api } from '@/core/lib/api/client';
import type { AdminItem } from '../types';

export const adminApi = {
  getOverview: async () => {
    const response = await api.get<AdminItem[]>('/admin/overview');
    return response.data;
  },
};
