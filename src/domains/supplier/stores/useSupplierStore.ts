import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { SupplierItem } from '../types';

export const useSupplierStore = defineStore('supplier', () => {
  const items = ref<SupplierItem[]>([]);
  const isLoading = ref<boolean>(false);

  const setItems = (newItems: SupplierItem[]) => {
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
