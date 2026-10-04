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
  import type { CheckboxGroupProps } from './types';
  import BaseCheckboxGroup from './BaseCheckboxGroup.vue';

  defineOptions({
    inheritAttrs: false,
  });

  const props = withDefaults(defineProps<CheckboxGroupProps>(), {
    modelValue: undefined,
    defaultValue: undefined,
    layout: 'vertical',
    size: 'default',
    shape: 'square',
    disabled: false,
    label: undefined,
    name: undefined,
    description: undefined,
    containerClass: undefined,
  });

  const emits = defineEmits<{
    (e: 'update:modelValue', value: unknown[]): void;
  }>();

  const modelValue = useVModel(props, 'modelValue', emits, {
    passive: true,
    defaultValue: props.defaultValue ?? [],
  });
</script>

<template>
  <template v-if="name">
    <FormField v-slot="{ componentField, errorMessage }" :name="name">
      <FormItem :class="containerClass">
        <FormLabel v-if="label">{{ label }}</FormLabel>

        <FormControl>
          <BaseCheckboxGroup
            :aria-invalid="!!errorMessage"
            :disabled="disabled"
            :layout="layout"
            :options="options"
            :shape="shape"
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
    <BaseCheckboxGroup
      v-model="modelValue"
      v-bind="$attrs"
      :class="containerClass"
      :disabled="disabled"
      :layout="layout"
      :options="options"
      :shape="shape"
      :size="size"
      :test-id="testId"
    />
  </template>
</template>
