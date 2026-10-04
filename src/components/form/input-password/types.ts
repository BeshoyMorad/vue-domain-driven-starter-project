import type { BaseFormFieldProps, FormFieldValidationProps } from '@/components/form/types';

export interface BaseInputPasswordProps extends BaseFormFieldProps {
  modelValue?: string | number;
  defaultValue?: string | number;
}

export type InputPasswordProps = BaseInputPasswordProps & FormFieldValidationProps;
