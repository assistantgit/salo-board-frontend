import type React from 'react';
import { DefaultButton } from '../buttons/DefaultButton';
import './FormSubmitButton.css';

interface FormSubmitButtonProps {
  children: React.ReactNode;
  isLoading?: boolean;
  className?: string;
  disabled?: boolean;
  form?: string;
}

export const FormSubmitButton: React.FC<FormSubmitButtonProps> = ({
  children,
  isLoading,
  className = '',
  disabled,
  form,
}) => {
  return (
    <DefaultButton
      type='submit'
      form={form}
      className={`form-submit-button ${className}`}
      disabled={isLoading || disabled}
    >
      {isLoading ? 'Завантаження...' : children}
    </DefaultButton>
  );
};
