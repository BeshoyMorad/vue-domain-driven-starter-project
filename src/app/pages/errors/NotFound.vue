<script setup lang="ts">
  import { ExceptionState } from '@/shared/ui';
  import { useRouter } from 'vue-router';
  import { paths } from '@/app/router/paths';

  const router = useRouter();
  const goHome = () => router.push({ name: paths.admin.dashboard });
</script>

<template>
  <ExceptionState
    icon="hugeicons--alert-02"
    title="Oops! We can't find that page."
    description="The page you’re looking for doesn’t exist or has been removed. Please go back to the home page."
    button-label="Back to home"
    :button-action="goHome"
  />
</template>
