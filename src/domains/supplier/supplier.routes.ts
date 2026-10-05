import type { RouteRecordRaw } from 'vue-router';
import { authGuard } from '@/app/router/guards';

export const supplierRoutes: RouteRecordRaw[] = [
  {
    path: '/supplier',
    component: () => import('./layouts/SupplierLayout.vue'),
    beforeEnter: [authGuard],
    meta: {
      allowedDomains: ['supplier'],
    },
    children: [
      {
        path: '',
        name: 'supplier.dashboard',
        component: () => import('./pages/SupplierDashboard.vue'),
        meta: {
          title: 'Supplier Dashboard',
          allowedDomains: ['supplier'],
        },
      },
    ],
  },
];
