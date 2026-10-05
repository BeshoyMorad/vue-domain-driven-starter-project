<script
  setup
  lang="ts"
  generic="
    IsMultiple extends boolean,
    Option extends Record<string, unknown>,
    Value extends AcceptableValue,
    OptionValue extends keyof Option | ((data: Option) => Value)
  "
>
  import BaseInfiniteScrollSelect from './BaseInfiniteScrollSelect.vue';
  import type { AcceptableValue } from 'reka-ui';
  import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
  } from '@/shared/ui/ui/form';
  import type { InfiniteScrollSelectProps } from './types';

  defineOptions({
    inheritAttrs: false,
  });

  withDefaults(defineProps<InfiniteScrollSelectProps<IsMultiple, Option, Value, OptionValue>>(), {
    paginationType: 'offset',
    limit: 10,
    initialFilters: undefined,
    query: undefined,
    disabled: false,
    multiple: undefined,
    size: 'default',
    optionLabel: 'name',
    optionValue: (data: Option) => data.id as Value,
    placeholder: undefined,
    showClear: true,
    searchable: false,
    initialOptions: () => [],
    maxSelectedLabels: 4,
    excludeValues: () => [],
    name: undefined,
    label: undefined,
    description: undefined,
    containerClass: '',
  });

  const modelValue = defineModel<IsMultiple extends true ? Value[] : Value>();

  defineEmits<{
    (e: 'selected', option: Option | undefined): void;
  }>();
</script>

<template>
  <template v-if="name">
    <FormField v-slot="{ value, handleChange, errorMessage }" v-model="modelValue" :name="name">
      <FormItem :class="containerClass">
        <FormLabel v-if="label">{{ label }}</FormLabel>

        <FormControl>
          <BaseInfiniteScrollSelect
            :aria-invalid="!!errorMessage"
            :endpoint="endpoint"
            :query-key="queryKey"
            :limit="limit"
            :initial-filters="initialFilters"
            :query="query"
            :disabled="disabled"
            :option-label="optionLabel"
            :option-value="optionValue"
            :placeholder="placeholder"
            :size="size"
            :show-clear="showClear"
            :searchable="searchable"
            :initial-options="initialOptions"
            :multiple="multiple"
            :max-selected-labels="maxSelectedLabels"
            :exclude-values="excludeValues"
            :test-id="testId"
            v-bind="$attrs"
            :model-value="value"
            @update:model-value="handleChange"
            @selected="(opt) => $emit('selected', opt)"
          >
            <template v-for="(_, slotName) in $slots" #[slotName]="slotProps">
              <slot :name="slotName" v-bind="slotProps || {}" />
            </template>
          </BaseInfiniteScrollSelect>
        </FormControl>

        <FormDescription v-if="description">{{ description }}</FormDescription>

        <FormMessage />
      </FormItem>
    </FormField>
  </template>

  <template v-else>
    <BaseInfiniteScrollSelect
      v-model="modelValue"
      v-bind="$attrs"
      :class="containerClass"
      :endpoint="endpoint"
      :query-key="queryKey"
      :limit="limit"
      :initial-filters="initialFilters"
      :query="query"
      :disabled="disabled"
      :option-label="optionLabel"
      :option-value="optionValue"
      :placeholder="placeholder"
      :size="size"
      :show-clear="showClear"
      :searchable="searchable"
      :initial-options="initialOptions"
      :multiple="multiple"
      :max-selected-labels="maxSelectedLabels"
      :exclude-values="excludeValues"
      :test-id="testId"
      @selected="(opt) => $emit('selected', opt)"
    >
      <template v-for="(_, slotName) in $slots" #[slotName]="slotProps">
        <slot :name="slotName" v-bind="slotProps || {}" />
      </template>
    </BaseInfiniteScrollSelect>
  </template>
</template>
