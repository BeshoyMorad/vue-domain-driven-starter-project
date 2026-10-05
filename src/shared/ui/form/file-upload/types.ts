import type { MediaValue } from '@/shared/types/media';
import type { FormFieldValidationProps } from '@/shared/ui/form/types';

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

export interface FileUploadProps extends FormFieldValidationProps {
  testId: string;
  modelValue?: MediaValue[];
  disabled?: boolean;
  placeholder?: string;
  buttonLabel?: string;
  allowedTypes?: string[];
  maxFiles?: number;
  maxSizeMb?: number;
}
