import type { BaseFormFieldProps, FormFieldValidationProps } from '@/components/form/types';

export interface BaseDatePickerProps extends BaseFormFieldProps {
  modelValue?: Date | string | null;
  defaultValue?: Date | string | null;
  dateFormat?: string;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  placeholder?: string;
  label?: string;
  id?: string;
}

export type DatePickerProps = BaseDatePickerProps & FormFieldValidationProps;
