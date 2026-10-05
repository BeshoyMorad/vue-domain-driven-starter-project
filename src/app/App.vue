<script setup lang="ts">
  import { useDarkTheme, useNetwork } from '@/shared/composables';
  import { ErrorBoundary, Toaster } from '@/shared/ui';

  useDarkTheme();

  const { initListeners } = useNetwork();
  initListeners();
</script>

<template>
  <ErrorBoundary>
    <RouterView />
  </ErrorBoundary>

  <Toaster />
</template>
