<script setup lang="ts">
  import { useVModel } from '@vueuse/core';
  import {
    FormField,
    FormItem,
    FormControl,
    FormDescription,
    FormMessage,
  } from '@/components/ui/form';
  import type { CheckboxProps } from './types';
  import BaseCheckbox from './BaseCheckbox.vue';

  defineOptions({
    inheritAttrs: false,
  });

  const props = withDefaults(defineProps<CheckboxProps>(), {
    modelValue: undefined,
    defaultValue: undefined,
    size: 'default',
    shape: 'square',
    disabled: false,
    readonly: false,
    label: undefined,
    id: undefined,
    name: undefined,
    description: undefined,
    containerClass: undefined,
  });

  const emits = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
  }>();

  const modelValue = useVModel(props, 'modelValue', emits, {
    passive: true,
    defaultValue: props.defaultValue ?? false,
  });
</script>

<template>
  <template v-if="name">
    <FormField v-slot="{ componentField, errorMessage }" :name="name">
      <FormItem :class="containerClass">
        <FormControl>
          <BaseCheckbox
            :id="id"
            :aria-invalid="!!errorMessage"
            :disabled="disabled"
            :label="label"
            :readonly="readonly"
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
    <BaseCheckbox
      :id="id"
      v-model="modelValue"
      v-bind="$attrs"
      :class="containerClass"
      :disabled="disabled"
      :label="label"
      :readonly="readonly"
      :shape="shape"
      :size="size"
      :test-id="testId"
    />
  </template>
</template>
