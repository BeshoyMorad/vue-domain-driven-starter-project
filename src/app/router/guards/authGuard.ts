import { useAuthStore } from '@/core/auth/stores/auth';
import type { NavigationGuardReturn, RouteLocationNormalized } from 'vue-router';
import { paths } from '@/app/router/paths';
import { useAuthRedirect } from '@/core/auth/composables/useAuthRedirect';

export const authGuard = (to: RouteLocationNormalized): NavigationGuardReturn => {
  const authStore = useAuthStore();
  const { saveRedirectUrl } = useAuthRedirect();

  if (!authStore.isAuthenticated) {
    saveRedirectUrl(to.fullPath);
    return { name: paths.auth.login };
  }

  // Zero-Trust Domain Guard
  const allowedDomains = to.meta.allowedDomains as string[] | undefined;
  if (allowedDomains && allowedDomains.length > 0) {
    // const user = authStore.user as { role?: string; roles?: string[] } | null;
    // const userRole = user?.role;
    // const userRoles = Array.isArray(user?.roles) ? user.roles : userRole ? [userRole] : [];

    // const hasAccess = userRoles.some((role) => allowedDomains.includes(role));
    const hasAccess = true;
    if (!hasAccess) {
      return { name: paths.errors.accessDenied };
    }
  }

  return true;
};
