import type React from 'react';
import './DefaultInput.css';

export type DefaultInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const DefaultInput = ({ className = '', ...props }: DefaultInputProps) => {
  return <input className={`default-input ${className}`} {...props} />;
};
