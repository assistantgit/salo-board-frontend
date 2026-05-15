import type React from 'react';
import { DefaultButton } from '../buttons/DefaultButton';
import './FormSubmitButton.css';

interface FormSubmitButtonProps {
  children: React.ReactNode;
  isLoading?: boolean;
  className?: string;
  disabled?: boolean;
  form?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const FormSubmitButton: React.FC<FormSubmitButtonProps> = ({
  children,
  isLoading,
  className = '',
  disabled,
  form,
  onClick,
}) => {
  return (
    <DefaultButton
      type='submit'
      form={form}
      className={`form-submit-button ${className}`}
      disabled={isLoading || disabled}
      onClick={onClick}
    >
      {isLoading ? 'Завантаження...' : children}
    </DefaultButton>
  );
};
