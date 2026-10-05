import { useSessionStorage } from '@vueuse/core';
import router from '@/app/router';
import { paths } from '@/app/router/paths';

export const REDIRECT_URL_KEY = 'redirect_url';

export const useAuthRedirect = () => {
  const savedUrl = useSessionStorage<string | null>(REDIRECT_URL_KEY, null);

  const saveRedirectUrl = (url: string) => {
    if (url && !url.includes('/auth/')) {
      savedUrl.value = url;
    }
  };

  const getRedirectUrl = () => {
    return savedUrl.value;
  };

  const clearRedirectUrl = () => {
    savedUrl.value = null;
  };

  const handleRedirect = (routeName: string = paths.admin.dashboard) => {
    const url = savedUrl.value;
    if (url) {
      router.push(url);
    } else {
      router.push({ name: routeName });
    }
    clearRedirectUrl();
  };

  return {
    savedUrl,
    saveRedirectUrl,
    getRedirectUrl,
    clearRedirectUrl,
    handleRedirect,
  };
};
