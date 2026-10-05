export interface SupplierItem {
  id: string;
  name: string;
  createdAt: string;
  status: 'active' | 'inactive';
}

export interface SupplierState {
  items: SupplierItem[];
  loading: boolean;
  error: string | null;
}
