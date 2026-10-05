import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import { paths } from './paths';
import { authRoutes } from '@/core/auth/auth.routes';
import { adminRoutes } from '@/domains/admin/admin.routes';
import { supplierRoutes } from '@/domains/supplier/supplier.routes';
import { handleOffline } from '@/shared/composables/useNetwork';

export const routes: RouteRecordRaw[] = [
  // ── Default Root ────────────────────────────────────────────────────────
  {
    path: '/',
    redirect: '/admin',
  },

  // ── Domain Portals (Route-level Code Splitting) ──────────────────────────
  ...adminRoutes,
  ...supplierRoutes,

  // ── Auth ────────────────────────────────────────────────────────────────
  ...authRoutes,

  // ── Error Boundaries ───────────────────────────────────────────────────
  {
    path: '/access-denied',
    name: paths.errors.accessDenied,
    component: () => import('@/app/pages/errors/AccessDenied.vue'),
    meta: {
      title: 'Access Denied',
      sidebar: false,
    },
  },
  {
    path: '/internal-server-error',
    name: paths.errors.serverError,
    component: () => import('@/app/pages/errors/InternalServerError.vue'),
    meta: {
      title: 'Internal Server Error',
      sidebar: false,
    },
  },
  {
    path: '/no-internet',
    name: paths.errors.noInternet,
    component: () => import('@/app/pages/errors/NoInternet.vue'),
    meta: {
      title: 'No Internet Connection',
      sidebar: false,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/app/pages/errors/NotFound.vue'),
    meta: {
      title: 'Page Not Found',
      sidebar: false,
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.onError((error, to) => {
  if (
    error.message.includes('Failed to fetch dynamically imported module') ||
    error.message.includes('Importing a module script failed')
  ) {
    const key = `chunk-load-retry-${to.path}`;
    const retried = sessionStorage.getItem(key);
    if (!retried) {
      sessionStorage.setItem(key, 'true');
      // eslint-disable-next-line no-console
      console.warn(
        '[Router Dynamic Import Error]: forcing page reload to retrieve latest assets',
        error
      );
      window.location.reload();
    } else {
      sessionStorage.removeItem(key);
      // eslint-disable-next-line no-console
      console.error('[Router Dynamic Import Error]: Reload did not resolve the issue.', error);
    }
  }
});

router.beforeEach((to, _from, next) => {
  if (!navigator.onLine && to.name !== paths.errors.noInternet) {
    handleOffline(to.fullPath);
    next(false);
  } else {
    next();
  }
});

// Update document title after each navigation
router.afterEach((to) => {
  const pageTitle = to.meta.title;

  if (pageTitle) {
    document.title = `${pageTitle}`;
  }
});

export default router;
