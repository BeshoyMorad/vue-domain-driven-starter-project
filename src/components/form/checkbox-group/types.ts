import type {
  BaseFormFieldProps,
  FormFieldOption,
  FormFieldShape,
  FormFieldSize,
  FormFieldLayout,
  FormFieldValidationProps,
} from '@/components/form/types';

export type CheckboxGroupOption = FormFieldOption;

export interface BaseCheckboxGroupProps extends BaseFormFieldProps {
  options: CheckboxGroupOption[];
  modelValue?: unknown[];
  defaultValue?: unknown[];
  layout?: FormFieldLayout;
  size?: FormFieldSize;
  shape?: FormFieldShape;
  disabled?: boolean;
  label?: string;
}

export type CheckboxGroupProps = BaseCheckboxGroupProps & FormFieldValidationProps;
