import type {
  BaseFormFieldProps,
  FormFieldIconProps,
  FormFieldValidationProps,
} from '@/components/form/types';

export interface BaseInputTextProps extends BaseFormFieldProps, FormFieldIconProps {
  modelValue?: string | number;
  defaultValue?: string | number;
}

export type InputTextProps = BaseInputTextProps & FormFieldValidationProps;
