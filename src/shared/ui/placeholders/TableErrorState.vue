<script setup lang="ts">
  import type { HTMLAttributes } from 'vue';
  import { TEST_IDS } from '@/core/lib/test-ids';
  import { cn } from '@/shared/utils';
  import { getImagePath } from '@/shared/utils/getDynamicAssets';
  import Image from '../image/Image.vue';
  import Button from '../ui/button/Button.vue';
  import type { ButtonVariants } from '../ui/button';

  defineOptions({ inheritAttrs: false });

  withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      image?: string;
      imageClass?: HTMLAttributes['class'];
      buttonLabel?: string;
      buttonVariant?: ButtonVariants['variant'];
      buttonSize?: ButtonVariants['size'];
      buttonAction?: () => void;
      darkMode?: boolean;
    }>(),
    {
      title: 'Failed to load data',
      description: 'An error occurred while fetching the data. Please try again.',
      image: 'internal-server-error.png',
      imageClass: '',
      buttonLabel: 'Retry',
      buttonVariant: 'default',
      buttonSize: 'lg',
      buttonAction: undefined,
      darkMode: false,
    }
  );
</script>

<template>
  <div
    :class="cn('flex flex-col items-center justify-center gap-6 py-8 text-center', $attrs.class)"
  >
    <slot name="image">
      <Image v-if="image" :src="getImagePath(image)" :class="cn('size-36', imageClass)" />
    </slot>

    <div class="space-y-2 text-center">
      <p class="text-foreground text-xl font-bold" :class="{ 'text-white': darkMode }">
        {{ title }}
      </p>
      <p
        class="text-foreground-caption text-sm font-medium"
        :class="{ 'text-neutral-400': darkMode }"
      >
        {{ description }}
      </p>
    </div>

    <slot name="action">
      <Button
        v-if="buttonLabel && buttonAction"
        :variant="buttonVariant"
        :size="buttonSize"
        :test-id="TEST_IDS.table.retry"
        @click="buttonAction"
      >
        {{ buttonLabel }}
      </Button>
    </slot>
  </div>
</template>
