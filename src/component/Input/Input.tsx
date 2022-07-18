import React, { useState, FormEvent } from 'react';
import { PasswordEye } from '../../assets';
import { InputProps, PasswordInputProps } from '../types';

export const Input = ({
  onChange,
  name,
  id,
  placeholder,
  icon,
  value = '',
  className = '',
  inputType = 'text',
}: InputProps): JSX.Element => {
  const inputOnChange = (event: FormEvent<HTMLInputElement>): void => {
    const value: string = event.currentTarget.value.trim();

    onChange(name, value);
  };

  return (
    <div className="input">
      <input
        name={name}
        id={id}
        autoComplete="off"
        className={`formControl textbox ${className}`}
        type={inputType}
        placeholder={placeholder}
        onChange={inputOnChange}
        value={value}
      />
      {!!icon && <div className="inputIcon">{icon}</div>}
    </div>
  );
};

export const PasswordInput = ({
  onChange,
  name,
  id,
  placeholder,
  value = '',
}: PasswordInputProps): JSX.Element => {
  const [hidePassword, setHidePassword] = useState(true);

  const className = `${hidePassword ? 'textbox--password' : ''}`;

  const passwordEyeMouseDown = () => {
    setHidePassword(false);
  };
  const passwordEyeMouseUp = () => {
    setHidePassword(true);
  };

  const PasswordEyeIcon = () => (
    <PasswordEye onMouseDown={passwordEyeMouseDown} onMouseUp={passwordEyeMouseUp} />
  );

  return (
    <Input
      name={name}
      id={id}
      className={className}
      inputType={hidePassword ? 'password' : 'text'}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      icon={<PasswordEyeIcon />}
    />
  );
};
