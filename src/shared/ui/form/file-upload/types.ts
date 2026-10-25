import type { MediaValue } from '@/shared/types/media';
import type { BaseFormFieldProps, FormFieldValidationProps } from '@/shared/ui/form/types';

export interface BaseFileUploadProps {
  testId?: string;
  modelValue?: MediaValue[];
  disabled?: boolean;
  placeholder?: string;
  buttonLabel?: string;
  ariaInvalid?: boolean;
  allowedTypes?: string[];
  maxFiles?: number;
  maxSizeMb?: number;
  hasDisplayHint?: boolean;
  hasPlaceholder?: boolean;
}

export type FileUploadProps = Omit<BaseFileUploadProps, 'testId' | 'ariaInvalid'> &
  BaseFormFieldProps &
  FormFieldValidationProps;
