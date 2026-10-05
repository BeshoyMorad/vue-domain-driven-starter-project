import { api } from '@/core/lib/api/client';
import type { SupplierItem } from '../types';

export const supplierApi = {
  getOverview: async () => {
    const response = await api.get<SupplierItem[]>('/supplier/overview');
    return response.data;
  },
};
