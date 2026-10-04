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
  import type { PhoneInputProps } from './types';
  import BasePhoneInput from './BasePhoneInput.vue';

  defineOptions({
    inheritAttrs: false,
  });

  const props = withDefaults(defineProps<PhoneInputProps>(), {
    modelValue: '',
    defaultCountry: 'US',
    placeholder: '000 000 0000',
    disabled: false,
    showClear: false,
    name: undefined,
    label: undefined,
    description: undefined,
    containerClass: undefined,
  });

  const emits = defineEmits<{
    (e: 'update:modelValue', value: string): void;
  }>();

  const modelValue = useVModel(props, 'modelValue', emits, {
    passive: true,
    defaultValue: '',
  });
</script>

<template>
  <template v-if="name">
    <FormField v-slot="{ value, handleChange, errorMessage }" :name="name">
      <FormItem :class="containerClass">
        <FormLabel v-if="label">{{ label }}</FormLabel>

        <FormControl>
          <BasePhoneInput
            :test-id="testId"
            :default-country="defaultCountry"
            :placeholder="placeholder"
            :disabled="disabled"
            :show-clear="showClear"
            :aria-invalid="!!errorMessage"
            :model-value="(value as string) ?? ''"
            v-bind="$attrs"
            @update:model-value="handleChange"
          />
        </FormControl>

        <FormDescription v-if="description">{{ description }}</FormDescription>

        <FormMessage />
      </FormItem>
    </FormField>
  </template>

  <template v-else>
    <BasePhoneInput
      v-model="modelValue"
      v-bind="$attrs"
      :test-id="testId"
      :default-country="defaultCountry"
      :placeholder="placeholder"
      :disabled="disabled"
      :show-clear="showClear"
      :class="containerClass"
    />
  </template>
</template>
