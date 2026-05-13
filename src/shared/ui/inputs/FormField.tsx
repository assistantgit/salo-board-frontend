import type React from 'react';
import './FormField.css';

interface FormFieldProps {
  label?: string;
  id?: string;
  error?: string;
  children: React.ReactNode;
  required?: boolean;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  id,
  error,
  children,
  required,
  className = '',
}) => {
  return (
    <div className={`form-field ${className} ${error ? 'form-field--error' : ''}`}>
      {label && (
        <label className='form-field__label' htmlFor={id}>
          {label}
          {required && <span className='form-field__required'>*</span>}
        </label>
      )}
      <div className='form-field__control'>{children}</div>
      {error && <p className='form-field__error-message'>{error}</p>}
    </div>
  );
};
