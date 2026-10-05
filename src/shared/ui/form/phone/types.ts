import type { CountryCode } from 'libphonenumber-js';
import type { BaseFormFieldProps, FormFieldValidationProps } from '@/shared/ui/form/types';

export interface BasePhoneInputProps extends BaseFormFieldProps {
  modelValue?: string;
  defaultCountry?: CountryCode;
  placeholder?: string;
  disabled?: boolean;
  showClear?: boolean;
}

export type PhoneInputProps = BasePhoneInputProps & FormFieldValidationProps;
