import React from "react";
import {
  ValidationStatus,
  ValidationType,
  InnerFormItemProps,
  FormItemProps,
  FormItemChildProps,
} from "../../types";
const defaultValidationErrorMessages = [
  {
    type: ValidationType.required,
    message: "this field is required",
  },
];

const InnerFormItem = ({
  children,
  style,
  label,
  name,
  childOnChange,
  childDefaultValue,
  incompetenceValidations,
  rules,
  valuePropName = "value",
}: InnerFormItemProps): JSX.Element => {
  const required = rules?.some((x) => x.type === ValidationType.required) || false;
  const className = incompetenceValidations?.some((x) => x.isValid === false)
    ? "formItem--invalid"
    : "";
  return (
    <div style={style} className={`formItem ${className}`}>
      {label && (
        <label htmlFor={name} className={`label ${required ? "label--required" : ""}`}>
          {label}
        </label>
      )}
      {React.cloneElement<FormItemChildProps>(children, {
        id: name,
        name: name,
        onChange: childOnChange,
        [valuePropName]: childDefaultValue,
      })}
      <div className="validationErrorsContainer">
        {incompetenceValidations?.map((validation: ValidationStatus, index) => {
          return (
            <span key={index} className="validationError">
              {rules?.find((x) => x.type === validation.rule.type).message ||
                defaultValidationErrorMessages.find((x) => x.type === validation.rule.type).message}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export const FormItem = (props: FormItemProps) => {
  return <InnerFormItem {...props} />;
};
