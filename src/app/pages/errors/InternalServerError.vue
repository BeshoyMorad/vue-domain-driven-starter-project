<script setup lang="ts">
  import { ExceptionState } from '@/shared/ui';
  import { useRouter } from 'vue-router';
  import { paths } from '@/app/router/paths';

  const router = useRouter();
  const goHome = () => router.push({ name: paths.admin.dashboard });
</script>

<template>
  <ExceptionState
    icon="hugeicons--work-alert"
    title="Oops! Something went wrong on our end."
    description="Server issues are often temporary. Please try again in a few minutes."
    button-label="Back to home"
    :button-action="goHome"
  />
</template>
