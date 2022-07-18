import React, { useState, useEffect, FormEvent } from "react";
import {
  FormValues,
  FormValidationState,
  FormProps,
  Rule,
  FormValueType,
  ValidationType,
  FormItemProps,
} from "../../types";

export const Form = ({
  children,
  style,
  onSubmit,
  defaultValues,
  horizontal = false,
}: FormProps): JSX.Element => {
  const [formState, setFormState] = useState<FormValues>({});
  const [formValidationState, setFormValidationState] = useState<FormValidationState>({});

  useEffect(() => {
    const initialState: FormValues = {};
    const initialValidationState: FormValidationState = {};

    //read all children name and rule for initialing the states
    children.forEach((child) => {
      const childName: string = child.props["name"];
      if (!!childName && childName.length !== 0) {
        if (!!defaultValues) {
          initialState[childName] = defaultValues[childName] || undefined;
        } else {
          initialState[childName] = undefined;
        }
        if (!!child.props["rules"] && child.props["rules"]?.length !== 0) {
          const childRules: Rule[] = child.props["rules"];
          const validations = childRules.map((rule: Rule) => ({
            rule: rule,
            isValid: true,
          }));
          initialValidationState[childName] = validations;
        }
      }
    });

    setFormState(initialState);
    setFormValidationState(initialValidationState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkRequiredValidation = (
    newValidation: FormValidationState,
    name: string,
    value: FormValueType
  ) => {
    //get the validation status of input
    const required = newValidation[name].find((x) => x.rule.type === ValidationType.required);
    //if the child has required rule, should not be undefined
    if (value === undefined || value === null) {
      required.isValid = false;
      return false;
    }
    //if the value of input is string and it's required check the length of its value
    if (value.toString().length === 0) {
      required.isValid = false;
      return false;
    } else {
      required.isValid = true;
      return true;
    }
  };

  const checkRegexValidation = (
    newValidation: FormValidationState,
    name: string,
    value: FormValueType
  ) => {
    //get the validation status of input
    const regexValidation = newValidation[name].find((x) => x.rule.type === ValidationType.regex);
    //if the value of input is string and it has regexPattern, test its value
    if (typeof value === "string") {
      if (value.toString().trim().length === 0 || !!regexValidation.rule.regexPattern === false) {
        regexValidation.isValid = true;
        return true;
      } else if (regexValidation.rule.regexPattern.test(value) === false) {
        regexValidation.isValid = false;
        return false;
      } else {
        regexValidation.isValid = true;
        return true;
      }
    }
  };

  const checkCustomValidation = (
    newValidation: FormValidationState,
    name: string,
    value: FormValueType
  ) => {
    //get the validation status of input
    const customValidation = newValidation[name].find((x) => x.rule.type === ValidationType.custom);
    //if there is no validation function return true
    if (!!customValidation.rule.validationFunction === false) {
      customValidation.isValid = true;
      return true;
    } else if (
      customValidation.rule.validationFunction({ ...formState, [name]: value }) === false
    ) {
      customValidation.isValid = false;
      return false;
    } else {
      customValidation.isValid = true;
      return true;
    }
  };

  const formItemOnChange: (name: string, value: FormValueType) => void = (name, value) => {
    const newValidation = { ...formValidationState };

    //check that is there any required rule for this input
    if (newValidation[name]?.some((x) => x.rule.type === ValidationType.required)) {
      checkRequiredValidation(newValidation, name, value);
    }
    //check that is there any regex rule for this input
    if (newValidation[name]?.some((x) => x.rule.type === ValidationType.regex)) {
      checkRegexValidation(newValidation, name, value);
    }
    //check that is there any custom rule for this input
    if (newValidation[name]?.some((x) => x.rule.type === ValidationType.custom)) {
      checkCustomValidation(newValidation, name, value);
    }
    setFormValidationState(newValidation);
    setFormState({ ...formState, [name]: value });
  };

  const formOnSubmit: (event: FormEvent<HTMLFormElement>) => void = (event) => {
    event.preventDefault();
    if (validation()) {
      onSubmit(formState);
    }
  };

  const validation: () => boolean = () => {
    let noError = true;
    const newValidation = { ...formValidationState };
    //check all children that have rule
    Object.keys(formValidationState).forEach((childName) => {
      const value = formState[childName];
      //if the child has required rule
      if (newValidation[childName]?.some((x) => x.rule.type === ValidationType.required)) {
        const result = checkRequiredValidation(newValidation, childName, value);
        noError = noError && result;
      }
      //check that is there any regex rule for this input
      if (newValidation[childName]?.some((x) => x.rule.type === ValidationType.regex)) {
        const result = checkRegexValidation(newValidation, childName, value);
        noError = noError && result;
      }
      //check that is there any custom rule for this input
      if (newValidation[childName]?.some((x) => x.rule.type === ValidationType.custom)) {
        const result = checkCustomValidation(newValidation, childName, value);
        noError = noError && result;
      }
    });
    setFormValidationState(newValidation);

    return noError;
  };

  const className = `form form--${horizontal ? "horizontal" : "vertical"}`;

  return (
    <form style={style} className={className} onSubmit={formOnSubmit} autoComplete="off">
      {children.map((child, index) => {
        if (child.type.name === "FormItem") {
          return React.cloneElement<FormItemProps>(child, {
            ...child.props,
            childOnChange: formItemOnChange,
            childDefaultValue: formState[child.props["name"]],
            key: index,
            incompetenceValidations: formValidationState[child.props["name"]]?.filter(
              (x) => x.isValid === false
            ),
          });
        } else {
          return child;
        }
      })}
    </form>
  );
};
