import type { RouteRecordRaw } from 'vue-router';
import { authGuard } from '@/app/router/guards';

export const adminRoutes: RouteRecordRaw[] = [
  {
    path: '/admin',
    component: () => import('./layouts/AdminLayout.vue'),
    beforeEnter: [authGuard],
    meta: {
      allowedDomains: ['admin'],
    },
    children: [
      {
        path: '',
        name: 'admin.dashboard',
        component: () => import('./pages/AdminDashboard.vue'),
        meta: {
          title: 'Admin Dashboard',
          allowedDomains: ['admin'],
        },
      },
    ],
  },
];
