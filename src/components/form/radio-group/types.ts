import type {
  BaseFormFieldProps,
  FormFieldOption,
  FormFieldSize,
  FormFieldLayout,
  FormFieldValidationProps,
} from '@/components/form/types';

export interface BaseRadioGroupProps extends BaseFormFieldProps {
  options: FormFieldOption[];
  modelValue?: string;
  defaultValue?: string;
  layout?: FormFieldLayout;
  size?: FormFieldSize;
  disabled?: boolean;
  label?: string;
  id?: string;
}

export type RadioGroupProps = BaseRadioGroupProps & FormFieldValidationProps;
