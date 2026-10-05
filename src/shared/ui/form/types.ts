import type { HTMLAttributes } from 'vue';

// ── Shared Base Types ────────────────────────────────────────────────────────

export interface BaseFormFieldProps {
  testId: string;
}

export interface FormFieldValidationProps {
  name?: string;
  label?: string;
  description?: string;
  containerClass?: HTMLAttributes['class'];
}

export type FormFieldProps = BaseFormFieldProps & FormFieldValidationProps;

export type FormFieldSize = 'small' | 'default' | 'large';
export type FormFieldShape = 'circle' | 'square';
export type FormFieldLayout = 'vertical' | 'horizontal';
export type FormFieldIconPosition = 'left' | 'right';

export interface FormFieldIconProps {
  icon?: string;
  iconPosition?: FormFieldIconPosition;
  loading?: boolean;
}

export interface FormFieldOption {
  value: string;
  label: string;
  disabled?: boolean;
}
