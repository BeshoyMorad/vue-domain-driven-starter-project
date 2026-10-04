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
  import type { InputPasswordProps } from './types';
  import BaseInputPassword from './BaseInputPassword.vue';

  defineOptions({
    inheritAttrs: false,
  });

  const props = withDefaults(defineProps<InputPasswordProps>(), {
    modelValue: undefined,
    defaultValue: undefined,
    name: undefined,
    label: undefined,
    description: undefined,
    containerClass: undefined,
  });

  const emits = defineEmits<{
    (e: 'update:modelValue', value: string | number): void;
  }>();

  const modelValue = useVModel(props, 'modelValue', emits, {
    passive: true,
    defaultValue: props.defaultValue,
  });
</script>

<template>
  <template v-if="name">
    <FormField v-slot="{ componentField }" :name="name">
      <FormItem :class="containerClass">
        <FormLabel v-if="label">{{ label }}</FormLabel>

        <FormControl>
          <BaseInputPassword v-bind="{ ...$attrs, ...componentField }" :test-id="testId" />
        </FormControl>

        <FormDescription v-if="description">{{ description }}</FormDescription>

        <FormMessage />
      </FormItem>
    </FormField>
  </template>

  <template v-else>
    <BaseInputPassword
      v-model="modelValue"
      v-bind="$attrs"
      :class="containerClass"
      :test-id="testId"
    />
  </template>
</template>
