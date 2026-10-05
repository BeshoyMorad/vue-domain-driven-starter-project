<script setup lang="ts">
  import { useSupplierStore } from '../stores/useSupplierStore';

  const store = useSupplierStore();
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-text-primary text-2xl font-bold tracking-tight">Supplier Dashboard</h2>
        <p class="text-text-tertiary text-sm">
          Welcome to the isolated supplier domain. Active items: {{ store.items.length }}
        </p>
      </div>
    </div>

    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div class="border-border bg-bg-card rounded-xl border p-5 shadow-xs">
        <h3 class="text-text-tertiary text-xs font-semibold tracking-wider uppercase">Domain</h3>
        <p class="text-text-primary mt-2 text-xl font-bold">Supplier</p>
      </div>
      <div class="border-border bg-bg-card rounded-xl border p-5 shadow-xs">
        <h3 class="text-text-tertiary text-xs font-semibold tracking-wider uppercase">Boundary</h3>
        <p class="text-text-primary mt-2 text-xl font-bold">Zero-Trust Guarded</p>
      </div>
      <div class="border-border bg-bg-card rounded-xl border p-5 shadow-xs">
        <h3 class="text-text-tertiary text-xs font-semibold tracking-wider uppercase">
          Chunk Status
        </h3>
        <p class="text-primary-600 mt-2 text-xl font-bold">domain-supplier</p>
      </div>
    </div>
  </div>
</template>
