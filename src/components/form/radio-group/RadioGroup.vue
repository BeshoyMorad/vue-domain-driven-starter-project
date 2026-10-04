<script setup lang="ts">
  import { useVModel } from '@vueuse/core';
  import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
  } from '@/components/ui/form';
  import type { RadioGroupProps } from './types';
  import BaseRadioGroup from './BaseRadioGroup.vue';

  defineOptions({
    inheritAttrs: false,
  });

  const props = withDefaults(defineProps<RadioGroupProps>(), {
    modelValue: undefined,
    defaultValue: undefined,
    layout: 'vertical',
    size: 'default',
    disabled: false,
    label: undefined,
    id: undefined,
    name: undefined,
    description: undefined,
    containerClass: undefined,
  });

  const emits = defineEmits<{
    (e: 'update:modelValue', value: string): void;
  }>();

  const modelValue = useVModel(props, 'modelValue', emits, {
    passive: true,
    defaultValue: props.defaultValue,
  });
</script>

<template>
  <template v-if="name">
    <FormField v-slot="{ componentField, errorMessage }" :name="name">
      <FormItem :class="containerClass">
        <FormLabel v-if="label">{{ label }}</FormLabel>

        <FormControl>
          <BaseRadioGroup
            :id="id"
            :aria-invalid="!!errorMessage"
            :disabled="disabled"
            :layout="layout"
            :options="options"
            :size="size"
            :test-id="testId"
            v-bind="componentField"
          />
        </FormControl>

        <FormDescription v-if="description">{{ description }}</FormDescription>

        <FormMessage />
      </FormItem>
    </FormField>
  </template>

  <template v-else>
    <BaseRadioGroup
      v-model="modelValue"
      v-bind="$attrs"
      :class="containerClass"
      :disabled="disabled"
      :layout="layout"
      :options="options"
      :size="size"
      :test-id="testId"
    />
  </template>
</template>
