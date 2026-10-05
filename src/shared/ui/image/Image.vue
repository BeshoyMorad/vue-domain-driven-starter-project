<script setup lang="ts">
  import { computed, ref, watch } from 'vue';
  import { useDarkTheme } from '@/shared/composables';

  const props = withDefaults(
    defineProps<{
      src?: string;
      alt?: string;
      fallback?: string;
    }>(),
    {
      src: undefined,
      alt: '',
      fallback: undefined,
    }
  );

  const { isDark } = useDarkTheme();

  const resolvedFallback = computed(
    () =>
      props.fallback ??
      (isDark.value
        ? '@/shared/assets/images/dark-placeholder.webp'
        : '@/shared/assets/images/light-placeholder.webp')
  );

  /** Density srcset for built-in placeholders only (custom `fallback` is a single URL). */
  const fallbackSrcset = computed(() => {
    if (props.fallback) return undefined;
    return isDark.value
      ? '@/shared/assets/images/dark-placeholder.webp 1x, @/shared/assets/images/dark-placeholder@2x.webp 2x'
      : '@/shared/assets/images/light-placeholder.webp 1x, @/shared/assets/images/light-placeholder@2x.webp 2x';
  });

  const isUsingFallback = ref(!props.src);
  const currentSrc = ref(props.src || resolvedFallback.value);

  watch(
    () => props.src,
    (newSrc) => {
      if (newSrc) {
        currentSrc.value = newSrc;
        isUsingFallback.value = false;
      } else {
        currentSrc.value = resolvedFallback.value;
        isUsingFallback.value = true;
      }
    }
  );

  watch(resolvedFallback, () => {
    if (isUsingFallback.value) {
      currentSrc.value = resolvedFallback.value;
    }
  });

  function handleError() {
    if (isUsingFallback.value) return;
    currentSrc.value = resolvedFallback.value;
    isUsingFallback.value = true;
  }
</script>

<template>
  <img
    :src="currentSrc"
    :srcset="isUsingFallback ? fallbackSrcset : undefined"
    :alt="alt"
    @error="handleError"
  />
</template>
