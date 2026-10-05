<script setup lang="ts">
  import { useDarkTheme } from '@/shared/composables';
  import Button from '@/shared/ui/ui/button/Button.vue';
  import Icon from '@/shared/ui/icon/Icon.vue';

  const { toggleDark } = useDarkTheme();
</script>

<template>
  <div class="bg-bg-surface flex h-screen w-full overflow-hidden">
    <!-- Domain Header -->
    <div class="flex min-h-0 min-w-0 flex-1 flex-col">
      <header
        class="border-primary-600/35 flex h-16 shrink-0 items-center justify-between border-b px-4 sm:px-6"
      >
        <div class="flex items-center gap-3">
          <span
            class="bg-primary-600/10 text-primary-600 rounded-lg px-2.5 py-1 text-xs font-bold tracking-wider uppercase"
          >
            Supplier Portal
          </span>
          <h1 class="text-text-primary text-base font-semibold">Supplier Workspace</h1>
        </div>

        <div class="flex items-center gap-2">
          <Button test-id="supplier-toggle-dark" variant="ghost" size="icon" @click="toggleDark()">
            <Icon icon="hugeicons--dark-mode" class="size-5" />
          </Button>
        </div>
      </header>

      <!-- Main Domain Content -->
      <main class="min-h-0 min-w-0 flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
        <RouterView />
      </main>
    </div>
  </div>
</template>
