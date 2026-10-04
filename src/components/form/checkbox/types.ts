import type {
  BaseFormFieldProps,
  FormFieldShape,
  FormFieldSize,
  FormFieldValidationProps,
} from '@/components/form/types';

export interface BaseCheckboxProps extends BaseFormFieldProps {
  modelValue?: boolean;
  defaultValue?: boolean;
  size?: FormFieldSize;
  shape?: FormFieldShape;
  disabled?: boolean;
  readonly?: boolean;
  label?: string;
  id?: string;
}

export type CheckboxProps = BaseCheckboxProps & FormFieldValidationProps;
