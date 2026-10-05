export interface AdminItem {
  id: string;
  name: string;
  createdAt: string;
  status: 'active' | 'inactive';
}

export interface AdminState {
  items: AdminItem[];
  loading: boolean;
  error: string | null;
}
