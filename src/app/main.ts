import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { VueQueryPlugin } from '@tanstack/vue-query';
import { queryClient } from '@/core/lib/query-client';
import '@/shared/styles/index.css';
import router from './router';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';
import App from './App.vue';
import { error as toastError } from '@/shared/utils/toast';
import i18n from '@/shared/locales';
import { useAppLocale } from '@/shared/composables/useAppLocale';

dayjs.extend(duration);
dayjs.extend(relativeTime);

const app = createApp(App);

app.config.errorHandler = (err, _instance, info) => {
  // eslint-disable-next-line no-console
  console.error('[Global Vue Error]:', err, info);
  toastError('An unexpected component error occurred.');
};

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const { initLocale } = useAppLocale();
void initLocale();

app.use(pinia).use(i18n).use(VueQueryPlugin, { queryClient }).use(router).mount('#app');
