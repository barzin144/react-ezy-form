import { CSSProperties, HTMLInputTypeAttribute } from 'react';

export type FormValueType = string | string[] | boolean | Date;

export interface FormValues {
  [key: string]: FormValueType;
}
export interface Rule {
  type: ValidationType;
  message?: string;
  regexPattern?: RegExp;
  validationFunction?: (formValue: FormValues) => boolean;
}
export enum ValidationType {
  'required',
  'regex',
  'custom',
}
export interface ValidationStatus {
  isValid: boolean;
  rule: Rule;
}
export interface FormValidationState {
  [key: string]: ValidationStatus[];
}
export interface FormProps {
  children: JSX.Element[];
  horizontal?: boolean;
  style?: CSSProperties;
  onSubmit: (formValues: FormValues) => void;
  defaultValues?: FormValues;
}
export interface InnerFormItemProps {
  label?: string;
  name: string;
  valuePropName?: string;
  childDefaultValue?: unknown;
  children: JSX.Element;
  rules?: Rule[];
  incompetenceValidations?: ValidationStatus[];
  childOnChange?: (name: string, value: FormValueType) => void;
  style?: CSSProperties;
}
export interface FormItemProps {
  label?: string;
  name: string;
  valuePropName?: string;
  children: JSX.Element;
  rules?: Rule[];
  style?: CSSProperties;
}
export interface FormItemChildProps {
  id?: string;
  name?: string;
  onChange?: (name: string, value: FormValueType) => void;
}

export interface InputProps extends FormItemChildProps {
  value?: string;
  placeholder?: string;
  className?: string;
  icon?: JSX.Element;
  inputType?: HTMLInputTypeAttribute;
}

export interface PasswordInputProps extends FormItemChildProps {
  value?: string;
  placeholder?: string;
}

export declare const Form: (props: FormProps) => JSX.Element;
export declare const FormItem: (props: FormItemProps) => JSX.Element;
export declare const Input: (props: InputProps) => JSX.Element;
export declare const PasswordInput: (props: PasswordInputProps) => JSX.Element;
