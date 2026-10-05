<script setup lang="ts">
  import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/ui/ui/tooltip';
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>
        <slot name="trigger" />
      </TooltipTrigger>

      <TooltipContent>
        <slot />
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
