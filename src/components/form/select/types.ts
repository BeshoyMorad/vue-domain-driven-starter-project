import type { AcceptableValue } from 'reka-ui';
import type {
  BaseFormFieldProps,
  FormFieldSize,
  FormFieldValidationProps,
} from '@/components/form/types';

export interface SelectProps<
  IsMultiple extends boolean = boolean,
  Option extends Record<string, unknown> = Record<string, unknown>,
  Value extends AcceptableValue = AcceptableValue,
  TOptionValue extends keyof Option | ((data: Option) => Value) =
    | keyof Option
    | ((data: Option) => Value),
>
  extends BaseFormFieldProps, FormFieldValidationProps {
  options: Option[];
  optionLabel: string;
  optionValue: TOptionValue | ((data: Option) => TOptionValue);
  placeholder?: string;
  searchPlaceholder?: string;
  size?: FormFieldSize;
  multiple?: IsMultiple;
  disabled?: boolean;
  readonly?: boolean;
  showClear?: boolean;
  searchable?: boolean;
  emptyMessage?: string;
  maxSelectedLabels?: number;
  selectedItemsLabel?: string;
  loading?: boolean;
}
