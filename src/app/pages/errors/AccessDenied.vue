<script setup lang="ts">
  import { ExceptionState } from '@/shared/ui';
  import { useRouter } from 'vue-router';
  import { paths } from '@/app/router/paths';

  const router = useRouter();
  const goHome = () => router.push({ name: paths.admin.dashboard });
</script>

<template>
  <ExceptionState
    icon="hugeicons--unavailable"
    title="Access Denied!"
    description="We're sorry, but you don't have permission to access this page."
    button-label="Back to home"
    :button-action="goHome"
  />
</template>
