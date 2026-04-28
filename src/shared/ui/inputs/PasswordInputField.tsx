import { DefaultInput, EyeIcon, EyeOffIcon } from '@shared/ui';
import type React from 'react';
import { useState } from 'react';
import './PasswordInputField.css';

interface PasswordInputFieldProps {
  placeholder: string;
  autoComplete?: string;
  error?: string;
  inputClassName?: string;
  props?: React.InputHTMLAttributes<HTMLInputElement>;
}

export const PasswordInputField: React.FC<PasswordInputFieldProps> = ({
  placeholder,
  autoComplete,
  error,
  inputClassName = 'password-input-field__input',
  props,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='password-input-field'>
      <div className='password-input-field__container'>
        <DefaultInput
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`${inputClassName} password-input-field__input--password`}
          {...props}
        />
        <button
          type='button'
          className='password-input-field__toggle'
          onClick={togglePasswordVisibility}
          tabIndex={-1}
          aria-label={showPassword ? 'Сховати пароль' : 'Показати пароль'}
        >
          {showPassword ? <EyeOffIcon size='sm' /> : <EyeIcon size='sm' />}
        </button>
      </div>
      {error && (
        <p className='password-input-field__error' role='alert'>
          {error}
        </p>
      )}
    </div>
  );
};
