import type { BaseFormFieldProps, FormFieldValidationProps } from '@/components/form/types';

export interface BaseTagsInputProps extends BaseFormFieldProps {
  modelValue?: string[];
  defaultValue?: string[];
  placeholder?: string;
  disabled?: boolean;
  tagClass?: string;
}

export type TagsInputProps = BaseTagsInputProps & FormFieldValidationProps;
