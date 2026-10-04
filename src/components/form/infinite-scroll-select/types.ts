import type { HTMLAttributes } from 'vue';
import type { AcceptableValue } from 'reka-ui';
import type { QueryKey } from '@tanstack/vue-query';
import type {
  BaseFormFieldProps,
  FormFieldSize,
  FormFieldValidationProps,
} from '@/components/form/types';

export interface BaseInfiniteScrollSelectProps<
  IsMultiple extends boolean = boolean,
  Option extends Record<string, unknown> = Record<string, unknown>,
  Value extends AcceptableValue = AcceptableValue,
  OptionValue extends keyof Option | ((data: Option) => Value) =
    | keyof Option
    | ((data: Option) => Value),
> extends BaseFormFieldProps {
  endpoint: string;
  queryKey: QueryKey;
  paginationType?: 'offset' | 'cursor';
  limit?: number;
  initialFilters?: Record<string, unknown>;
  query?: Record<string, unknown>;
  disabled?: boolean;
  optionLabel?: string;
  optionValue?: OptionValue | ((data: Option) => Value);
  placeholder?: string;
  size?: FormFieldSize;
  showClear?: boolean;
  searchable?: boolean;
  class?: HTMLAttributes['class'];
  multiple?: IsMultiple;
  maxSelectedLabels?: number;
  initialOptions?: Option[] | Option;
  excludeValues?: Value[];
}

export type InfiniteScrollSelectProps<
  IsMultiple extends boolean = boolean,
  Option extends Record<string, unknown> = Record<string, unknown>,
  Value extends AcceptableValue = AcceptableValue,
  OptionValue extends keyof Option | ((data: Option) => Value) =
    | keyof Option
    | ((data: Option) => Value),
> = BaseInfiniteScrollSelectProps<IsMultiple, Option, Value, OptionValue> &
  FormFieldValidationProps;
