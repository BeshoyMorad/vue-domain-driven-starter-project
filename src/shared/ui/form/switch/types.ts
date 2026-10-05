import type {
  BaseFormFieldProps,
  FormFieldSize,
  FormFieldValidationProps,
} from '@/shared/ui/form/types';

export interface BaseSwitchProps extends BaseFormFieldProps {
  modelValue?: boolean;
  defaultValue?: boolean;
  size?: FormFieldSize;
  disabled?: boolean;
  readonly?: boolean;
  label?: string;
  id?: string;
}

export type SwitchProps = BaseSwitchProps & FormFieldValidationProps;
