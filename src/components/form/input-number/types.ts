import type {
  BaseFormFieldProps,
  FormFieldIconProps,
  FormFieldValidationProps,
} from '@/components/form/types';

export interface BaseInputNumberProps extends BaseFormFieldProps, FormFieldIconProps {
  modelValue?: number;
  defaultValue?: number;
  hideSteppers?: boolean;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  formatOptions?: Intl.NumberFormatOptions;
}

export type InputNumberProps = BaseInputNumberProps & FormFieldValidationProps;
