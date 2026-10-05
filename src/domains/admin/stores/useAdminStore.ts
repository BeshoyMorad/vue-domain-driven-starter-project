import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { AdminItem } from '../types';

export const useAdminStore = defineStore('admin', () => {
  const items = ref<AdminItem[]>([]);
  const isLoading = ref<boolean>(false);

  const setItems = (newItems: AdminItem[]) => {
    items.value = newItems;
  };

  const clear = () => {
    items.value = [];
  };

  return {
    items,
    isLoading,
    setItems,
    clear,
  };
});
