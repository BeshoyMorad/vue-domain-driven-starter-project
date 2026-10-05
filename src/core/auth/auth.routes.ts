import { paths } from '@/app/router/paths';
import type { RouteRecordRaw } from 'vue-router';
import { guestGuard } from './guards/guestGuard';

export const authRoutes: RouteRecordRaw[] = [
  {
    path: '/auth',
    component: () => import('./layouts/AuthLayout.vue'),
    beforeEnter: [guestGuard],
    children: [
      {
        path: 'login',
        name: paths.auth.login,
        component: () => import('./Login.vue'),
        meta: {
          title: 'Sign In',
          sidebar: false,
        },
      },
    ],
  },
];
